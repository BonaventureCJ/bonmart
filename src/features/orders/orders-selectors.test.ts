// src/features/orders/orders-selectors.test.ts

import { RootState } from '@/store/store';
import {
    selectOrderHistory,
    selectOrderById,
    selectOrderIds,
    selectLatestOrder,
    selectOrdersByStatus,
    selectOrdersTotalSpent,
} from './orders-selectors';

// Type-safe order structure mimicking your normalized store entity
interface OrderMock {
    id: string;
    date: string;
    total: number;
    status: 'processing' | 'shipped' | 'delivered';
}

const mockOrder1: OrderMock = {
    id: 'ord-2026-001',
    date: '2026-06-01T10:00:00.000Z',
    total: 132.25,
    status: 'delivered',
};

const mockOrder2: OrderMock = {
    id: 'ord-2026-002',
    date: '2026-06-05T14:30:00.000Z',
    total: 45.00,
    status: 'shipped',
};

const mockOrder3: OrderMock = {
    id: 'ord-2026-003',
    date: '2026-06-09T18:15:00.000Z',
    total: 218.90,
    status: 'processing',
};

// Replicate createEntityAdapter array format for RootState simulation.
// Assumes orders slice sortComparer seeds index 0 as the latest item chronologically.
const createMockOrdersState = (itemsList: OrderMock[] = []): RootState => {
    const ids = itemsList.map((item) => item.id);
    const entities = itemsList.reduce<Record<string, OrderMock>>((acc, item) => {
        acc[item.id] = item;
        return acc;
    }, {});

    return {
        orders: {
            ids,
            entities,
        },
    } as unknown as RootState;
};

describe('Orders Selectors Suite', () => {

    describe('Core Adapter Selectors', () => {
        test('should extract the linear array history of all customer orders', () => {
            const state = createMockOrdersState([mockOrder3, mockOrder2, mockOrder1]);
            const result = selectOrderHistory(state);

            expect(result).toHaveLength(3);
            expect(result[0].id).toBe('ord-2026-003');
        });

        test('should isolate specific order objects via direct matching identifier key query', () => {
            const state = createMockOrdersState([mockOrder1, mockOrder2]);
            const result = selectOrderById(state, 'ord-2026-002');

            expect(result).toEqual(mockOrder2);
        });

        test('should return safe empty collection values if user order data is absent', () => {
            const emptyState = createMockOrdersState([]);

            expect(selectOrderHistory(emptyState)).toEqual([]);
            expect(selectOrderIds(emptyState)).toEqual([]);
        });
    });

    describe('selectLatestOrder Extraction Pass', () => {
        test('should extract index 0 element as the latest chronological interaction', () => {
            // Input assumes pre-sorted data provided by the slice's inner sortComparer
            const state = createMockOrdersState([mockOrder3, mockOrder2, mockOrder1]);
            const latest = selectLatestOrder(state);

            expect(latest).not.toBeNull();
            expect(latest?.id).toBe('ord-2026-003');
            expect(latest?.total).toBe(218.90);
        });

        test('should yield explicit null value if order history array possesses zero elements', () => {
            const emptyState = createMockOrdersState([]);
            const latest = selectLatestOrder(emptyState);

            expect(latest).toBeNull();
        });
    });

    describe('selectOrdersByStatus Parameterized Filter', () => {
        test('should successfully segregate collection elements corresponding to state status arguments', () => {
            const state = createMockOrdersState([mockOrder3, mockOrder2, mockOrder1]);
            const processingSelector = selectOrdersByStatus('processing');
            const deliveredSelector = selectOrdersByStatus('delivered');

            const processingResult = processingSelector(state);
            const deliveredResult = deliveredSelector(state);

            expect(processingResult).toHaveLength(1);
            expect(processingResult[0].id).toBe('ord-2026-003');

            expect(deliveredResult).toHaveLength(1);
            expect(deliveredResult[0].id).toBe('ord-2026-001');
        });

        test('should yield an empty array if status parameter matches zero recorded orders', () => {
            const state = createMockOrdersState([mockOrder3]); // Only contains 'processing' order
            const shippedSelector = selectOrdersByStatus('shipped');
            const result = shippedSelector(state);

            expect(result).toEqual([]);
        });
    });

    describe('selectOrdersTotalSpent Enterprise Matrix (LTV)', () => {
        test('should accumulate individual numerical order balances into unified cumulative sum', () => {
            const state = createMockOrdersState([mockOrder3, mockOrder2, mockOrder1]);
            // Math calculation: 218.90 + 45.00 + 132.25 = 396.15
            const lifetimeValue = selectOrdersTotalSpent(state);

            expect(lifetimeValue).toBeCloseTo(396.15, 2);
        });

        test('should output zero valuation score when zero purchase rows populate history state', () => {
            const emptyState = createMockOrdersState([]);
            const lifetimeValue = selectOrdersTotalSpent(emptyState);

            expect(lifetimeValue).toBe(0);
        });
    });
});
