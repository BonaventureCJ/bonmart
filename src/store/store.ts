// src/store/store.ts

import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@/features/theme/theme-slice';
import navigationReducer from '@/features/navigation/navigation-slice';
import productReducer from '@/features/products/product-slice';
import cartReducer from '@/features/cart/cart-slice';         // New
import wishlistReducer from '@/features/wishlist/wishlist-slice'; // New
import ordersReducer from '@/features/orders/orders-slice';     // New

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        navigation: navigationReducer,
        products: productReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        orders: ordersReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
