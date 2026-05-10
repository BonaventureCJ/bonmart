// src/features/orders/orders-selectors.ts

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

/**
 * Base Selector
 */
const selectOrdersState = (state: RootState) => state.orders;

/**
 * Selects the entire order history array
 */
export const selectOrderHistory = createSelector(
    [selectOrdersState],
    (orders) => orders.history
);

/**
 * Selects the most recent order.
 * Useful for the Order Confirmation/Success page.
 */
export const selectLatestOrder = createSelector(
    [selectOrderHistory],
    (history) => (history.length > 0 ? history[0] : null)
);

/**
 * Selects orders by their delivery status.
 * Prevents re-filtering the entire array on every render.
 */
export const selectOrdersByStatus = (status: 'processing' | 'shipped' | 'delivered') =>
    createSelector([selectOrderHistory], (history) =>
        history.filter((order) => order.status === status)
    );

/**
 * Enterprise Metric: Lifetime Value (LTV)
 * Calculates the total amount the customer has spent on the platform.
 */
export const selectOrdersTotalSpent = createSelector(
    [selectOrderHistory],
    (history) => history.reduce((total, order) => total + order.total, 0)
);

/**
 * Parameterized Selector: Find a specific order by ID
 */
export const selectOrderById = (orderId: string) =>
    createSelector([selectOrderHistory], (history) =>
        history.find((order) => order.id === orderId)
    );
