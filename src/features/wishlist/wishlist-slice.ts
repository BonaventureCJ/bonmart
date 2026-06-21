// src/features/wishlist/wishlist-slice.ts

import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
    EntityState
} from '@reduxjs/toolkit';
import type { Product } from '@/types/product';

/**
 * Define the Adapter for Customer Wishlists
 * Normalizes item listings by referencing their structural number IDs.
 * Maintains chronological append order natively to track user curation history.
 */
export const wishlistAdapter = createEntityAdapter<Product, number>({
    selectId: (product) => product.id,
});

type WishlistState = EntityState<Product, number>;

const initialState: WishlistState = wishlistAdapter.getInitialState();

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        /**
         * Optimized Toggle Logic
         * Performs rapid O(1) dictionary lookups to seamlessly append or evict items.
         */
        toggleWishlist: (state, action: PayloadAction<Product>) => {
            const productId = action.payload.id;
            const exists = !!state.entities[productId];

            if (exists) {
                wishlistAdapter.removeOne(state, productId);
            } else {
                wishlistAdapter.addOne(state, action.payload);
            }
        },
        // Explicitly allow removing by ID (useful for high-performance dashboard "Remove" controls)
        removeFromWishlist: wishlistAdapter.removeOne,
        clearWishlist: wishlistAdapter.removeAll,
    },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
