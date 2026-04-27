// src/store/store.ts

import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@/features/theme/theme-slice';
import navigationReducer from '@/features/navigation/navigation-slice';
import productReducer from '@/features/products/product-slice';
import cartReducer from '@/features/cart/cart-slice';
import wishlistReducer from '@/features/wishlist/wishlist-slice';
import ordersReducer from '@/features/orders/orders-slice';
import searchReducer from '@/features/search/search-slice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    navigation: navigationReducer,
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: ordersReducer,
    search: searchReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

