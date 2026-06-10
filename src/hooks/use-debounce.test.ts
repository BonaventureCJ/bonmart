// src/hooks/use-debounce.test.ts

import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './use-debounce';

describe('useDebounce Custom Hook Suite', () => {

    // Initialize fake timers before running the test scenarios
    beforeEach(() => {
        vi.useFakeTimers();
    });

    // Tear down timers and restore native timers after each script run
    afterEach(() => {
        vi.useRealTimers();
    });

    test('should initially return the initial value argument instantaneously', () => {
        const { result } = renderHook(() => useDebounce('initial-query'));

        expect(result.current).toBe('initial-query');
    });

    test('should postpone updating the value state token until the default delay of 180ms expires', () => {
        // Mount our target hook inside a fresh render cycle container
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'initial', delay: 180 } }
        );

        // Trigger a modification updates change stream event
        rerender({ value: 'updated-text', delay: 180 });

        // Boundary check: State should remain 'initial' at 100ms mark
        act(() => {
            vi.advanceTimersByTime(100);
        });
        expect(result.current).toBe('initial');

        // Action check: Advancing another 80ms hits 180ms threshold, applying the value update
        act(() => {
            vi.advanceTimersByTime(80);
        });
        expect(result.current).toBe('updated-text');
    });

    test('should override timeout limits dynamically when configured with a custom delay argument', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'start', delay: 500 } } // Custom 500ms delay pass
        );

        rerender({ value: 'finish', delay: 500 });

        // Confirm custom duration boundaries hold firm at 499ms
        act(() => {
            vi.advanceTimersByTime(499);
        });
        expect(result.current).toBe('start');

        // Verify it resolves on the exact final execution millisecond
        act(() => {
            vi.advanceTimersByTime(1);
        });
        expect(result.current).toBe('finish');
    });

    test('should clear and scrub out stale pending timeouts if parameters change mid-cycle', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 200),
            { initialProps: { value: 'input-1' } }
        );

        // Dispatch update step 1
        rerender({ value: 'input-2' });

        act(() => {
            vi.advanceTimersByTime(150); // Under 200ms limit
        });
        expect(result.current).toBe('input-1');

        // Dispatch update step 2 before input-2 resolves, resetting the clock interval
        rerender({ value: 'input-3' });

        act(() => {
            vi.advanceTimersByTime(150); // Total elapsed since input-2 is 300ms, but only 150ms since input-3
        });
        // Safeguard verification: It must remain input-1 because input-2 was canceled, and input-3 has not finished yet
        expect(result.current).toBe('input-1');

        act(() => {
            vi.advanceTimersByTime(50); // Complete final 50ms block to fulfill input-3's 200ms delay window
        });
        expect(result.current).toBe('input-3');
    });
});
