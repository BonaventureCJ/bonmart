// src/features/navigation/navigation-selectors.ts

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

/**
 * Base Selector
 */
const selectNavigationState = (state: RootState) => state.navigation;

/**
 * Selects the mobile menu visibility state.
 * Essential for the Header and MobileOverlay components.
 */
export const selectIsMobileMenuOpen = createSelector(
    [selectNavigationState],
    (navigation) => navigation.isMobileMenuOpen
);
