// src/features/wishlist/wishlist-selectors.ts

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

/**
 * Base Selector
 */
const selectWishlistState = (state: RootState) => state.wishlist;

/**
 * Selects all wishlist items
 */
export const selectWishlistItems = createSelector(
    [selectWishlistState],
    (wishlist) => wishlist.items
);

/**
 * Total count for badge notifications
 */
export const selectWishlistCount = createSelector(
    [selectWishlistItems],
    (items) => items.length
);

/**
 * Parameterized Selector: Check if a specific product is wishlisted.
 * Used by Heart/Wishlist buttons on Product Cards.
 */
export const selectIsProductWishlisted = (productId: number | string) =>
    createSelector([selectWishlistItems], (items) =>
        items.some((item) => String(item.id) === String(productId))
    );

/**
 * Green Initiative Selector:
 * Counts eco-friendly items saved for later purchase.
 */
export const selectEcoFriendlyWishlistCount = createSelector(
    [selectWishlistItems],
    (items) => items.filter((item) => item.isEcoFriendly).length
);
