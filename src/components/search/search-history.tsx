// src/components/search/search-history.tsx

'use client';

import React from 'react';
import { clsx } from 'clsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeRecentSearch, clearRecentSearches } from '@/features/search/search-slice';
import { Icon } from '@/components/ui/icon/icon';
import { Button } from '@/components/ui/button/button';

interface SearchHistoryProps {
    onSelect: (query: string) => void;
    isVisible: boolean;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({ onSelect, isVisible }) => {
    const dispatch = useAppDispatch();
    const { recentSearches } = useAppSelector((state) => state.search);

    if (!isVisible || recentSearches.length === 0) return null;

    return (
        <div
            className={clsx(
                "absolute top-full left-0 z-50 mt-2 w-full overflow-hidden rounded-2xl border border-(--toggle-bg) bg-(--surface-raised) shadow-xl",
                "animate-in fade-in slide-in-from-top-2 duration-(--duration-long)"
            )}
        >
            <div className="flex items-center justify-between border-b border-(--toggle-bg) px-4 py-2">
                <span className="text-xs font-bold uppercase tracking-wider text-(--neutral-color)">
                    Recent Searches
                </span>
                <button
                    onClick={() => dispatch(clearRecentSearches())}
                    className="text-xs font-medium text-(--brand-color) hover:underline"
                >
                    Clear All
                </button>
            </div>

            <ul role="listbox" className="py-2">
                {recentSearches.map((term) => (
                    <li
                        key={term}
                        role="option"
                        className="group flex items-center justify-between px-4 py-2 hover:bg-(--toggle-hover-bg) cursor-pointer"
                    >
                        <button
                            onClick={() => onSelect(term)}
                            className="flex flex-1 items-center gap-3 text-left text-sm text-(--foreground)"
                        >
                            <Icon name="history" size={16} variant="neutral" className="group-hover:text-(--brand-color)" />
                            <span className="line-clamp-1">{term}</span>
                        </button>

                        <Button
                            variant="ghost"
                            size="sm"
                            icon="trash"
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch(removeRecentSearch(term));
                            }}
                            ariaLabel={`Remove ${term} from history`}
                            className="size-7 !p-0 opacity-0 group-hover:opacity-100 text-(--error)"
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
