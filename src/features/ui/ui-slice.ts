// src/features/ui/ui-slice.ts

import { createSlice } from '@reduxjs/toolkit';

interface UIState {
    isAnnouncementDismissed: boolean;
}

const initialState: UIState = {
    isAnnouncementDismissed: false,
};

/**
 * UI Slice
 * Manages global singleton UI states like announcement visibility.
 */
const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        dismissAnnouncement: (state) => {
            state.isAnnouncementDismissed = true;
        },
    },
});

export const { dismissAnnouncement } = uiSlice.actions;
export default uiSlice.reducer;
