// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@/features/theme/theme-slice';
import navigationReducer from '@/features/navigation/navigation-slice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        navigation: navigationReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


