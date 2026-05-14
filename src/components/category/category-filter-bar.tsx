// src/components/category/category-filter-bar.tsx
'use client';

import React, { useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { Button } from '@/components/ui/button/button';

interface CategoryFilterBarProps {
    readonly categories: string[];
    readonly activeCategory: string;
}

/**
 * Category Filter Bar
 * Uses URL parameters as the single source of truth for high-impact SEO indexing.
 */
export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
    categories,
    activeCategory
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const handleCategorySelect = (category: string) => {
        const currentParams = new URLSearchParams(searchParams.toString());

        if (category) {
            currentParams.set('category', category);
        } else {
            currentParams.delete('category');
        }

        startTransition(() => {
            router.push(`${pathname}?${currentParams.toString()}`);
        });
    };

    return (
        <nav
            aria-label="Category filter navigation"
            className={clsx(
                "mb-6 flex w-full items-center gap-2 overflow-x-auto pb-2 scrollbar-none",
                isPending && "opacity-60 pointer-events-none"
            )}
        >
            <Button
                type="button"
                variant={!activeCategory ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleCategorySelect('')}
                className={clsx(
                    "whitespace-nowrap transition-all duration-100",
                    !activeCategory ? "shadow-sm" : "text-(--neutral-color)"
                )}
            >
                All Products
            </Button>

            {categories.map((cat) => {
                const isSelected = activeCategory.toLowerCase() === cat.toLowerCase();
                return (
                    <Button
                        key={cat}
                        type="button"
                        variant={isSelected ? "primary" : "secondary"}
                        size="sm"
                        onClick={() => handleCategorySelect(cat)}
                        className={clsx(
                            "whitespace-nowrap capitalize transition-all duration-100",
                            isSelected ? "shadow-sm" : "text-(--neutral-color)"
                        )}
                    >
                        {cat}
                    </Button>
                );
            })}
        </nav>
    );
};
