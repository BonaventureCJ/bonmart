// src/features/wishlist/wishlist-selectors.ts

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { wishlistAdapter } from './wishlist-slice';

/**
 * Base State Sub-Tree Extractor
 */
const selectWishlistState = (state: RootState) => state.wishlist;

export const {
    selectAll: selectWishlistItems,
    selectTotal: selectWishlistCount,
    selectEntities: selectWishlistEntities,
} = wishlistAdapter.getSelectors(selectWishlistState);

/**
 * Parameterized Selector
 * Guarantees O(1) dictionary evaluation performance—crucial when rendering 
 * massive density product card lists on a single page view.
 */
export const selectIsProductWishlisted = (productId: number) =>
    createSelector(
        [selectWishlistEntities], 
        (entities) => !!entities[productId]
    );

/**
 * Green Initiative Selector
 * Derives the exact count of sustainable selections inside the active wishlist.
 */
export const selectEcoFriendlyWishlistCount = createSelector(
    [selectWishlistItems],
    (items) => items.filter((item) => item.isEcoFriendly).length
);
