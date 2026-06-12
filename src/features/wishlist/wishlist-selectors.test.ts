// src/features/wishlist/wishlist-selectors.test.ts

import { RootState } from '@/store/store';
import { MOCK_PRODUCTS, type Product } from '@/data/mock-products';
import {
    selectWishlistItems,
    selectWishlistCount,
    selectIsProductWishlisted,
    selectEcoFriendlyWishlistCount,
} from './wishlist-selectors';

// Extract type-safe production models from the centralized mock fixture array
const mockProductEco: Product = MOCK_PRODUCTS[1]; // Mens Casual T-Shirt (id: 2, isEcoFriendly: true)
const mockProductNonEco: Product = MOCK_PRODUCTS[0]; // Fjallraven Backpack (id: 1, isEcoFriendly: false)

// Replicate createEntityAdapter structural format for global RootState simulation
const createMockWishlistState = (itemsList: Product[] = []): RootState => {
    const ids = itemsList.map((item) => item.id);
    const entities = itemsList.reduce<Record<number, Product>>((acc, item) => {
        acc[item.id] = item;
        return acc;
    }, {});

    return {
        wishlist: {
            ids,
            entities,
        },
    } as unknown as RootState;
};

describe('Wishlist Selectors Suite', () => {

    describe('Core Adapter Selectors', () => {
        test('should extract all item objects currently saved in the wishlist', () => {
            const state = createMockWishlistState([mockProductNonEco, mockProductEco]);
            const result = selectWishlistItems(state);

            expect(result).toHaveLength(2);
            expect(result[0].id).toBe(1);
            expect(result[1].id).toBe(2);
        });

        test('should return the correct total scalar count of saved products', () => {
            const state = createMockWishlistState([mockProductEco]);
            const result = selectWishlistCount(state);

            expect(result).toBe(1);
        });

        test('should return safe empty defaults when the collection node possesses zero entries', () => {
            const emptyState = createMockWishlistState([]);

            expect(selectWishlistItems(emptyState)).toEqual([]);
            expect(selectWishlistCount(emptyState)).toBe(0);
        });
    });

    describe('selectIsProductWishlisted Parameterized Lookup', () => {
        test('should yield true if the target key is indexed within the dictionary store', () => {
            const state = createMockWishlistState([mockProductEco]);
            // Instatiate parameterized selector checking product ID 2
            const isWishlistedSelector = selectIsProductWishlisted(2);

            expect(isWishlistedSelector(state)).toBe(true);
        });

        test('should yield false via fast O(1) fallback check if product id is absent', () => {
            const state = createMockWishlistState([mockProductEco]);
            // Instatiate parameterized selector checking missing product ID 9999
            const isWishlistedSelector = selectIsProductWishlisted(9999);

            expect(isWishlistedSelector(state)).toBe(false);
        });
    });

    describe('selectEcoFriendlyWishlistCount (Green Initiative Matrix)', () => {
        test('should compute total count of saved rows that carry eco-friendly flags', () => {
            const state = createMockWishlistState([mockProductNonEco, mockProductEco]);
            // mockProductEco is true, mockProductNonEco is false
            const ecoCount = selectEcoFriendlyWishlistCount(state);

            expect(ecoCount).toBe(1);
        });

        test('should output zero numeric counts when no eco-friendly elements exist in state', () => {
            const state = createMockWishlistState([mockProductNonEco]);
            const ecoCount = selectEcoFriendlyWishlistCount(state);

            expect(ecoCount).toBe(0);
        });
    });
});
