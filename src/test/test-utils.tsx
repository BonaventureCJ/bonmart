// src/test/test-utils.tsx 

import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// Import your raw, slice-level reducers directly to bypass redux-persist
import themeReducer from '@/features/theme/theme-slice';
import navigationReducer from '@/features/navigation/navigation-slice';
import productReducer from '@/features/products/product-slice';
import cartReducer from '@/features/cart/cart-slice';
import wishlistReducer from '@/features/wishlist/wishlist-slice';
import ordersReducer from '@/features/orders/orders-slice';
import searchReducer from '@/features/search/search-slice';
import uiReducer from '@/features/ui/ui-slice';

// Reconstruct clean root reducer for testing state isolation
const testRootReducer = combineReducers({
    theme: themeReducer,
    navigation: navigationReducer,
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: ordersReducer,
    search: searchReducer,
    ui: uiReducer,
});

// Infer the total shape of your state from the test reducer
export type TestRootState = ReturnType<typeof testRootReducer>;
export type TestAppStore = ReturnType<typeof setupTestStore>;

/**
 * Factory function to instantiate a fresh, isolated Redux store instance.
 * Eliminates side-effects and cross-test state leaks.
 */
export function setupTestStore(preloadedState?: Partial<TestRootState>) {
    return configureStore({
        reducer: testRootReducer,
        preloadedState,
    });
}

// Extend default react testing library render options to accept mock store configs
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<TestRootState>;
    store?: TestAppStore;
}

/**
 * Custom render utility for enterprise components connected to Redux.
 * Wraps target UI components inside a fresh, isolated state Provider container.
 */
export function renderWithProviders(
    ui: React.ReactElement,
    extendedOptions: ExtendedRenderOptions = {}
) {
    const {
        preloadedState = {},
        store = setupTestStore(preloadedState),
        ...renderOptions
    } = extendedOptions;

    function Wrapper({ children }: PropsWithChildren<NonNullable<unknown>>): React.JSX.Element {
        return <Provider store={store}>{children}</Provider>;
    }

    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    };
}

// Export everything from core testing library alongside our custom provider
export * from '@testing-library/react';
