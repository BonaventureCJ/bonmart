import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Define the available theme types.
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeState {
  theme: Theme;
}

const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    // Check localStorage first for a user's explicit choice.
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') {
      return storedTheme;
    }
  }
  // If no explicit choice, default to the system preference.
  return 'system';
};

const initialState: ThemeState = {
  theme: getInitialTheme(),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;

