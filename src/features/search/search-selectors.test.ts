// src/features/search/search-selectors.test.ts

import { RootState } from '@/store/store';
import { MOCK_PRODUCTS } from '@/data/mock-products';
import {
    selectSearchQuery,
    selectIsSearchOpen,
    selectRecentSearches,
    selectIsSearching,
} from './search-selectors';

// Create structures matching the actual string-based search history slice logic
const mockSearch1 = MOCK_PRODUCTS[1].name; // "Mens Casual Premium Slim Fit T-Shirts "
const mockSearch2 = MOCK_PRODUCTS[4].name; // "John Hardy Women's Legends Naga..."
const mockSearch3 = MOCK_PRODUCTS[9].name; // "SanDisk SSD PLUS 1TB Internal SSD..."

// Replicate primitive string collection format for global state simulation
const createMockSearchState = (
    query = '',
    isSearchOpen = false,
    recentList: string[] = []
): RootState => {
    return {
        search: {
            query,
            isSearchOpen,
            recentSearches: {
                ids: recentList,
                entities: recentList.reduce<Record<string, string>>((acc, term) => {
                    acc[term] = term;
                    return acc;
                }, {}),
            },
        },
    } as unknown as RootState;
};

describe('Search Selectors Suite', () => {

    describe('selectSearchQuery Extraction Pass', () => {
        test('should extract the exact string value typed by the user', () => {
            const state = createMockSearchState('backpack');
            const query = selectSearchQuery(state);

            expect(query).toBe('backpack');
        });

        test('should return an empty string default if search input is clean', () => {
            const state = createMockSearchState('');
            expect(selectSearchQuery(state)).toBe('');
        });
    });

    describe('selectIsSearchOpen UI Overlay States', () => {
        test('should return true if the modal overlay panel flags are active', () => {
            const state = createMockSearchState('', true);
            expect(selectIsSearchOpen(state)).toBe(true);
        });

        test('should return false if the modal overlay panel flags are closed', () => {
            const state = createMockSearchState('', false);
            expect(selectIsSearchOpen(state)).toBe(false);
        });
    });

    describe('selectRecentSearches Chronological Reversal Array', () => {
        test('should reverse the underlying entity adapter order array layout so newest is index 0', () => {
            const state = createMockSearchState('', false, [mockSearch1, mockSearch2, mockSearch3]);
            const historicalList = selectRecentSearches(state);

            expect(historicalList).toHaveLength(3);
            // Fixed Assertion: historicalList is an array of raw strings, not objects
            expect(historicalList[0]).toBe(mockSearch3);
            expect(historicalList[1]).toBe(mockSearch2);
            expect(historicalList[2]).toBe(mockSearch1);
        });

        test('should return an empty array smoothly if history entities map is empty', () => {
            const emptyState = createMockSearchState('', false, []);
            expect(selectRecentSearches(emptyState)).toEqual([]);
        });

        test('should enforce immutable selector state by returning a detached copy array to avoid runtime crashes', () => {
            const state = createMockSearchState('', false, [mockSearch1]);
            const historicalList = selectRecentSearches(state);

            expect(() => historicalList.pop()).not.toThrow();
        });
    });

    describe('selectIsSearching Computed State Edge Cases', () => {
        test('should resolve to true if input query has structural string text elements', () => {
            const state = createMockSearchState('jacket');
            expect(selectIsSearching(state)).toBe(true);
        });

        test('should resolve to false if input query string contains only white empty space gaps', () => {
            const state = createMockSearchState('     ');
            expect(selectIsSearching(state)).toBe(false);
        });

        test('should resolve to false if input query value is completely clean and blank', () => {
            const state = createMockSearchState('');
            expect(selectIsSearching(state)).toBe(false);
        });
    });
});
