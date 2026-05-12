// src/features/wishlist/wishlist-slice.ts

import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
    EntityState
} from '@reduxjs/toolkit';
import { type Product } from '@/data/mock-products';

export const wishlistAdapter = createEntityAdapter<Product, number>({
    selectId: (product) => product.id,
    // We keep the order products were added (default behavior)
});

type WishlistState = EntityState<Product, number>;

const initialState: WishlistState = wishlistAdapter.getInitialState();

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        /**
         * Optimized Toggle Logic
         * Uses O(1) lookup to decide whether to add or remove.
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
        // Explicitly allow removing by ID (useful for "Remove" buttons)
        removeFromWishlist: wishlistAdapter.removeOne,
        clearWishlist: wishlistAdapter.removeAll,
    },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
