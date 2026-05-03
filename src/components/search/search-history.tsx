// src/components/search/search-history.tsx

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { clsx } from 'clsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeRecentSearch, clearRecentSearches } from '@/features/search/search-slice';
import { Icon } from '@/components/ui/icon/icon';
import { Button } from '@/components/ui/button/button';

interface SearchHistoryProps {
    onSelect: (query: string) => void;
    isVisible: boolean;
    onClose: () => void;
}

/**
 * Enterprise-grade Search History Dropdown
 * Fully accessible with keyboard navigation support (WCAG compliant).
 */
export const SearchHistory: React.FC<SearchHistoryProps> = ({ onSelect, isVisible, onClose }) => {
    const dispatch = useAppDispatch();
    const { recentSearches } = useAppSelector((state) => state.search);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    // Reset focus when visibility changes
    useEffect(() => {
        if (!isVisible) setFocusedIndex(-1);
    }, [isVisible]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isVisible || recentSearches.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setFocusedIndex((prev) => (prev < recentSearches.length - 1 ? prev + 1 : 0));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setFocusedIndex((prev) => (prev > 0 ? prev - 1 : recentSearches.length - 1));
                break;
            case 'Enter':
                if (focusedIndex >= 0) {
                    e.preventDefault();
                    onSelect(recentSearches[focusedIndex]);
                }
                break;
            case 'Escape':
                onClose();
                break;
        }
    }, [isVisible, recentSearches, focusedIndex, onSelect, onClose]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

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
                    type="button"
                    onClick={() => dispatch(clearRecentSearches())}
                    className="text-xs font-medium text-(--brand-color) hover:underline focus:outline-none focus:text-(--brand-color)"
                >
                    Clear All
                </button>
            </div>

            <ul role="listbox" aria-label="Recent searches history" className="py-2">
                {recentSearches.map((term, index) => (
                    <li
                        key={term}
                        role="option"
                        aria-selected={focusedIndex === index}
                        className={clsx(
                            "group flex items-center justify-between px-4 py-2 cursor-pointer transition-colors",
                            focusedIndex === index ? "bg-(--toggle-hover-bg)" : "hover:bg-(--toggle-hover-bg)"
                        )}
                    >
                        <button
                            type="button"
                            tabIndex={-1} // Handled by manual keyboard nav
                            onClick={() => onSelect(term)}
                            className="flex flex-1 items-center gap-3 text-left text-sm text-(--foreground) focus:outline-none"
                        >
                            <Icon
                                name="history"
                                size={16}
                                variant={focusedIndex === index ? "primary" : "neutral"}
                                className="transition-colors"
                            />
                            <span className={clsx(
                                "line-clamp-1",
                                focusedIndex === index && "text-(--brand-color) font-medium"
                            )}>
                                {term}
                            </span>
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
                            className={clsx(
                                "size-7 !p-0 text-(--error) transition-opacity",
                                focusedIndex === index ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            )}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
