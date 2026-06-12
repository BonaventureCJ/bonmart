// src/features/theme/theme-selectors.test.ts

import { RootState } from '@/store/store';
import { selectCurrentTheme } from './theme-selectors';
import { type Theme } from './theme-slice';

// Replicate theme sub-state node layout for global RootState simulation
const createMockThemeState = (theme: Theme): RootState => {
    return {
        theme: {
            theme,
        },
    } as unknown as RootState;
};

describe('Theme Selectors Suite', () => {

    describe('selectCurrentTheme Extraction Pass', () => {
        test('should extract system mode when state is set to system sync defaults', () => {
            const state = createMockThemeState('system');
            const result = selectCurrentTheme(state);

            expect(result).toBe('system');
        });

        test('should extract dark mode when state is explicitly set to dark theme', () => {
            const state = createMockThemeState('dark');
            const result = selectCurrentTheme(state);

            expect(result).toBe('dark');
        });

        test('should extract light mode when state is explicitly set to light theme', () => {
            const state = createMockThemeState('light');
            const result = selectCurrentTheme(state);

            expect(result).toBe('light');
        });
    });
});
