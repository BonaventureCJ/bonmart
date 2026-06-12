// src/features/ui/ui-selectors.test.ts

import { RootState } from '@/store/store';
import { selectIsAnnouncementDismissed } from './ui-selectors';

// Replicate ui sub-state node layout for global RootState simulation
const createMockUIState = (isAnnouncementDismissed: boolean): RootState => {
    return {
        ui: {
            isAnnouncementDismissed,
        },
    } as unknown as RootState;
};

describe('UI Selectors Suite', () => {

    describe('selectIsAnnouncementDismissed Extraction Pass', () => {
        test('should extract true when the user has explicitly closed the top announcement banner', () => {
            const state = createMockUIState(true);
            const result = selectIsAnnouncementDismissed(state);

            expect(result).toBe(true);
        });

        test('should extract false when the announcement banner should persistently mount on screen', () => {
            const state = createMockUIState(false);
            const result = selectIsAnnouncementDismissed(state);

            expect(result).toBe(false);
        });
    });
});
