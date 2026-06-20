// src/features/orders/orders-slice.ts

import {
    createEntityAdapter,
    createSlice,
    EntityState,
} from '@reduxjs/toolkit';
import { type CartItem } from '@/features/cart/cart-slice';

export interface Order {
    id: string;
    date: string; // ISO string
    items: Pick<CartItem, 'id' | 'name' | 'quantity' | 'price'>[];
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    status: 'processing' | 'shipped' | 'delivered';
}

/**
 * 1. Define the Adapter
 * Sorts by date descending so newer mock orders appear first in the customer dashboard.
 * Provides O(1) mutations for high-density local layout loops.
 */
export const ordersAdapter = createEntityAdapter<Order, string>({
    selectId: (order) => order.id,
    sortComparer: (a, b) => b.date.localeCompare(a.date),
});

type OrdersState = EntityState<Order, string>;

const initialState: OrdersState = ordersAdapter.getInitialState();

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        /**
         * Appends a newly formed checkout record to the local persistent store
         */
        addOrder: ordersAdapter.addOne,
        /**
         * Simulates webhook shipping update pushes or order status manipulation controls
         */
        updateOrderStatus: ordersAdapter.updateOne,
    },
});

export const { addOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
