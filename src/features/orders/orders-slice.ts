// src/features/orders/orders-slice.ts

import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
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
 * We sort by date descending so the newest orders always appear first.
 */
export const ordersAdapter = createEntityAdapter<Order, string>({
    selectId: (order) => order.id,
    sortComparer: (a, b) => b.date.localeCompare(a.date),
});

/**
 * 2. Define the State Interface
 */
interface OrdersState extends EntityState<Order, string> { }

const initialState: OrdersState = ordersAdapter.getInitialState();

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        /**
         * addOne handles normalization automatically.
         * sortComparer ensures it is placed correctly in the list.
         */
        addOrder: ordersAdapter.addOne,
        /**
         * upsertOne can be used for real-time status updates (e.g., webhook from shipping)
         */
        updateOrderStatus: ordersAdapter.updateOne,
    },
});

export const { addOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
