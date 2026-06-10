// src/hooks/use-scroll-direction.test.ts

import { renderHook, act } from '@testing-library/react';
import { useScrollDirection } from './use-scroll-direction';

describe('useScrollDirection Custom Hook Suite', () => {

    // Setup helper factor block to rewrite read-only window.scrollY bounds cleanly
    function setMockScrollY(value: number) {
        Object.defineProperty(window, 'scrollY', {
            value,
            writable: true,
            configurable: true,
        });
    }

    beforeEach(() => {
        setMockScrollY(0);
    });

    test('should return null immediately on initialization', () => {
        const { result } = renderHook(() => useScrollDirection());
        expect(result.current).toBeNull();
    });

    test('should return null and bypass event listeners entirely if disabled', () => {
        setMockScrollY(100);
        const { result } = renderHook(() => useScrollDirection(false));

        act(() => {
            window.dispatchEvent(new Event('scroll'));
        });

        expect(result.current).toBeNull();
    });

    test('should ignore scroll increments that do not cross the pixel threshold parameter', () => {
        const { result } = renderHook(() => useScrollDirection(true, 10));

        act(() => {
            setMockScrollY(5); // 5px scroll change is under the 10px threshold value
            window.dispatchEvent(new Event('scroll'));
        });

        expect(result.current).toBeNull();
    });

    test('should register a down scrolling direction state shift when threshold limits are crossed', () => {
        const { result } = renderHook(() => useScrollDirection(true, 10));

        act(() => {
            setMockScrollY(50); // 50px delta crosses the 10px threshold
            window.dispatchEvent(new Event('scroll'));
        });

        expect(result.current).toBe('down');
    });

    test('should switch status tracking state to up when scroll bounds regress tracking backward', () => {
        const { result } = renderHook(() => useScrollDirection(true, 10));

        // Step 1: Establish downward movement reference baseline
        act(() => {
            setMockScrollY(100);
            window.dispatchEvent(new Event('scroll'));
        });
        expect(result.current).toBe('down');

        // Step 2: Regress scroll trajectory upward crossing the threshold delta bounds
        act(() => {
            setMockScrollY(70); // 30px change upward
            window.dispatchEvent(new Event('scroll'));
        });

        expect(result.current).toBe('up');
    });

    test('should override calculated vectors forcing up values when resting near page ceilings', () => {
        const { result } = renderHook(() => useScrollDirection(true, 5));

        // Step 1: Scroll down past the 5px limit to set the state
        act(() => {
            setMockScrollY(20);
            window.dispatchEvent(new Event('scroll'));
        });
        expect(result.current).toBe('down');

        // Step 2: Move slightly down again but stay within the top-of-page ceiling threshold (< 10px)
        act(() => {
            setMockScrollY(5); // Scroll position is near the ceiling (5px)
            window.dispatchEvent(new Event('scroll'));
        });

        // Enforcement Check: Overrides to 'up' to keep structural headers visible near page layouts
        expect(result.current).toBe('up');
    });

    test('should clear global scroll listener links completely on unmount events', () => {
        const { result, unmount } = renderHook(() => useScrollDirection(true, 10));

        unmount();

        act(() => {
            setMockScrollY(150);
            window.dispatchEvent(new Event('scroll'));
        });

        // Safeguard: State execution layer remains completely disconnected
        expect(result.current).toBeNull();
    });
});
