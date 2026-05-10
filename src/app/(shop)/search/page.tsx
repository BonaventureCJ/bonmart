// src/app/(shop)/search/page.tsx

'use client';

import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectSearchResults } from '@/features/products/product-selectors';
import { selectSearchQuery } from '@/features/search/search-selectors';
import { ProductCardHorizontal } from '@/components/product/product-card-horizontal';
import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';
import PageContainer from '@/components/layout/page-container';

/**
 * Enterprise Search Results Page for Bonmart.
 * Consumes selectSearchResults to isolate search logic from the main shop feed.
 */
export default function SearchPage() {
    // Memoized Selectors
    const query = useAppSelector(selectSearchQuery);
    const filteredProducts = useAppSelector(selectSearchResults);

    const hasResults = filteredProducts.length > 0;

    return (
        <PageContainer>
            {/* 1. Compact Page Intro */}
            <header className="mx-auto mb-6 w-full max-w-2xl space-y-1 text-center">
                <Heading
                    level={1}
                    weight="bold"
                    align="center"
                    className="tracking-tight"
                >
                    {query ? `Results for "${query}"` : 'All Products'}
                </Heading>
                <p className="text-xs text-(--neutral-color) md:text-sm">
                    {query
                        ? `Found ${filteredProducts.length} items.`
                        : "Our premium eco-friendly collection."
                    }
                </p>
            </header>

            {/* 2. Minimalist Meta Row */}
            <div className="mb-4 flex items-center justify-between border-b border-(--toggle-bg) pb-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-(--neutral-color) opacity-70">
                    Search Results
                </span>
                <span className="text-xs font-medium tabular-nums text-(--neutral-color)">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
                </span>
            </div>

            {/* 3. Products List */}
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
                    /* 4. Semantic Empty State */
                    <section
                        className="mt-4 flex flex-col items-center justify-center rounded-2xl bg-(--surface-muted)/20 px-6 py-12 text-center"
                        role="status"
                    >
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-(--surface-muted)/50">
                            <Icon
                                name="search"
                                size={24}
                                className="text-(--neutral-color) opacity-40"
                            />
                        </div>
                        <Heading level={2} weight="semibold" align="center" className="mb-1">
                            No results found
                        </Heading>
                        <p className="mx-auto max-w-xs text-sm text-(--neutral-color)">
                            Nothing matched &quot;{query}&quot;. Try adjusting your search criteria.
                        </p>
                    </section>
                )}
            </div>
        </PageContainer>
    );
}
