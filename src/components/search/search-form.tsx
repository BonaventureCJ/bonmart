// src/components/search/search-form.tsx

'use client';

import React, { useState, useEffect, type FormEvent, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { clsx } from 'clsx';
import { useAppDispatch } from '@/store/hooks';
import { setQuery, clearSearch, addRecentSearch } from '@/features/search/search-slice';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon/icon';

interface SearchFormProps {
    className?: string;
    placeholder?: string;
}

/**
 * Enterprise-grade Search Form
 * Features: URL-driven state, Redux persistence for history, and Responsive Design.
 */
export const SearchForm: React.FC<SearchFormProps> = ({
    className,
    placeholder = "Search eco-friendly products..."
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();

    // Local state for immediate typing feedback
    const [inputValue, setInputValue] = useState(searchParams.get('q') || '');

    // Sync: URL -> Local State & Redux
    useEffect(() => {
        const queryInUrl = searchParams.get('q') || '';
        setInputValue(queryInUrl);
        dispatch(setQuery(queryInUrl));
    }, [searchParams, dispatch]);

    const handleSearchAction = useCallback((query: string) => {
        const trimmedQuery = query.trim();

        if (trimmedQuery) {
            // 1. Update Redux (History & Global Query)
            dispatch(setQuery(trimmedQuery));
            dispatch(addRecentSearch(trimmedQuery));

            // 2. Update URL (SEO & Shareability)
            const params = new URLSearchParams();
            params.set('q', trimmedQuery);
            router.push(`/search?${params.toString()}`);
        }
    }, [dispatch, router]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleSearchAction(inputValue);
    };

    const handleClear = () => {
        setInputValue('');
        dispatch(clearSearch());
        if (searchParams.has('q')) {
            router.push('/search');
        }
    };

    return (
        <form
            role="search"
            onSubmit={handleSubmit}
            className={clsx(
                "group relative flex w-full items-center overflow-hidden rounded-full border border-(--toggle-bg) bg-(--surface-raised) p-1.5",
                "transition-all duration-(--duration-long) ease-in-out",
                "focus-within:border-(--brand-color) focus-within:ring-1 focus-within:ring-(--brand-color) focus-within:shadow-sm",
                "dark:bg-(--surface-muted)",
                className
            )}
        >
            <label htmlFor="global-search-input" className="sr-only">
                Search Products
            </label>

            <div className="flex shrink-0 items-center pl-3">
                <Icon
                    name="search"
                    size={18}
                    variant="neutral"
                    className="group-focus-within:text-(--brand-color) transition-colors"
                />
            </div>

            <input
                id="global-search-input"
                type="search"
                autoComplete="off"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
                className={clsx(
                    "h-8 w-full bg-transparent px-3 text-sm font-normal text-(--foreground) outline-none",
                    "placeholder:text-(--neutral-color)/50 focus:placeholder:opacity-30",
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
                        ariaLabel="Clear input"
                        className="size-8 !p-0 rounded-full text-(--neutral-color) hover:text-(--brand-color)"
                        disableFocusRing
                    />
                )}

                <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    className="h-8 rounded-full px-5 text-xs font-bold transition-transform active:scale-95"
                    ariaLabel="Submit search"
                >
                    Search
                </Button>
            </div>
        </form>
    );
};
