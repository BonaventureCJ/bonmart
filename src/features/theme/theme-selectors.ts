// src/features/theme/theme-selectors.ts

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

/**
 * Base Selector
 */
const selectThemeState = (state: RootState) => state.theme;

/**
 * Selects the current theme preference ('light' | 'dark' | 'system')
 */
export const selectCurrentTheme = createSelector(
    [selectThemeState],
    (themeState) => themeState.theme
);
