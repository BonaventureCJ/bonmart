// src/features/cart/cart-selectors.ts

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { cartAdapter } from './cart-slice';

const selectCartState = (state: RootState) => state.cart;

export const {
    selectAll: selectCartItems,
    selectTotal: selectCartUniqueItemsCount,
    selectEntities: selectCartEntities,
    selectById: selectCartItemById,
} = cartAdapter.getSelectors(selectCartState);

/**
 * Total quantity of all items (Navbar Badge)
 */
export const selectCartTotalQuantity = createSelector(
    [selectCartItems],
    (items) => items.reduce((total, item) => total + item.quantity, 0)
);

/**
 * Subtotal calculation
 */
export const selectCartSubtotal = createSelector(
    [selectCartItems],
    (items) => items.reduce((total, item) => total + item.price * item.quantity, 0)
);

/**
 * Eco-Friendly Count (Bonmart Green Initiative)
 */
export const selectEcoFriendlyCartCount = createSelector(
    [selectCartItems],
    (items) => items.filter((item) => item.isEcoFriendly).length
);

/**
 * Parameterized Selector
 * Now uses O(1) lookup via entities dictionary instead of .some()
 */
export const selectIsItemInCart = (productId: number) =>
    createSelector([selectCartEntities], (entities) => !!entities[productId]);

