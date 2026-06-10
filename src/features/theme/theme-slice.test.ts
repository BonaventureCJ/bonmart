// src/features/theme/theme-slice.test.ts

import themeReducer, { setTheme, type Theme } from './theme-slice';

describe('Theme Slice Suite', () => {

    test('should initialize with a predictable system mode to prevent next.js hydration mismatches', () => {
        // Passing undefined forces the reducer to fall back to the initial enterprise-grade state token
        const state = themeReducer(undefined, { type: '@@INIT' });

        expect(state.theme).toBe('system');
    });

    describe('setTheme Action Handler', () => {
        test('should update the active theme state parameter to dark mode', () => {
            const state = themeReducer(undefined, setTheme('dark'));
            expect(state.theme).toBe('dark');
        });

        test('should update the active theme state parameter to light mode', () => {
            const state = themeReducer(undefined, setTheme('light'));
            expect(state.theme).toBe('light');
        });

        test('should update the active theme state parameter back to system sync mode', () => {
            // Step 1: Force an explicit non-system theme state first
            const dirtyState = themeReducer(undefined, setTheme('dark'));
            expect(dirtyState.theme).toBe('dark');

            // Step 2: Trigger reset back to system defaults override
            const nextState = themeReducer(dirtyState, setTheme('system'));
            expect(nextState.theme).toBe('system');
        });
    });
});
