// src/features/cart/cart-slice.ts

import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
    EntityState
} from '@reduxjs/toolkit';
import type { Product } from '@/types/product';

export interface CartItem extends Product {
    quantity: number;
}

/**
 * Define the Adapter with explicit number ID typing
 */
export const cartAdapter = createEntityAdapter<CartItem, number>({
    selectId: (item) => item.id,
});

export type CartState = EntityState<CartItem, number>;

const initialState: CartState = cartAdapter.getInitialState();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existing = state.entities[action.payload.id];
            if (existing) {
                cartAdapter.updateOne(state, {
                    id: action.payload.id,
                    changes: { quantity: existing.quantity + action.payload.quantity }
                });
            } else {
                cartAdapter.addOne(state, action.payload);
            }
        },
        removeFromCart: cartAdapter.removeOne,
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            if (action.payload.quantity > 0) {
                cartAdapter.updateOne(state, {
                    id: action.payload.id,
                    changes: { quantity: action.payload.quantity }
                });
            }
        },
        clearCart: cartAdapter.removeAll,
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
