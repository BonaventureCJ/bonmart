// src/features/search/search-slice.ts

import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
    EntityState
} from '@reduxjs/toolkit';

/**
 * 1. Define the Adapter for Recent Searches
 * Normalized history strings index directly off the text literal string itself.
 * No sortComparer is attached to ensure native append order tracking.
 */
export const searchAdapter = createEntityAdapter<string, string>({
    selectId: (search) => search,
});

interface SearchState {
    query: string;
    isSearchOpen: boolean;
    // Normalized history tracker storage configuration node
    recentSearches: EntityState<string, string>;
}

const initialState: SearchState = {
    query: '',
    isSearchOpen: false,
    recentSearches: searchAdapter.getInitialState(),
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        toggleSearch: (state) => {
            state.isSearchOpen = !state.isSearchOpen;
        },
        setSearchOpen: (state, action: PayloadAction<boolean>) => {
            state.isSearchOpen = action.payload;
        },
        /**
         * Optimized addRecentSearch
         * Manages history stacks, enforces absolute item uniqueness, and caps size limits.
         */
        addRecentSearch: (state, action: PayloadAction<string>) => {
            const newSearch = action.payload.trim();
            if (!newSearch) return;

            // Evict matching historic parameters to let the item migrate back to the top of the stack
            searchAdapter.removeOne(state.recentSearches, newSearch);

            // Fetch working reference arrays to strictly evaluate maximum density rules
            const currentIds = state.recentSearches.ids;

            // If the buffer hits or breaks enterprise length metrics (5 entries max), remove old elements
            if (currentIds.length >= 5) {
                const oldestId = currentIds[0];
                searchAdapter.removeOne(state.recentSearches, oldestId);
            }

            // Append item directly into the collection footprint
            searchAdapter.addOne(state.recentSearches, newSearch);
        },
        removeRecentSearch: (state, action: PayloadAction<string>) => {
            searchAdapter.removeOne(state.recentSearches, action.payload);
        },
        clearRecentSearches: (state) => {
            searchAdapter.removeAll(state.recentSearches);
        },
        clearSearch: (state) => {
            state.query = '';
        },
    },
});

export const {
    setQuery,
    toggleSearch,
    setSearchOpen,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
    clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;

