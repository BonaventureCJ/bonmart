// src/features/wishlist/wishlist-slice.test.ts

import wishlistReducer, {
    toggleWishlist,
    removeFromWishlist,
    clearWishlist
} from './wishlist-slice';
import { MOCK_PRODUCTS } from '@/data/mock-products';

// Extract true domain item structures from the centralized dataset fixture
const mockProduct1 = MOCK_PRODUCTS[0]; // Fjallraven Backpack (id: 1)
const mockProduct2 = MOCK_PRODUCTS[1]; // Mens Casual T-Shirt (id: 2)

describe('Wishlist Slice Suite', () => {

    test('should return the initial empty entity adapter state setup on workspace init', () => {
        const state = wishlistReducer(undefined, { type: '@@INIT' });

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
    });

    describe('toggleWishlist O(1) Conditional Logic Branches', () => {
        test('should add a novel item object when its identifier is absent from the store', () => {
            // Execute the toggle action on a clean, empty state configuration
            const state = wishlistReducer(undefined, toggleWishlist(mockProduct1));

            expect(state.ids).toContain(1);
            expect(state.entities[1]).toEqual(mockProduct1);
        });

        test('should remove an existing item object if the toggle payload encounters an ID collision', () => {
            // Step 1: Pre-populate the wishlist collection state with an active item row
            const prePopulatedState = wishlistReducer(undefined, toggleWishlist(mockProduct1));
            expect(prePopulatedState.ids).toContain(1);

            // Step 2: Fire the identical item toggle action again to trigger the eviction code path
            const finalizedState = wishlistReducer(prePopulatedState, toggleWishlist(mockProduct1));

            expect(finalizedState.ids).not.toContain(1);
            expect(finalizedState.entities[1]).toBeUndefined();
            expect(finalizedState.ids).toHaveLength(0);
        });
    });

    describe('removeFromWishlist Explicit Handler', () => {
        test('should evict an existing mapped item matching the targeted identifier key', () => {
            // Establish initial state containing multiple entries
            let state = wishlistReducer(undefined, toggleWishlist(mockProduct1));
            state = wishlistReducer(state, toggleWishlist(mockProduct2));
            expect(state.ids).toHaveLength(2);

            // Trigger explicit target key removal action bypasses toggle evaluation logic
            const nextState = wishlistReducer(state, removeFromWishlist(1));

            expect(nextState.ids).toHaveLength(1);
            expect(nextState.ids).toContain(2);
            expect(nextState.entities[1]).toBeUndefined();
        });

        test('should leave current state structures un-mutated if request target id is missing', () => {
            const initial = wishlistReducer(undefined, toggleWishlist(mockProduct1));
            const nextState = wishlistReducer(initial, removeFromWishlist(9999)); // Non-existent ID

            expect(nextState).toEqual(initial);
        });
    });

    describe('clearWishlist Bulk Action Cleaner', () => {
        test('should scrub and wipe out all indices and dictionary items from the active collection', () => {
            // Build a multi-item collection state layer
            let state = wishlistReducer(undefined, toggleWishlist(mockProduct1));
            state = wishlistReducer(state, toggleWishlist(mockProduct2));
            expect(state.ids).toHaveLength(2);

            // Wipe out the entire sub-state node
            const clearedState = wishlistReducer(state, clearWishlist());

            expect(clearedState.ids).toEqual([]);
            expect(clearedState.entities).toEqual({});
        });
    });
});
