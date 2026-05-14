// src/components/search/search-history.tsx

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { clsx } from 'clsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeRecentSearch, clearRecentSearches } from '@/features/search/search-slice';
import { selectRecentSearches } from '@/features/search/search-selectors';
import { Button } from '@/components/ui/button/button';

interface SearchHistoryProps {
    readonly onSelect: (query: string) => void;
    readonly isVisible: boolean;
    readonly onClose: () => void;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({ onSelect, isVisible, onClose }) => {
    const dispatch = useAppDispatch();
    const recentSearches = useAppSelector(selectRecentSearches);
    const [focusedIndex, setFocusedIndex] = useState(-1);

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
            default:
                break;
        }
    }, [isVisible, recentSearches, focusedIndex, onSelect, onClose]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
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
                <span className="text-[10px] font-bold uppercase tracking-widest text-(--neutral-color) opacity-70">
                    Recent Searches
                </span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch(clearRecentSearches())}
                    className="h-auto !p-0 text-[11px] font-bold text-(--brand-color) hover:bg-transparent hover:underline"
                >
                    Clear All
                </Button>
            </div>

            <ul role="listbox" aria-label="Recent searches history" className="py-2">
                {recentSearches.map((term, index) => (
                    <li
                        key={term}
                        role="option"
                        aria-selected={focusedIndex === index}
                        className={clsx(
                            "group flex items-center justify-between px-4 py-1.5 cursor-pointer transition-colors duration-(--duration-long)",
                            focusedIndex === index ? "bg-(--toggle-hover-bg)" : "hover:bg-(--toggle-hover-bg)"
                        )}
                    >
                        <Button
                            variant="ghost"
                            icon="history"
                            iconPlacement="left"
                            className={clsx(
                                "flex-1 !justify-start !p-0 font-normal transition-colors",
                                focusedIndex === index ? "text-(--brand-color)" : "text-(--foreground)",
                                "hover:bg-transparent"
                            )}
                            onClick={() => onSelect(term)}
                            disableFocusRing
                            tabIndex={-1}
                        >
                            <span className={clsx(
                                "line-clamp-1",
                                focusedIndex === index && "font-medium"
                            )}>
                                {term}
                            </span>
                        </Button>

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
                                "size-8 !p-0 rounded-full transition-all duration-(--duration-long)",
                                "text-(--neutral-color) hover:text-(--error) hover:!bg-(--toggle-bg)",
                                "opacity-100 lg:opacity-0 lg:group-hover:opacity-100",
                                focusedIndex === index && "lg:opacity-100"
                            )}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
