// src/features/cart/cart-slice.test.ts

import cartReducer, {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    type CartItem
} from './cart-slice';

// Type-safe sample e-commerce item fixtures mapping the true business schema
const mockProductItem: CartItem = {
    id: 2,
    slug: 'mens-casual-premium-slim-fit-t-shirts-',
    name: 'Mens Casual Premium Slim Fit T-Shirts',
    price: 22.3,
    description: 'Slim-fitting style, contrast raglan long sleeve.',
    category: "men's clothing",
    imageUrl: 'https://fakestoreapi.com',
    rating: { rate: 4.1, count: 259 },
    isEcoFriendly: true,
    quantity: 1,
};

const adjacentProductItem: CartItem = {
    id: 10,
    slug: 'sandisk-ssd-plus-1tb-internal-ssd---sata-iii-6-gbs',
    name: 'SanDisk SSD PLUS 1TB Internal SSD',
    price: 109.00,
    description: 'Easy upgrade for faster boot up, shutdown.',
    category: 'electronics',
    imageUrl: 'https://fakestoreapi.com',
    rating: { rate: 2.9, count: 470 },
    isEcoFriendly: true,
    quantity: 2,
};

describe('Cart Slice Suite', () => {

    test('should return the initial empty entity adapter state on startup setup', () => {
        const state = cartReducer(undefined, { type: '@@INIT' });

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
    });

    describe('addToCart Operational Conditions', () => {
        test('should add a novel item line when it does not exist in the state collection', () => {
            const state = cartReducer(undefined, addToCart(mockProductItem));

            expect(state.ids).toContain(2);
            expect(state.entities[2]).toEqual(mockProductItem);
            expect(state.entities[2]?.quantity).toBe(1);
        });

        test('should compound quantity tallies if the incoming item payload shares an existing id match', () => {
            // Step 1: Pre-populate the cart container with 1 quantity of our mock item
            const stateWithOne = cartReducer(undefined, addToCart(mockProductItem));

            // Step 2: Dispatch a secondary action providing an additional quantity payload count of 3
            const duplicateIncomingItem: CartItem = { ...mockProductItem, quantity: 3 };
            const finalizedState = cartReducer(stateWithOne, addToCart(duplicateIncomingItem));

            expect(finalizedState.ids).toHaveLength(1); // Row entries do not expand
            expect(finalizedState.entities[2]?.quantity).toBe(4); // Quantities add up cleanly (1 + 3)
        });
    });

    describe('removeFromCart Operational Conditions', () => {
        test('should eject an existing mapped item matching the targeted item identifier key', () => {
            const stateWithItems = cartReducer(
                cartReducer(undefined, addToCart(mockProductItem)),
                addToCart(adjacentProductItem)
            );
            expect(stateWithItems.ids).toHaveLength(2);

            const nextState = cartReducer(stateWithItems, removeFromCart(2)); // Evict product id: 2

            expect(nextState.ids).toHaveLength(1);
            expect(nextState.ids).toContain(10);
            expect(nextState.entities[2]).toBeUndefined();
        });

        test('should ignore action requests if the provided target id key does not occupy the hashmap', () => {
            const stateWithOne = cartReducer(undefined, addToCart(mockProductItem));
            const nextState = cartReducer(stateWithOne, removeFromCart(9999)); // Non-existent target id

            expect(nextState).toEqual(stateWithOne); // State configuration remains un-mutated
        });
    });

    describe('updateQuantity Core Logic & Boundary Edge Cases', () => {
        test('should alter individual item quantity counts when parameters exceed zero integers', () => {
            const initialState = cartReducer(undefined, addToCart(mockProductItem)); // Initial count: 1
            const updatedState = cartReducer(initialState, updateQuantity({ id: 2, quantity: 5 }));

            expect(updatedState.entities[2]?.quantity).toBe(5);
        });

        test('should intercept zero inputs and completely reject state adjustment mutations', () => {
            const initialState = cartReducer(undefined, addToCart(mockProductItem)); // Initial count: 1
            const updatedState = cartReducer(initialState, updateQuantity({ id: 2, quantity: 0 }));

            // Safeguard: The action parameter is rejected. The item persists with its initial quantity untouched.
            expect(updatedState.entities[2]?.quantity).toBe(1);
        });

        test('should intercept negative adjustments and completely reject state adjustment mutations', () => {
            const initialState = cartReducer(undefined, addToCart(mockProductItem)); // Initial count: 1
            const updatedState = cartReducer(initialState, updateQuantity({ id: 2, quantity: -3 }));

            // Safeguard: The state blocks negative bounds, maintaining consistency.
            expect(updatedState.entities[2]?.quantity).toBe(1);
        });

        test('should leave state structures un-mutated if the assigned update target id is missing', () => {
            const initialState = cartReducer(undefined, addToCart(mockProductItem));
            const updatedState = cartReducer(initialState, updateQuantity({ id: 9999, quantity: 10 }));

            expect(updatedState).toEqual(initialState);
        });
    });

    describe('clearCart Action Cleaner', () => {
        test('should clear and scrub all indices and dictionary items out of the state collection', () => {
            const stackedState = cartReducer(
                cartReducer(undefined, addToCart(mockProductItem)),
                addToCart(adjacentProductItem)
            );
            expect(stackedState.ids).toHaveLength(2);

            const clearedState = cartReducer(stackedState, clearCart());

            expect(clearedState.ids).toEqual([]);
            expect(clearedState.entities).toEqual({});
        });
    });
});
