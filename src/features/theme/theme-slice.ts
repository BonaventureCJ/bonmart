// src/features/theme/theme-slice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeState {
  theme: Theme;
}

/**
 * Enterprise Tip: Always start with a predictable 'system' or 'light' 
 * state to prevent Next.js hydration mismatches.
 */
const initialState: ThemeState = {
  theme: 'system',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      // Side effects like localStorage.setItem are handled in 
      // a middleware or a useEffect in the ThemeProvider.
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
