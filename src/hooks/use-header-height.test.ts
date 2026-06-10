// src/hooks/use-header-height.test.ts

import { renderHook, act } from '@testing-library/react';
import { useHeaderHeight } from './use-header-height';

describe('useHeaderHeight Custom Hook Suite', () => {
    let mockDisconnect: any;
    let mockObserve: any;
    let resizeCallback: ((entries: any[]) => void) | null = null;

    // Helper factory function to build a mock element with a configurable, dynamic offsetHeight property
    function createMockHeaderElement(initialHeight: number): HTMLDivElement {
        const element = document.createElement('div');

        Object.defineProperty(element, 'offsetHeight', {
            value: initialHeight,
            writable: true, // Allows us to reassign dimensions smoothly inside test blocks at runtime
            configurable: true,
        });

        return element as HTMLDivElement;
    }

    beforeEach(() => {
        mockDisconnect = vi.fn();
        mockObserve = vi.fn();
        resizeCallback = null;

        // Build a type-safe mock class constructor for ResizeObserver
        const MockResizeObserver = vi.fn().mockImplementation((callback) => {
            resizeCallback = callback;
            return {
                observe: mockObserve,
                unobserve: vi.fn(),
                disconnect: mockDisconnect,
            };
        });

        // Inject our mock ResizeObserver constructor into global browser context
        vi.stubGlobal('ResizeObserver', MockResizeObserver);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    test('should return 0 immediately if the element layout reference is absent', () => {
        const mockRef = { current: null };
        const { result } = renderHook(() => useHeaderHeight(mockRef));

        expect(result.current).toBe(0);
        expect(mockObserve).not.toHaveBeenCalled();
    });

    test('should capture initial height parameters and activate the resize tracking layer', () => {
        const mockElement = createMockHeaderElement(116);
        const mockRef = { current: mockElement };

        const { result } = renderHook(() => useHeaderHeight(mockRef));

        // Confirm execution sweeps initial dimensions instantly
        expect(result.current).toBe(116);
        expect(mockObserve).toHaveBeenCalledWith(mockElement);
    });

    test('should modify height parameters predictably when the observation listener triggers', () => {
        const mockElement = createMockHeaderElement(116);
        const mockRef = { current: mockElement };

        const { result } = renderHook(() => useHeaderHeight(mockRef));
        expect(result.current).toBe(116);

        // FIX: Cast element through 'any' to cleanly unlock assigning to the writable property descriptor
        act(() => {
            (mockElement as any).offsetHeight = 64;
            if (resizeCallback) {
                resizeCallback([]);
            }
        });

        // Verification: Hook state correctly synchronizes with the updated layout boundaries
        expect(result.current).toBe(64);
    });

    test('should call the disconnect cleanup sequence when the hosting component updates or unmounts', () => {
        const mockElement = createMockHeaderElement(116);
        const mockRef = { current: mockElement };

        const { unmount } = renderHook(() => useHeaderHeight(mockRef));
        expect(mockDisconnect).not.toHaveBeenCalled();

        // Trigger explicit virtual unmount event
        unmount();

        // Safeguard verification: Confirm observation engine drops references cleanly to avoid memory leaks
        expect(mockDisconnect).toHaveBeenCalled();
    });
});


