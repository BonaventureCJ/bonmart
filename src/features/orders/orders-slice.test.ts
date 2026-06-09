// src/features/orders/orders-slice.test.ts

import ordersReducer, {
    addOrder,
    updateOrderStatus,
    type Order
} from './orders-slice';

// Type-safe mock order elements reflecting the true business model contract
const mockPastOrder: Order = {
    id: 'ord-2026-001',
    date: '2026-06-01T10:00:00.000Z',
    items: [
        { id: 2, name: 'Mens Casual Premium Slim Fit T-Shirts', quantity: 2, price: 22.3 }
    ],
    subtotal: 44.6,
    tax: 4.46,
    shipping: 0,
    total: 49.06,
    status: 'delivered',
};

const mockNewerOrder: Order = {
    id: 'ord-2026-002',
    date: '2026-06-05T15:30:00.000Z',
    items: [
        { id: 10, name: 'SanDisk SSD PLUS 1TB Internal SSD', quantity: 1, price: 109.00 }
    ],
    subtotal: 109.00,
    tax: 10.90,
    shipping: 5.99,
    total: 125.89,
    status: 'processing',
};

describe('Orders Slice Suite', () => {

    test('should return the initial empty entity adapter state configuration on system init', () => {
        const state = ordersReducer(undefined, { type: '@@INIT' });

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
    });

    describe('addOrder Chronological Invariance', () => {
        test('should add a novel purchase order record to the collection history logs', () => {
            const state = ordersReducer(undefined, addOrder(mockPastOrder));

            expect(state.ids).toContain('ord-2026-001');
            expect(state.entities['ord-2026-001']).toEqual(mockPastOrder);
        });

        test('should sort incoming orders by descending date so the newest record sits at index 0', () => {
            // Step 1: Add a historically older order record first
            const stateWithOld = ordersReducer(undefined, addOrder(mockPastOrder));

            // Step 2: Ingest a fresh, chronologically newer order record into the active state
            const finalizedState = ordersReducer(stateWithOld, addOrder(mockNewerOrder));

            expect(finalizedState.ids).toHaveLength(2);
            // Enforcement Verification: Newest order ID must occupy position 0 due to sortComparer mapping
            expect(finalizedState.ids[0]).toBe('ord-2026-002');
            expect(finalizedState.ids[1]).toBe('ord-2026-001');
        });
    });

    describe('updateOrderStatus Transaction Modifications', () => {
        test('should successfully modify specific status parameters to simulate webhook delivery events', () => {
            // Setup state containing our initial processing order payload configuration
            const stateWithOrder = ordersReducer(undefined, addOrder(mockNewerOrder));
            expect(stateWithOrder.entities['ord-2026-002']?.status).toBe('processing');

            // Dispatch targeted update payload simulating an external automated logistics transition signal
            const nextState = ordersReducer(
                stateWithOrder,
                updateOrderStatus({
                    id: 'ord-2026-002',
                    changes: { status: 'shipped' },
                })
            );

            expect(nextState.entities['ord-2026-002']?.status).toBe('shipped');
            // Structural Safeguard: Verify side-car billing parameters are un-mutated by status changes
            expect(nextState.entities['ord-2026-002']?.total).toBe(125.89);
        });

        test('should leave existing state un-mutated if request target id points to a missing entry row', () => {
            const stateWithOrder = ordersReducer(undefined, addOrder(mockPastOrder));

            const nextState = ordersReducer(
                stateWithOrder,
                updateOrderStatus({
                    id: 'non-existent-order-hash-id',
                    changes: { status: 'delivered' },
                })
            );

            expect(nextState).toEqual(stateWithOrder);
        });
    });
});
