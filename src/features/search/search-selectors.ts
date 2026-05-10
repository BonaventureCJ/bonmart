// src/features/search/search-selectors.ts

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

/**
 * Base Selector
 */
const selectSearchState = (state: RootState) => state.search;

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
 * Memoization ensures the list doesn't trigger re-renders unless updated.
 */
export const selectRecentSearches = createSelector(
    [selectSearchState],
    (search) => search.recentSearches
);

/**
 * Derived Selector: Returns true if the user is currently typing (query not empty)
 */
export const selectIsSearching = createSelector(
    [selectSearchQuery],
    (query) => query.trim().length > 0
);
