// src/features/navigation/navigation-slice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/**
 * Interface is exported for use in RootState or Component Props.
 */
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
        /**
         * setMobileMenuOpen allows for explicit control (e.g., closing on route change).
         */
        setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
            state.isMobileMenuOpen = action.payload;
        },
        closeMobileMenu: (state) => {
            state.isMobileMenuOpen = false;
        },
    },
});

export const { toggleMobileMenu, setMobileMenuOpen, closeMobileMenu } = navigationSlice.actions;

export default navigationSlice.reducer;
