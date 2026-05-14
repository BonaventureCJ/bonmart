// src/components/product/product-list-client.tsx

"use client";

import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { ProductCard } from '@/components/product/product-card';
import { Heading } from '@/components/ui/heading/heading';
import { SearchSortControls } from '@/components/search/search-sort-controls';
import { selectProductsBySearchAndSort, type SortOption } from '@/features/products/product-selectors';

interface ProductListClientProps {
    readonly sort: SortOption;
}

/**
 * Client Product Catalog Display Grid
 * Uses specialized parameter memory selectors to sort items smoothly in real-time.
 */
export function ProductListClient({ sort }: ProductListClientProps) {
    // Leverage the multi-criteria selector, leaving query empty ('') for full listing view
    const products = useAppSelector((state) =>
        selectProductsBySearchAndSort(state, '', sort)
    );
    const hasProducts = products.length > 0;

    if (!hasProducts) {
        return (
            <div
                className="flex flex-col items-center justify-center py-20 text-center"
                role="status"
                aria-live="polite"
            >
                <Heading level={2} weight="semibold" className="mb-4">
                    No products found
                </Heading>
                <p className="text-(--neutral-color)">
                    We couldn&apos;t find any products matching your criteria.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">
            {/* Unified sorting control toolbar embedded directly on top of product matrix grid */}
            <SearchSortControls currentSort={sort} />

            <section
                aria-label="Product list grid feed"
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl:gap-4"
            >
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </section>
        </div>
    );
}
