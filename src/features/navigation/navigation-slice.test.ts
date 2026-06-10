// src/features/navigation/navigation-slice.test.ts

import navigationReducer, {
    toggleMobileMenu,
    setMobileMenuOpen,
    closeMobileMenu
} from './navigation-slice';

describe('Navigation Slice Suite', () => {

    test('should return the initial state configuration with mobile menu closed on setup', () => {
        const state = navigationReducer(undefined, { type: '@@INIT' });

        expect(state.isMobileMenuOpen).toBe(false);
    });

    describe('toggleMobileMenu Action Handler', () => {
        test('should invert the menu open boolean state flag on each successive execution', () => {
            const initial = navigationReducer(undefined, { type: '@@INIT' }); // false

            const openedState = navigationReducer(initial, toggleMobileMenu());
            expect(openedState.isMobileMenuOpen).toBe(true);

            const closedState = navigationReducer(openedState, toggleMobileMenu());
            expect(closedState.isMobileMenuOpen).toBe(false);
        });
    });

    describe('setMobileMenuOpen Explicit Override', () => {
        test('should apply an explicit true value override to open the interactive panel drawer', () => {
            const state = navigationReducer(undefined, setMobileMenuOpen(true));
            expect(state.isMobileMenuOpen).toBe(true);
        });

        test('should apply an explicit false value override to collapse active views on route adjustments', () => {
            // Step 1: Establish state with an actively opened menu layer
            const openState = navigationReducer(undefined, setMobileMenuOpen(true));

            // Step 2: Fire explicit override to turn the visibility node off
            const nextState = navigationReducer(openState, setMobileMenuOpen(false));
            expect(nextState.isMobileMenuOpen).toBe(false);
        });
    });

    describe('closeMobileMenu Semantic Reset Cleaner', () => {
        test('should force the mobile menu open status flag directly to false', () => {
            const openState = navigationReducer(undefined, setMobileMenuOpen(true));
            expect(openState.isMobileMenuOpen).toBe(true);

            const resetState = navigationReducer(openState, closeMobileMenu());
            expect(resetState.isMobileMenuOpen).toBe(false);
        });
    });
});
