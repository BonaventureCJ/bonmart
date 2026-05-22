// src/components/search/search-sort-controls.tsx

'use client';

import React, { useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui/icon/icon';
import { type SortOption } from '@/features/products/product-selectors';

interface SearchSortControlsProps {
    readonly currentSort: SortOption;
}

/**
 * Universal Product Sorting Controller Panel
 * Drives multi-criteria state calculations instantly via parameter manipulation structures.
 * Leverages usePathname to function independently on any route without pushing to /search.
 */
export const SearchSortControls: React.FC<SearchSortControlsProps> = ({ currentSort }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const handleSortChange = (newSort: SortOption) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set('sort', newSort);

        startTransition(() => {
            router.push(`${pathname}?${currentParams.toString()}`);
        });
    };

    return (
        <div className={clsx(
            "mb-4 flex flex-col gap-2 border-b border-(--toggle-bg) pb-3 sm:flex-row sm:items-center sm:justify-between",
            isPending && "opacity-60 pointer-events-none"
        )}>
            {/* 📍 Updated Hint with Icon */}
            <div className="flex items-center gap-2">
                <Icon 
                    name="refresh" 
                    size={12} 
                    className={clsx(
                        "text-(--brand-color) opacity-50",
                        isPending && "animate-spin" // Visual feedback during transition
                    )} 
                />
                <span className="text-[11px] font-bold uppercase tracking-widest text-(--neutral-color) opacity-70">
                    Sort Results Matrix
                </span>
            </div>

            <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <label htmlFor="search-sorting-select" className="text-xs text-(--neutral-color)">
                    Arrange By:
                </label>
                <select
                    id="search-sorting-select"
                    value={currentSort}
                    onChange={(e) => handleSortChange(e.target.value as SortOption)}
                    className={clsx(
                        "rounded-lg border border-(--toggle-bg) bg-(--surface-raised) px-2.5 py-1 text-xs font-medium text-(--foreground) outline-none",
                        "focus:border-(--brand-color) focus:ring-1 focus:ring-(--brand-color)",
                        "dark:bg-(--surface-muted)"
                    )}
                >
                    <option value="name-asc">Product Name: A to Z</option>
                    <option value="name-desc">Product Name: Z to A</option>
                    <option value="price-asc">Lowest Price First</option>
                    <option value="price-desc">Highest Price First</option>
                    <option value="eco-high">Highest Eco Rating 🍃</option>
                </select>
            </div>
        </div>
    );
};
