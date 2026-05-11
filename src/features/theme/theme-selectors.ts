// src/features/theme/theme-selectors.ts

import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from '@/store/store';

const selectThemeState = (state: RootState) => state.theme;

export const selectCurrentTheme = createSelector(
    [selectThemeState],
    (themeState) => themeState.theme
);
