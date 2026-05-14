// src/components/search/search-results-client.tsx

'use client';

import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectProductsBySearchQuery } from '@/features/products/product-selectors';
import { setQuery } from '@/features/search/search-slice';
import { ProductCardHorizontal } from '@/components/product/product-card-horizontal';
import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';

interface SearchResultsClientProps {
    query: string;
}

/**
 * Highly-Isolated Search Grid Hydrator
 * Leverages normalized state selectors for high-performance filtering based on server parameter criteria.
 */
export const SearchResultsClient: React.FC<SearchResultsClientProps> = ({ query }) => {
    const dispatch = useAppDispatch();

    // Performance: Evaluates parametric query parameters through memory adapters for stable state tracking
    const filteredProducts = useAppSelector((state) =>
        selectProductsBySearchQuery(state, query)
    );

    // Contextual Sync: Ensures search state is kept current across UI panels
    useEffect(() => {
        dispatch(setQuery(query));
    }, [query, dispatch]);

    const hasResults = filteredProducts.length > 0;

    return (
        <>
            {/* Minimalist Meta Row */}
            <div className="mb-4 flex items-center justify-between border-b border-(--toggle-bg) pb-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-(--neutral-color) opacity-70">
                    Search Results
                </span>
                <span className="text-xs font-medium tabular-nums text-(--neutral-color)">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
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
                            Nothing matched &quot;{query}&quot;. Try adjusting your search criteria.
                        </p>
                    </section>
                )}
            </div>
        </>
    );
};
