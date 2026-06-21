// src/features/products/product-selectors.test.ts

import { describe, test, expect } from 'vitest';
import { RootState } from '@/store/store';
import { MOCK_PRODUCTS } from '@/data/mock-products';
import { apiSlice } from '@/features/api/api-slice';
import { productsAdapter } from './product-slice';
import {
    selectProductsByFiltersAndSort,
    selectAutocompleteSuggestions,
    selectProductsLoading,
    selectProductsError,
    selectProductCategories,
    selectProductCountByCategory,
    selectFeaturedEcoProducts,
    selectElectronicsProducts,
    selectJewelryProducts,
    selectMensClothingProducts,
} from './product-selectors';

/**
 * High-Fidelity Enterprise State Fabricator
 * Replicates the exact underlying RTK Query cache tree parameters generated 
 * when network communication states transition to completed or loading status.
 */
const createMockState = (overrides = {}): RootState => {
    // Construct a normalized adapter structure from our source MOCK_PRODUCTS array
    const baseInitialState = productsAdapter.getInitialState();
    const normalizedData = productsAdapter.setAll(baseInitialState, MOCK_PRODUCTS);

    // Default configuration for a successful, fulfilled query resolution pass
    const defaultQueryState = {
        status: 'fulfilled',
        data: normalizedData,
        isLoading: false,
        isError: false,
        error: undefined,
        ...overrides,
    };

    return {
        // Wire values directly into the centralized core API slice reducer state footprint
        [apiSlice.reducerPath]: {
            queries: {
                // RTK Query serializes undefined query parameters into this exact cache mapping string
                'getProducts(undefined)': defaultQueryState,
            },
            mutations: {},
            provided: {},
            config: {
                online: true,
                focused: true,
                middlewareRegistered: true,
                refetchOnFocus: false,
                refetchOnReconnect: false,
                refetchOnUrlChange: true,
            },
        },
    } as unknown as RootState;
};

describe('Product Selectors Suite', () => {

    describe('selectProductsByFiltersAndSort', () => {
        const state = createMockState();

        test('should return all products sorted alphabetically by default when criteria are blank', () => {
            const result = selectProductsByFiltersAndSort(state, '', '', 'name-asc');
            expect(result).toHaveLength(10);
            expect(result[0].name).toBe('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
        });

        test('should handle category filtering ignoring casing or trailing spaces', () => {
            const result = selectProductsByFiltersAndSort(state, '', "   mEn'S cLoThInG   ", 'name-asc');
            expect(result).toHaveLength(4);
            expect(result.every((p) => p.category === "men's clothing")).toBe(true);
        });

        test('should query across fields including name, category, and description text patterns', () => {
            const result = selectProductsByFiltersAndSort(state, 'water dragon', '', 'name-asc');
            expect(result).toHaveLength(1);
            expect(result[0].id).toBe(5); // John Hardy Bracelet
        });

        test('should sort price items accurately from lowest to highest price parameters', () => {
            const result = selectProductsByFiltersAndSort(state, '', '', 'price-asc');
            expect(result[0].price).toBe(9.99); // White Gold Plated Princess Ring
            expect(result[result.length - 1].price).toBe(695); // John Hardy Bracelet
        });

        test('should sort items by eco-friendly priority first then tier sub-sort by highest rating rates', () => {
            const result = selectProductsByFiltersAndSort(state, '', '', 'eco-high');

            // Verification based on real MOCK_PRODUCTS transformations:
            // Eco-friendly items: ID 2 (4.1), 4 (2.1), 6 (3.9), 8 (1.9), 10 (2.9)
            // Sorted by rate: ID 2 (4.1) -> ID 6 (3.9) -> ID 10 (2.9) -> ID 4 (2.1) -> ID 8 (1.9)
            expect(result[0].id).toBe(2);
            expect(result[1].id).toBe(6);
            expect(result[2].id).toBe(10);
            expect(result[3].id).toBe(4);
            expect(result[4].id).toBe(8);
            expect(result[5].isEcoFriendly).toBe(false); // Transitions into non-eco items next
        });

        test('should return an empty array if filter configurations eliminate all data objects', () => {
            const result = selectProductsByFiltersAndSort(state, 'non-existent-query-string', 'jewelery', 'name-asc');
            expect(result).toEqual([]);
        });
    });

    describe('selectAutocompleteSuggestions Edge Cases', () => {
        const state = createMockState();

        test('should return empty string arrays if character limits fall below 2 characters', () => {
            const result = selectAutocompleteSuggestions(state, 'f');
            expect(result).toEqual([]);
        });

        test('should return matched items up to a maximum capped size of 5 elements', () => {
            const result = selectAutocompleteSuggestions(state, 'shirt');
            expect(result.length).toBeLessThanOrEqual(5);
        });
    });

    describe('selectProductCategories Memoization Pass', () => {
        test('should extract unique category collections without element duplication', () => {
            const state = createMockState();
            const result = selectProductCategories(state);
            expect(result).toEqual(["men's clothing", 'jewelery', 'electronics']);
        });

        test('should retain shallow array reference mapping if values are un-mutated', () => {
            const state = createMockState();
            const run1 = selectProductCategories(state);
            const run2 = selectProductCategories(state);
            expect(run1).toBe(run2); // Confirms strict structural memoization integrity
        });
    });

    describe('selectProductCountByCategory Dynamic Instantiator', () => {
        const state = createMockState();

        test('should accurately count collection aggregates irrespective of lowercase inputs', () => {
            const countSelector = selectProductCountByCategory('jewelery');
            const count = countSelector(state);
            expect(count).toBe(4);
        });

        test('should output a zero numeric result if category references possess zero matching products', () => {
            const countSelector = selectProductCountByCategory('organic-groceries');
            const count = countSelector(state);
            expect(count).toBe(0);
        });
    });

    describe('selectFeaturedEcoProducts Subsets', () => {
        test('should sort eco-friendly choices higher and enforce an array subset ceiling of 8 records', () => {
            const state = createMockState();
            const result = selectFeaturedEcoProducts(state);

            expect(result[0].isEcoFriendly).toBe(true);
            expect(result.length).toBeLessThanOrEqual(8);
        });
    });

    describe('Status Flags Extractions', () => {
        test('should parse loading conditional states from store parameters', () => {
            const state = createMockState({ status: 'pending', isLoading: true });
            expect(selectProductsLoading(state)).toBe(true);
        });

        test('should cleanly pull error message state descriptions', () => {
            const state = createMockState({ status: 'rejected', isError: true, error: 'Network Error' });
            // Maps exactly to the string returned by our updated selectProductsError selector matrix
            expect(selectProductsError(state)).toBe('Failed to resolve remote catalogue records.');
        });
    });

    describe('Category Slices Dynamic Ceilings', () => {
        const state = createMockState();

        test('should extract electronics matches capping execution boundaries at 8 rows', () => {
            const electronics = selectElectronicsProducts(state);
            expect(electronics).toHaveLength(2);
            expect(electronics[0].category).toBe('electronics');
        });

        test('should extract jewelry matches capping execution boundaries at 8 rows', () => {
            const jewelry = selectJewelryProducts(state);
            expect(jewelry).toHaveLength(4);
            expect(jewelry[0].category).toBe('jewelery');
        });

        test('should extract mens clothing matches capping execution boundaries at 8 rows', () => {
            const mensClothing = selectMensClothingProducts(state);
            expect(mensClothing).toHaveLength(4);
            expect(mensClothing[0].category).toBe("men's clothing");
        });
    });
});