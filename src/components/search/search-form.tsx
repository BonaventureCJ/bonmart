// src/components/search/search-form.tsx

'use client';

import React, { useEffect, useState, type FormEvent } from 'react';
import { Search, X } from 'lucide-react';
import { clsx } from 'clsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setQuery, clearSearch } from '@/features/search/search-slice';
import { useDebounce } from '@/hooks/use-debounce';

interface SearchFormProps {
    className?: string;
    placeholder?: string;
}

/**
 * Enterprise-grade Search Form component.
 * Location: src/components/search/search-form.tsx
 * 
 * Scalable for use in headers, sidebars, or dedicated search pages.
 */
export const SearchForm: React.FC<SearchFormProps> = ({
    className,
    placeholder = "Search eco-friendly products..."
}) => {
    const dispatch = useAppDispatch();
    const globalQuery = useAppSelector((state) => state.search.query);

    // Local state for snappy UI feedback
    const [inputValue, setInputValue] = useState(globalQuery);

    // Debounce (300ms) to optimize performance and prevent rapid-fire filtering
    const debouncedSearchTerm = useDebounce(inputValue, 300);

    // Sync debounced value to global Redux state
    useEffect(() => {
        dispatch(setQuery(debouncedSearchTerm));
    }, [debouncedSearchTerm, dispatch]);

    // Sync local state if Redux state is updated externally (e.g., clear all filters)
    useEffect(() => {
        setInputValue(globalQuery);
    }, [globalQuery]);

    const handleClear = () => {
        setInputValue('');
        dispatch(clearSearch());
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <form
            role="search"
            onSubmit={handleSubmit}
            className={clsx(
                "relative flex w-full items-center transition-all duration-long",
                "md:max-w-md lg:max-w-lg",
                className
            )}
        >
            <label htmlFor="global-search-input" className="sr-only">
                Search products
            </label>

            <div className="relative w-full">
                {/* Search Icon - Uses Green brand color on focus */}
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 md:pl-4">
                    <Search
                        className="size-4 text-neutral-color transition-colors md:size-5"
                        aria-hidden="true"
                    />
                </div>

                {/* Responsive Input */}
                <input
                    id="global-search-input"
                    type="search"
                    autoComplete="off"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={placeholder}
                    className={clsx(
                        // Layout & Typography
                        "block w-full rounded-xl border border-toggle-bg bg-surface-raised py-2 pl-9 pr-9",
                        "text-sm font-normal text-foreground placeholder:text-neutral-color/50",
                        "transition-all duration-long ease-in-out",

                        // Responsive Scaling
                        "md:py-2.5 md:pl-11 md:pr-11 md:text-base",

                        // Focus & Theme States (Tailwind v4 Variable shorthand)
                        "focus:border-brand-color focus:ring-1 focus:ring-brand-color focus:outline-none",
                        "dark:bg-surface-muted",
                        "focus-ring"
                    )}
                />

                {/* Clear Button - Accessible touch target for mobile */}
                {inputValue && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className={clsx(
                            "absolute inset-y-0 right-0 flex items-center pr-2 md:pr-3",
                            "text-neutral-color transition-colors hover:text-brand-color",
                            "focus-ring rounded-full outline-none"
                        )}
                        aria-label="Clear search input"
                    >
                        <X className="size-4 md:size-5" aria-hidden="true" />
                    </button>
                )}
            </div>
        </form>
    );
};
