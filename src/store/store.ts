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
import storage from 'redux-persist/lib/storage';

import themeReducer from '@/features/theme/theme-slice';
import navigationReducer from '@/features/navigation/navigation-slice';
import productReducer from '@/features/products/product-slice';
import cartReducer from '@/features/cart/cart-slice';
import wishlistReducer from '@/features/wishlist/wishlist-slice';
import ordersReducer from '@/features/orders/orders-slice';
import searchReducer from '@/features/search/search-slice';
import uiReducer from '@/features/ui/ui-slice'; // Added UI reducer

/**
 * 1. Combine Reducers
 * We keep 'products' and 'orders' out of whitelist 
 * to ensure fresh data from the API on every session, while 
 * 'cart' and 'wishlist' persist for user convenience.
 */
const rootReducer = combineReducers({
  theme: themeReducer,
  navigation: navigationReducer,
  products: productReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  orders: ordersReducer,
  search: searchReducer,
  ui: uiReducer, 
});

/**
 * 2. Persist Configuration
 * Normalized structures from createEntityAdapter persist seamlessly as JSON.
 */
const persistConfig = {
  key: 'bonmart-root',
  storage,
  whitelist: ['cart', 'wishlist', 'theme', 'search', 'orders', 'ui'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * 3. Store Configuration
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Essential: Ignore non-serializable redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

// Explicitly export types for use with useAppSelector and useAppDispatch hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
