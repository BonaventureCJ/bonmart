// src/features/ui/ui-slice.test.ts

import uiReducer, { dismissAnnouncement } from './ui-slice';

describe('UI Slice Suite', () => {

    test('should initialize with the announcement banner active on fresh user sessions', () => {
        // Passing undefined forces the slice initialization logic to run
        const state = uiReducer(undefined, { type: '@@INIT' });

        expect(state.isAnnouncementDismissed).toBe(false);
    });

    describe('dismissAnnouncement Action Handler', () => {
        test('should permanently flip the isAnnouncementDismissed flag status to true', () => {
            const initialState = uiReducer(undefined, { type: '@@INIT' });
            expect(initialState.isAnnouncementDismissed).toBe(false);

            // Trigger the dismissal event reducer code path
            const nextState = uiReducer(initialState, dismissAnnouncement());

            expect(nextState.isAnnouncementDismissed).toBe(true);
        });
    });
});
