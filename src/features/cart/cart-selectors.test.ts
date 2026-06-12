// src/features/cart/cart-selectors.test.ts

import { RootState } from '@/store/store';
import { MOCK_PRODUCTS } from '@/data/mock-products';
import { type CartItem } from './cart-slice';
import {
    selectCartItems,
    selectCartUniqueItemsCount,
    selectCartTotalQuantity,
    selectCartSubtotal,
    selectEcoFriendlyCartCount,
    selectIsItemInCart,
} from './cart-selectors';

// Create type-safe cart items exact MOCK_PRODUCTS domain data contract
const mockCartItem1: CartItem = {
    ...MOCK_PRODUCTS[1], // Mens Casual Premium Slim Fit T-Shirts (isEcoFriendly: true, price: 22.3)
    quantity: 3,
};

const mockCartItem2: CartItem = {
    ...MOCK_PRODUCTS[2], // Mens Cotton Jacket (isEcoFriendly: false, price: 55.99)
    quantity: 1,
};

const mockCartItem3: CartItem = {
    ...MOCK_PRODUCTS[9], // SanDisk SSD PLUS 1TB Internal SSD (isEcoFriendly: true, price: 109.00)
    quantity: 2,
};

// Replicate createEntityAdapter layout structure using strict type definitions
const createMockCartState = (itemsList: CartItem[] = []): RootState => {
    const ids = itemsList.map((item) => item.id);
    const entities = itemsList.reduce<Record<number, CartItem>>((acc, item) => {
        acc[item.id] = item;
        return acc;
    }, {});

    return {
        cart: {
            ids,
            entities,
        },
    } as unknown as RootState;
};

describe('Cart Selectors Suite', () => {

    describe('Core Adapter Selectors', () => {
        test('should extract all linear array items currently added to the cart', () => {
            const state = createMockCartState([mockCartItem1, mockCartItem2]);
            const result = selectCartItems(state);

            expect(result).toHaveLength(2);
            expect(result[0].id).toBe(2);
            expect(result[1].id).toBe(3);
        });

        test('should return the correct count of total unique product configurations', () => {
            const state = createMockCartState([mockCartItem1, mockCartItem2]);
            const result = selectCartUniqueItemsCount(state);

            expect(result).toBe(2);
        });

        test('should return safe empty defaults if the user cart contains no active rows', () => {
            const emptyState = createMockCartState([]);
            expect(selectCartItems(emptyState)).toEqual([]);
            expect(selectCartUniqueItemsCount(emptyState)).toBe(0);
        });
    });

    describe('selectCartTotalQuantity (Navbar Badge)', () => {
        test('should aggregate aggregate quantities across all distinct line records', () => {
            const state = createMockCartState([mockCartItem1, mockCartItem2]); // 3 + 1 quantities
            const totalQuantity = selectCartTotalQuantity(state);

            expect(totalQuantity).toBe(4);
        });

        test('should return zero numeric value if the checkout container is empty', () => {
            const emptyState = createMockCartState([]);
            expect(selectCartTotalQuantity(emptyState)).toBe(0);
        });
    });

    describe('selectCartSubtotal Calculation', () => {
        test('should compute total monetary values compounding quantity rows correctly', () => {
            const state = createMockCartState([mockCartItem1, mockCartItem2]);
            // Calculations: (22.3 * 3) + (55.99 * 1) = 66.9 + 55.99 = 122.89
            const subtotal = selectCartSubtotal(state);

            expect(subtotal).toBeCloseTo(122.89, 2);
        });

        test('should output zero subtotal balances when no elements exist', () => {
            const emptyState = createMockCartState([]);
            expect(selectCartSubtotal(emptyState)).toBe(0);
        });
    });

    describe('selectEcoFriendlyCartCount (Bonmart Green Initiative)', () => {
        test('should enumerate unique product rows that carry eco-friendly flags', () => {
            const state = createMockCartState([mockCartItem1, mockCartItem2, mockCartItem3]);
            const ecoCount = selectEcoFriendlyCartCount(state);

            expect(ecoCount).toBe(2);
        });

        test('should return zero if no eco-friendly products populate the selection basket', () => {
            const state = createMockCartState([mockCartItem2]);

            // FIX: Declared variable identifier inline cleanly with const modifier binding
            const ecoCount = selectEcoFriendlyCartCount(state);
            expect(ecoCount).toBe(0);
        });
    });

    describe('selectIsItemInCart Parameterized Lookup', () => {
        test('should yield true if the target key is indexed within the store hashmap', () => {
            const state = createMockCartState([mockCartItem1]);
            const isInCartSelector = selectIsItemInCart(2);

            expect(isInCartSelector(state)).toBe(true);
        });

        test('should yield false via fast O(1) fallback check if product is absent', () => {
            const state = createMockCartState([mockCartItem1]);
            const isInCartSelector = selectIsItemInCart(999);

            expect(isInCartSelector(state)).toBe(false);
        });
    });
});

