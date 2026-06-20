// src/features/cart/cart-selectors.ts

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { cartAdapter } from './cart-slice';

/**
 * Base state accessor mapping to root layout slice
 */
const selectCartState = (state: RootState) => state.cart;

export const {
    selectAll: selectCartItems,
    selectTotal: selectCartUniqueItemsCount,
    selectEntities: selectCartEntities,
    selectById: selectCartItemById,
} = cartAdapter.getSelectors(selectCartState);

/**
 * Total quantity of all items (Navbar Badge)
 * Performance: Re-calculates strictly if collection references mutate.
 */
export const selectCartTotalQuantity = createSelector(
    [selectCartItems],
    (items) => items.reduce((total, item) => total + item.quantity, 0)
);

/**
 * Subtotal calculation
 * Performance: Multiplies running values smoothly within the caching layer.
 */
export const selectCartSubtotal = createSelector(
    [selectCartItems],
    (items) => items.reduce((total, item) => total + item.price * item.quantity, 0)
);

/**
 * Eco-Friendly Count (Bonmart Green Initiative)
 * Filters active products against green tags for environmental visualization markers.
 */
export const selectEcoFriendlyCartCount = createSelector(
    [selectCartItems],
    (items) => items.filter((item) => item.isEcoFriendly).length
);

/**
 * Parameterized Selector
 * Enforces true O(1) dictionary checks instead of expensive array traversals.
 */
export const selectIsItemInCart = (productId: number) =>
    createSelector(
        [selectCartEntities],
        (entities) => !!entities[productId]
    );


