// src/features/ui/ui-selectors.ts

import { RootState } from '@/store/store';

/**
 * Selects the UI state from the root store.
 */
const selectUIState = (state: RootState) => state.ui;

/**
 * Selector for the announcement dismissal status.
 * Used to determine if the AnnouncementBar should be rendered.
 */
export const selectIsAnnouncementDismissed = (state: RootState) =>
    selectUIState(state).isAnnouncementDismissed;
