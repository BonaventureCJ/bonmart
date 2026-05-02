// src/store/store.ts

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import themeReducer from '@/features/theme/theme-slice';
import navigationReducer from '@/features/navigation/navigation-slice';
import productReducer from '@/features/products/product-slice';
import cartReducer from '@/features/cart/cart-slice';
import wishlistReducer from '@/features/wishlist/wishlist-slice';
import ordersReducer from '@/features/orders/orders-slice';
import searchReducer from '@/features/search/search-slice';

// 1. Combine all reducers
const rootReducer = combineReducers({
  theme: themeReducer,
  navigation: navigationReducer,
  products: productReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  orders: ordersReducer,
  search: searchReducer,
});

// 2. Configuration for redux-persist
const persistConfig = {
  key: 'bonmart-root',
  storage,
  // Only these slices will be saved to localStorage
  whitelist: ['cart', 'wishlist', 'theme'],
};

// 3. Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions to avoid serialization errors in console
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
