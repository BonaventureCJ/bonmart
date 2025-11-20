// src/features/navigation/navigation-slice.ts
import { createSlice } from '@reduxjs/toolkit';

export interface NavigationState {
    isMobileMenuOpen: boolean;
}

const initialState: NavigationState = {
    isMobileMenuOpen: false,
};

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        toggleMobileMenu: (state) => {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },
        closeMobileMenu: (state) => {
            state.isMobileMenuOpen = false;
        },
    },
});

export const { toggleMobileMenu, closeMobileMenu } = navigationSlice.actions;

export default navigationSlice.reducer;
