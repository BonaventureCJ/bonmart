// src/features/search/search-slice.ts

import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
    EntityState
} from '@reduxjs/toolkit';

/**
 * 1. Define the Adapter for Recent Searches
 * Since searches are strings, the entity is a string and the ID is the string itself.
 */
export const searchAdapter = createEntityAdapter<string, string>({
    selectId: (search) => search,
    // No sortComparer needed as we want to maintain "Recent" order (manual insertion)
});

interface SearchState {
    query: string;
    isSearchOpen: boolean;
    // normalized collection of recent search strings
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
         * createEntityAdapter handles the "move to top" and uniqueness via addOne/removeOne logic.
         */
        addRecentSearch: (state, action: PayloadAction<string>) => {
            const newSearch = action.payload.trim();
            if (!newSearch) return;

            // Ensure uniqueness by removing if it exists, then adding to the front
            searchAdapter.removeOne(state.recentSearches, newSearch);

            // Evict from index 0 because createEntityAdapter appends new terms to the tail
            const currentIds = state.recentSearches.ids;
            if (currentIds.length >= 5) {
                searchAdapter.removeOne(state.recentSearches, currentIds[0]);
            }

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

