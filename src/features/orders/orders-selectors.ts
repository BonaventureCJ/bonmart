// src/features/orders/orders-selectors.ts

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { ordersAdapter } from './orders-slice';

const selectOrdersState = (state: RootState) => state.orders;

export const {
    selectAll: selectOrderHistory,
    selectById: selectOrderById,
    selectIds: selectOrderIds,
} = ordersAdapter.getSelectors(selectOrdersState);

/**
 * Selects the most recent order.
 * Since sortComparer handles date sorting, index 0 is always the latest.
 */
export const selectLatestOrder = createSelector(
    [selectOrderHistory],
    (history) => (history.length > 0 ? history[0] : null)
);

/**
 * Selects orders by status.
 * Memoized to prevent re-filtering on every re-render.
 */
export const selectOrdersByStatus = (status: 'processing' | 'shipped' | 'delivered') =>
    createSelector([selectOrderHistory], (history) =>
        history.filter((order) => order.status === status)
    );

/**
 * Enterprise Metric: Lifetime Value (LTV)
 */
export const selectOrdersTotalSpent = createSelector(
    [selectOrderHistory],
    (history) => history.reduce((total, order) => total + order.total, 0)
);
