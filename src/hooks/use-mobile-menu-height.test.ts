// src/hooks/use-mobile-menu-height.test.ts

import { renderHook, act } from '@testing-library/react';
import { useMobileMenuHeight } from './use-mobile-menu-height';

describe('useMobileMenuHeight Custom Hook Suite', () => {

    beforeEach(() => {
        // Standard default viewport height mock configuration
        Object.defineProperty(window, 'innerHeight', {
            value: 800,
            writable: true,
            configurable: true,
        });
    });

    afterEach(() => {
        // Clean up style properties to prevent state leaks between tests
        document.documentElement.style.removeProperty('--vh');
    });

    test('should compute and append the initial viewport height variable immediately', () => {
        renderHook(() => useMobileMenuHeight());

        // Validation: Confirm style value calculation applies correctly to the document root element
        const assignedStyle = document.documentElement.style.getPropertyValue('--vh');
        expect(assignedStyle).toBe('800px');
    });

    test('should adapt the root design token dynamically whenever a window resize event emits', () => {
        renderHook(() => useMobileMenuHeight());
        expect(document.documentElement.style.getPropertyValue('--vh')).toBe('800px');

        // Simulate mobile keyboard popup or screen rotation altering layout bounds
        act(() => {
            (window as any).innerHeight = 540;
            window.dispatchEvent(new Event('resize'));
        });

        // Verification: Confirm target design variables updated predictably
        const modifiedStyle = document.documentElement.style.getPropertyValue('--vh');
        expect(modifiedStyle).toBe('540px');
    });

    test('should tear down global tracking listeners on unmount events to avoid performance leaks', () => {
        const { unmount } = renderHook(() => useMobileMenuHeight());
        expect(document.documentElement.style.getPropertyValue('--vh')).toBe('800px');

        // Trigger explicit virtual destruction sweep
        unmount();

        // Modify inner measurements and trigger a resize event post-unmount
        act(() => {
            (window as any).innerHeight = 600;
            window.dispatchEvent(new Event('resize'));
        });

        // Safeguard: The css style token must remain frozen at 800px because the observer was disconnected
        expect(document.documentElement.style.getPropertyValue('--vh')).toBe('800px');
    });
});
