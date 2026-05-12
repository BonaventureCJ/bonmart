// src/features/wishlist/wishlist-selectors.ts

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { wishlistAdapter } from './wishlist-slice';

const selectWishlistState = (state: RootState) => state.wishlist;

export const {
    selectAll: selectWishlistItems,
    selectTotal: selectWishlistCount,
    selectEntities: selectWishlistEntities,
} = wishlistAdapter.getSelectors(selectWishlistState);

/**
 * Parameterized Selector
 * O(1) performance—ideal for many Product Cards on one page.
 */
export const selectIsProductWishlisted = (productId: number) =>
    createSelector([selectWishlistEntities], (entities) => !!entities[productId]);

/**
 * Green Initiative Selector
 */
export const selectEcoFriendlyWishlistCount = createSelector(
    [selectWishlistItems],
    (items) => items.filter((item) => item.isEcoFriendly).length
);
