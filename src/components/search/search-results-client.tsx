// src/components/search/search-results-client.tsx

'use client';

import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useGetProductsQuery } from '@/features/products/product-slice';
import { selectProductsByFiltersAndSort, type SortOption } from '@/features/products/product-selectors';
import { setQuery } from '@/features/search/search-slice';
import { ProductCardHorizontal } from '@/components/product/product-card-horizontal';
import { ProductCardSkeleton } from '@/components/product/product-card-skeleton';
import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';
import { SearchSortControls } from '@/components/search/search-sort-controls';

interface SearchResultsClientProps {
    readonly query: string;
    readonly sort: SortOption;
}

/**
 * Highly-Isolated Search Grid Hydrator
 * Leverages unified parametric selectors for high-performance filtering.
 */
export const SearchResultsClient: React.FC<SearchResultsClientProps> = ({ query, sort }) => {
    const dispatch = useAppDispatch();

    /**
     * Enterprise Caching Layer Guard:
     * Handles background subscription management natively. If a customer hits this view directly
     * from an external link or reloads the browser, this triggers the query pipeline immediately
     * to prevent empty results screens.
     */
    const { isLoading, isError } = useGetProductsQuery();

    // Performance: Evaluates multi-criteria sorting passing empty string ('') for category matching
    const filteredProducts = useAppSelector((state) =>
        selectProductsByFiltersAndSort(state, query, '', sort)
    );

    // Contextual Sync: Ensures search state is kept current across UI panels
    useEffect(() => {
        dispatch(setQuery(query));
    }, [query, dispatch]);

    const hasResults = filteredProducts.length > 0;

    if (isLoading) {
        return (
            <div className="w-full space-y-4" aria-busy="true" aria-live="polite">
                {/* Maintain structural toolbar placement even when evaluating background streams */}
                <SearchSortControls currentSort={sort} />

                {/* High-Fidelity Visual Skeletal Loading State Grid Layout */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl:gap-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <section className="mt-4 flex flex-col items-center justify-center rounded-2xl bg-(--error-muted)/10 px-6 py-12 text-center" role="alert">
                <Heading level={2} weight="bold" className="mb-1 text-(--error)">
                    Catalog Sync Failure
                </Heading>
                <p className="max-w-xs text-sm text-(--neutral-color)">
                    We were unable to securely map our product indexing servers. Please refresh shortly.
                </p>
            </section>
        );
    }

    return (
        <>
            {/* Unified sorting control toolbar embedded directly on top of results layout matrix */}
            <SearchSortControls currentSort={sort} />

            <div className="mb-2 flex justify-end">
                <span className="text-xs font-medium tabular-nums text-(--neutral-color)">
                    Found {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
                </span>
            </div>

            {/* Products List */}
            <div className="w-full space-y-4">
                {hasResults ? (
                    <div className="flex flex-col gap-4 text-left" role="list">
                        {filteredProducts.map((product) => (
                            <ProductCardHorizontal
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    /* Semantic Empty State */
                    <section
                        className="mt-4 flex flex-col items-center justify-center rounded-2xl bg-(--surface-muted)/20 px-6 py-12 text-center"
                        role="status"
                        aria-live="polite"
                    >
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-(--surface-muted)/50">
                            <Icon
                                name="search"
                                size={24}
                                className="text-(--neutral-color) opacity-40"
                            />
                        </div>
                        <Heading level={2} weight="semibold" align="center" className="mb-1 text-(--foreground)">
                            No results found
                        </Heading>
                        <p className="mx-auto max-w-xs text-sm text-(--neutral-color)">
                            Nothing matched &quot;{query}&quot;. Try adjusting your search or sorting criteria.
                        </p>
                    </section>
                )}
            </div>
        </>
    );
};
