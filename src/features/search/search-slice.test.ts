// src/features/search/search-slice.test.ts

import searchReducer, {
    setQuery,
    toggleSearch,
    setSearchOpen,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
    clearSearch,
} from './search-slice';

describe('Search Slice Suite', () => {

    test('should return the initial state configuration with blank entries and empty adapter on init', () => {
        const state = searchReducer(undefined, { type: '@@INIT' });

        expect(state.query).toBe('');
        expect(state.isSearchOpen).toBe(false);
        expect(state.recentSearches.ids).toEqual([]);
    });

    describe('Query Input Mutators', () => {
        test('should update the active search query state string parameter', () => {
            const state = searchReducer(undefined, setQuery('organic bamboo'));
            expect(state.query).toBe('organic bamboo');
        });

        test('should clear query parameters to an empty string on clearSearch action', () => {
            const dirtyState = searchReducer(undefined, setQuery('recycled paper'));
            const cleanState = searchReducer(dirtyState, clearSearch());

            expect(cleanState.query).toBe('');
        });
    });

    describe('Overlay UI Control Toggles', () => {
        test('should inverse the overlay isSearchOpen state flag on toggleSearch action', () => {
            const initial = searchReducer(undefined, { type: '@@INIT' }); // false

            const openedState = searchReducer(initial, toggleSearch());
            expect(openedState.isSearchOpen).toBe(true);

            const closedState = searchReducer(openedState, toggleSearch());
            expect(closedState.isSearchOpen).toBe(false);
        });

        test('should apply explicit boolean overrides on setSearchOpen calls', () => {
            const state = searchReducer(undefined, setSearchOpen(true));
            expect(state.isSearchOpen).toBe(true);
        });
    });

    describe('addRecentSearch Core Capabilities & Array Limit Edge Cases', () => {
        test('should append fresh search string queries to the normalized history adapter', () => {
            const state = searchReducer(undefined, addRecentSearch('backpack'));

            expect(state.recentSearches.ids).toContain('backpack');
            expect(state.recentSearches.entities['backpack']).toBe('backpack');
        });

        test('should trim inputs and completely reject blank or white space entries from mutation', () => {
            const initial = searchReducer(undefined, { type: '@@INIT' });
            const nextState = searchReducer(initial, addRecentSearch('    '));

            expect(nextState.recentSearches.ids).toHaveLength(0);
        });

        test('should move an identical search item to the end of the history array to maintain recent ordering', () => {
            // Step 1: Feed initial terms into history
            let state = searchReducer(undefined, addRecentSearch('solar panel'));
            state = searchReducer(state, addRecentSearch('bamboo toothbrush'));
            expect(state.recentSearches.ids).toEqual(['solar panel', 'bamboo toothbrush']);

            // Step 2: Re-enter 'solar panel'. It must be shifted to the end (the tail representing latest insert)
            const updatedState = searchReducer(state, addRecentSearch('solar panel'));

            expect(updatedState.recentSearches.ids).toHaveLength(2);
            expect(updatedState.recentSearches.ids).toEqual(['bamboo toothbrush', 'solar panel']);
        });

        test('should enforce a strict maximum capacity limit of 5 items, dropping the oldest when exceeded', () => {
            let state = searchReducer(undefined, addRecentSearch('search 1'));
            state = searchReducer(state, addRecentSearch('search 2'));
            state = searchReducer(state, addRecentSearch('search 3'));
            state = searchReducer(state, addRecentSearch('search 4'));
            state = searchReducer(state, addRecentSearch('search 5'));
            expect(state.recentSearches.ids).toHaveLength(5);

            // Add a 6th search term. The oldest entry ('search 1') must be dropped from the front of the tracking list
            const cappedState = searchReducer(state, addRecentSearch('search 6'));

            expect(cappedState.recentSearches.ids).toHaveLength(5);
            expect(cappedState.recentSearches.ids).not.toContain('search 1');
            expect(cappedState.recentSearches.ids).toEqual([
                'search 2',
                'search 3',
                'search 4',
                'search 5',
                'search 6',
            ]);
        });
    });

    describe('History Clearing Actions', () => {
        test('should drop single records matching payload targets on removeRecentSearch calls', () => {
            let state = searchReducer(undefined, addRecentSearch('recycled cup'));
            state = searchReducer(state, addRecentSearch('organic jacket'));

            const removedState = searchReducer(state, removeRecentSearch('recycled cup'));

            expect(removedState.recentSearches.ids).toHaveLength(1);
            expect(removedState.recentSearches.ids).not.toContain('recycled cup');
        });

        test('should scrub out all search history entities on clearRecentSearches calls', () => {
            let state = searchReducer(undefined, addRecentSearch('item 1'));
            state = searchReducer(state, addRecentSearch('item 2'));

            const clearedState = searchReducer(state, clearRecentSearches());

            expect(clearedState.recentSearches.ids).toEqual([]);
            expect(clearedState.recentSearches.entities).toEqual({});
        });
    });
});
