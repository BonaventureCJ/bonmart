// src/features/search/search-selectors.ts

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { searchAdapter } from './search-slice';

/**
 * Base State Tree Extractors
 */
const selectSearchState = (state: RootState) => state.search;
const selectRecentSearchesState = (state: RootState) => state.search.recentSearches;

/**
 * Built-in Adapter Selectors for Recent Searches
 */
const { selectAll: selectAllRecentSearches } = searchAdapter.getSelectors(
    selectRecentSearchesState
);

/**
 * Current search input value
 */
export const selectSearchQuery = createSelector(
    [selectSearchState],
    (search) => search.query
);

/**
 * UI State: Is the search overlay/modal active
 */
export const selectIsSearchOpen = createSelector(
    [selectSearchState],
    (search) => search.isSearchOpen
);

/**
 * Selects the list of recent search queries.
 * We reverse it because addOne appends to the end, 
 * ensuring the most recent item is presented first.
 */
export const selectRecentSearches = createSelector(
    [selectAllRecentSearches],
    (searches): string[] => [...searches].reverse()
);

/**
 * Derived Selector: Returns true if the user is currently typing
 */
export const selectIsSearching = createSelector(
    [selectSearchQuery],
    (query) => query.trim().length > 0
);
