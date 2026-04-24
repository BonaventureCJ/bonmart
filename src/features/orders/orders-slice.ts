// src/features/orders/orders-slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '@/features/cart/cart-slice';

export interface Order {
    id: string;
    date: string;
    items: Pick<CartItem, 'id' | 'name' | 'quantity' | 'price'>[];
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    status: 'processing' | 'shipped' | 'delivered';
}

interface OrdersState {
    history: Order[];
}

const initialState: OrdersState = {
    history: [], // Starts empty, populated on checkout success
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.history.unshift(action.payload); // Add new order to the top
        },
    },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
