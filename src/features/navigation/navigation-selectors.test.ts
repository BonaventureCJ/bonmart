// src/features/navigation/navigation-selectors.test.ts

import { RootState } from '@/store/store';
import { selectIsMobileMenuOpen } from './navigation-selectors';

// Replicate navigation sub-state node layout for global RootState simulation
const createMockNavigationState = (isMobileMenuOpen: boolean): RootState => {
    return {
        navigation: {
            isMobileMenuOpen,
        },
    } as unknown as RootState;
};

describe('Navigation Selectors Suite', () => {

    describe('selectIsMobileMenuOpen Extraction Pass', () => {
        test('should extract true when the mobile overlay drawer layout is open', () => {
            const state = createMockNavigationState(true);
            const result = selectIsMobileMenuOpen(state);

            expect(result).toBe(true);
        });

        test('should extract false when the mobile overlay drawer layout is closed', () => {
            const state = createMockNavigationState(false);
            const result = selectIsMobileMenuOpen(state);

            expect(result).toBe(false);
        });
    });
});
