// src/features/search/search-slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
    query: string;
    isSearchOpen: boolean;
    recentSearches: string[];
}

const initialState: SearchState = {
    query: '',
    isSearchOpen: false,
    recentSearches: [],
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
        addRecentSearch: (state, action: PayloadAction<string>) => {
            const newSearch = action.payload.trim();
            if (newSearch) {
                // Move existing search to top and limit to 5
                const filtered = state.recentSearches.filter(s => s !== newSearch);
                state.recentSearches = [newSearch, ...filtered].slice(0, 5);
            }
        },
        removeRecentSearch: (state, action: PayloadAction<string>) => {
            state.recentSearches = state.recentSearches.filter(s => s !== action.payload);
        },
        clearRecentSearches: (state) => {
            state.recentSearches = [];
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
    clearSearch
} = searchSlice.actions;

export default searchSlice.reducer;
