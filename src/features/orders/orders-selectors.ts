// src/features/orders/orders-selectors.ts

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { ordersAdapter } from './orders-slice';

/**
 * Accesses local orders slice from the global persistent state tree
 */
const selectOrdersState = (state: RootState) => state.orders;

export const {
    selectAll: selectOrderHistory,
    selectById: selectOrderById,
    selectIds: selectOrderIds,
} = ordersAdapter.getSelectors(selectOrdersState);

/**
 * Selects the most recent order record.
 * Since sortComparer automatically organizes dates descending, index 0 is always the latest order.
 */
export const selectLatestOrder = createSelector(
    [selectOrderHistory],
    (history) => (history.length > 0 ? history[0] : null)
);

/**
 * Selects orders filtered by a specific status string descriptor.
 * Memoized to prevent heavy array filtering on every component evaluation sweep.
 */
export const selectOrdersByStatus = (status: 'processing' | 'shipped' | 'delivered') =>
    createSelector(
        [selectOrderHistory], 
        (history) => history.filter((order) => order.status === status)
    );

/**
 * Enterprise Metric Selector: Customer Lifetime Value (LTV)
 * Aggregates all orders history expenditure totals smoothly.
 */
export const selectOrdersTotalSpent = createSelector(
    [selectOrderHistory],
    (history) => history.reduce((total, order) => total + order.total, 0)
);
