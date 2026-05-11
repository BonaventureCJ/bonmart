// src/features/navigation/navigation-selectors.ts

import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from '@/store/store';

/**
 * Base Selector
 * Memoized to isolate the navigation slice.
 */
const selectNavigationState = (state: RootState) => state.navigation;

/**
 * Mobile Menu Visibility
 * Used by Header, MobileMenu, and Overlay components.
 */
export const selectIsMobileMenuOpen = createSelector(
    [selectNavigationState],
    (navigation) => navigation.isMobileMenuOpen
);
