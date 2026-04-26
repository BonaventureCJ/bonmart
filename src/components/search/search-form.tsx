// src/components/search/search-form.tsx
'use client';

import React, { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import { useAppDispatch } from '@/store/hooks';
import { setQuery, clearSearch } from '@/features/search/search-slice';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon/icon';

interface SearchFormProps {
    className?: string;
    placeholder?: string;
}

/**
 * Modern "Fused" Search Form with Integrated Clear Action.
 * 
 * Features:
 * - Combined Input Group pattern for a premium enterprise feel.
 * - Conditional "Clear" icon for better UX.
 * - Full Redux and programmatic navigation integration.
 */
export const SearchForm: React.FC<SearchFormProps> = ({
    className,
    placeholder = "Search eco-friendly products..."
}) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const trimmedQuery = inputValue.trim();
        if (trimmedQuery) {
            dispatch(setQuery(trimmedQuery));
            router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
        }
    };

    const handleClear = () => {
        setInputValue('');
        dispatch(clearSearch());
    };

    return (
        <form
            role="search"
            onSubmit={handleSubmit}
            className={clsx(
                "group relative flex w-full items-center overflow-hidden rounded-xl border border-(--toggle-bg) bg-(--surface-raised)",
                "transition-all duration-(--duration-long) ease-in-out",
                "focus-within:border-(--brand-color) focus-within:ring-1 focus-within:ring-(--brand-color)",
                "dark:bg-(--surface-muted)",
                className
            )}
        >
            <label htmlFor="global-search-input" className="sr-only">
                Search Products
            </label>

            {/* 1. Leading Icon */}
            <div className="flex shrink-0 items-center pl-3">
                <Icon
                    name="search"
                    size={18}
                    variant="neutral"
                    className="group-focus-within:text-(--brand-color) transition-colors"
                />
            </div>

            {/* 2. Seamless Input */}
            <input
                id="global-search-input"
                type="search"
                autoComplete="off"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
                className={clsx(
                    "h-10 w-full bg-transparent px-3 text-sm font-normal text-(--foreground) outline-none",
                    "placeholder:text-(--neutral-color)/50 focus:placeholder:opacity-30",
                    "[&::-webkit-search-cancel-button]:appearance-none"
                )}
            />

            {/* 3. Action Group: Clear Icon + Search Button */}
            <div className="flex shrink-0 items-center gap-1 pr-1">
                {inputValue && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className={clsx(
                            "flex size-8 items-center justify-center rounded-lg text-(--neutral-color)",
                            "transition-colors hover:bg-(--toggle-bg) hover:text-(--brand-color)",
                            "focus-ring"
                        )}
                        aria-label="Clear input"
                    >
                        <Icon name="close" size={16} />
                    </button>
                )}

                <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    className="h-8 rounded-lg px-4 text-xs font-semibold"
                    ariaLabel="Search"
                >
                    Search
                </Button>
            </div>
        </form>
    );
};
