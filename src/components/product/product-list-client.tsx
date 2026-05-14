// src/components/product/product-list-client.tsx

"use client";

import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { ProductCard } from '@/components/product/product-card';
import { Heading } from '@/components/ui/heading/heading';
import { SearchSortControls } from '@/components/search/search-sort-controls';
import { CategoryFilterBar } from '@/components/category/category-filter-bar';
import { selectProductsByFiltersAndSort, selectProductCategories, type SortOption } from '@/features/products/product-selectors';

interface ProductListClientProps {
    readonly sort: SortOption;
    readonly category: string;
}

export function ProductListClient({ sort, category }: ProductListClientProps) {
    // 1. Gather all unique catalog categories dynamically
    const categories = useAppSelector(selectProductCategories);

    // 2. Filter normalized entities against all active parameters
    const products = useAppSelector((state) =>
        selectProductsByFiltersAndSort(state, '', category, sort)
    );
    const hasProducts = products.length > 0;

    return (
        <div className="w-full space-y-4">
            {/* Horizontal Dynamic Navigation Bar */}
            <CategoryFilterBar categories={categories} activeCategory={category} />

            {/* Sorting Toolbar Select Strip */}
            <SearchSortControls currentSort={sort} />

            <div className="flex justify-end pt-2">
                <span className="text-xs font-medium tabular-nums text-(--neutral-color)">
                    Showing {products.length} {products.length === 1 ? 'result' : 'results'}
                </span>
            </div>

            {hasProducts ? (
                <section
                    aria-label="Filtered product list grid"
                    className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl:gap-4"
                >
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </section>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center" role="status">
                    <Heading level={2} weight="semibold" className="mb-2 text-(--foreground)">
                        No products match your criteria
                    </Heading>
                    <p className="text-sm text-(--neutral-color)">
                        Try clearing or modifying your filters.
                    </p>
                </div>
            )}
        </div>
    );
}
