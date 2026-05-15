// src/components/search/search-form.tsx

'use client';

import React, { useState, useEffect, type FormEvent, useCallback, useRef, useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { useAppDispatch } from '@/store/hooks';
import { setQuery, clearSearch, addRecentSearch } from '@/features/search/search-slice';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon/icon';
import { useDebounce } from '@/hooks/use-debounce';
import { SearchSuggestionsOverlay } from './search-suggestions-overlay';
import { SearchSubmitButton } from './search-submit-button';

interface SearchFormProps {
    className?: string;
    placeholder?: string;
}

export const SearchForm: React.FC<SearchFormProps> = ({
    className,
    placeholder = "Search eco-friendly products..."
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const [isPending, startTransition] = useTransition();

    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const activeUrlQuery = searchParams.get('q') || '';
    const [inputValue, setInputValue] = useState(activeUrlQuery);

    // Abstraction: Debounce high-frequency value updates cleanly via custom hook utility
    const debouncedValue = useDebounce(inputValue, 180);

    // Sync: URL Parameter -> Local Input State & Redux Store Slice
    useEffect(() => {
        setInputValue(activeUrlQuery);
        dispatch(setQuery(activeUrlQuery));
    }, [activeUrlQuery, dispatch]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setIsOverlayVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCloseOverlay = useCallback(() => setIsOverlayVisible(false), []);

    const handleSearchAction = useCallback((query: string) => {
        const trimmedQuery = query.trim();
        const currentParams = new URLSearchParams(searchParams.toString());

        if (trimmedQuery) {
            dispatch(setQuery(trimmedQuery));
            dispatch(addRecentSearch(trimmedQuery));
            setIsOverlayVisible(false);

            currentParams.set('q', trimmedQuery);
            startTransition(() => {
                router.push(`/search?${currentParams.toString()}`);
            });
        }
    }, [dispatch, router, searchParams]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleSearchAction(inputValue);
    };

    const handleClear = () => {
        setInputValue('');
        dispatch(clearSearch());
        const currentParams = new URLSearchParams(searchParams.toString());
        if (currentParams.has('q')) {
            currentParams.delete('q');
            startTransition(() => {
                router.push(pathname === '/search' ? '/search' : pathname);
            });
        }
    };

    const handleOverlaySelect = (query: string) => {
        setInputValue(query);
        handleSearchAction(query);
    };

    return (
        <form
            ref={formRef}
            role="search"
            onSubmit={handleSubmit}
            className={clsx("relative w-full", className)}
        >
            <div
                className={clsx(
                    "group relative flex w-full items-center overflow-hidden rounded-full border border-(--toggle-bg) bg-(--surface-raised) p-1.5",
                    "ease-(--transition-ease-in-out)",
                    "focus-within:border-(--brand-color) focus-within:ring-1 focus-within:ring-(--brand-color) focus-within:shadow-sm",
                    "dark:bg-(--surface-muted)",
                    isPending && "opacity-80 cursor-wait"
                )}
            >
                <label htmlFor="global-search-input" className="sr-only">Search Products</label>
                <div className="flex shrink-0 items-center pl-3">
                    <Icon
                        name={inputValue ? "leaf" : "search"}
                        size={18}
                        className="group-focus-within:text-(--brand-color) transition-colors duration-100 text-(--neutral-color)"
                    />
                </div>

                <input
                    id="global-search-input"
                    type="search"
                    autoComplete="off"
                    value={inputValue}
                    onFocus={() => setIsOverlayVisible(true)}
                    onClick={() => setIsOverlayVisible(true)}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={placeholder}
                    className={clsx(
                        "h-8 w-full bg-transparent px-3 text-sm font-normal text-(--foreground) outline-none",
                        "placeholder:text-(--neutral-color) placeholder:opacity-50 focus:placeholder:opacity-30",
                        "[&::-webkit-search-cancel-button]:appearance-none"
                    )}
                />

                <div className="flex shrink-0 items-center gap-1 pr-0.5">
                    {inputValue && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            icon="close"
                            onClick={handleClear}
                            ariaLabel="Clear search input"
                            className="size-8 !p-0 rounded-full text-(--neutral-color) transition-colors hover:text-(--error)"
                            disableFocusRing
                        />
                    )}

                    <SearchSubmitButton isPending={isPending} />
                </div>
            </div>

            <SearchSuggestionsOverlay
                query={debouncedValue}
                isVisible={isOverlayVisible}
                onSelect={handleOverlaySelect}
                onClose={handleCloseOverlay}
            />
        </form>
    );
};
