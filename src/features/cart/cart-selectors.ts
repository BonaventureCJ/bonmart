// src/features/cart/cart-selectors.ts

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

/**
 * Base Selector
 */
const selectCartState = (state: RootState) => state.cart;

/**
 * Selects raw items array
 */
export const selectCartItems = createSelector(
    [selectCartState],
    (cart) => cart.items
);

/**
 * Total count of unique products in cart
 */
export const selectCartUniqueItemsCount = createSelector(
    [selectCartItems],
    (items) => items.length
);

/**
 * Total quantity of all items (for the navbar badge)
 */
export const selectCartTotalQuantity = createSelector(
    [selectCartItems],
    (items) => items.reduce((total, item) => total + item.quantity, 0)
);

/**
 * Financial Calculations
 * Enterprise Tip: We keep raw numbers here and format for currency in the UI
 */
export const selectCartSubtotal = createSelector(
    [selectCartItems],
    (items) => items.reduce((total, item) => total + item.price * item.quantity, 0)
);

/**
 * Green Initiative Selector
 * Calculates how many items in the cart are eco-friendly
 */
export const selectEcoFriendlyCartCount = createSelector(
    [selectCartItems],
    (items) => items.filter((item) => item.isEcoFriendly).length
);

/**
 * Parameterized Selector
 * Check if a specific product ID is already in the cart
 */
export const selectIsItemInCart = (productId: number | string) =>
    createSelector([selectCartItems], (items) =>
        items.some((item) => String(item.id) === String(productId))
    );
