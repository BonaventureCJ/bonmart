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
            if (newSearch && !state.recentSearches.includes(newSearch)) {
                // Keep only the last 5 searches for UX and performance
                state.recentSearches = [newSearch, ...state.recentSearches].slice(0, 5);
            }
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
    clearSearch
} = searchSlice.actions;

export default searchSlice.reducer;
