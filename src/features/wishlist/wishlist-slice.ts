// src/features/wishlist/wishlist-slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/data/mock-products';

interface WishlistState {
    items: Product[];
}

const initialState: WishlistState = {
    items: [],
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        toggleWishlist: (state, action: PayloadAction<Product>) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index >= 0) {
                state.items.splice(index, 1); // Remove if exists
            } else {
                state.items.push(action.payload); // Add if new
            }
        },
    },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
