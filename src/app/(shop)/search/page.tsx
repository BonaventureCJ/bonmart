// src/app/(shop)/search/page.tsx

'use client';

import React, { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { MOCK_PRODUCTS } from '@/data/mock-products';
import { ProductCardHorizontal } from '@/components/product/product-card-horizontal';
import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';
import PageContainer from '@/components/layout/page-container';

/**
 * Enterprise Search Results Page for Bonmart (Compact Version).
 * 
 * Optimizations:
 * - Reduced vertical margins (mb-6 instead of mb-10).
 * - Tightened typography spacing.
 * - Minimalist results meta row.
 */
export default function SearchPage() {
    const query = useAppSelector((state) => state.search.query);

    const filteredProducts = useMemo(() => {
        const trimmedQuery = query.trim().toLowerCase();
        if (!trimmedQuery) return MOCK_PRODUCTS;

        return MOCK_PRODUCTS.filter(
            (product) =>
                product.name.toLowerCase().includes(trimmedQuery) ||
                product.category.toLowerCase().includes(trimmedQuery) ||
                product.description.toLowerCase().includes(trimmedQuery)
        );
    }, [query]);

    return (
        <PageContainer>
            {/* 1. Compact Page Intro - Reduced bottom margin and spacing */}
            <div className="mb-6 w-full max-w-2xl space-y-1 text-center mx-auto">
                <Heading
                    level={1}
                    weight="bold"
                    align="center"
                    className="tracking-tight"
                >
                    {query ? `Results for "${query}"` : 'All Products'}
                </Heading>
                <p className="text-(--neutral-color) text-xs md:text-sm">
                    {query
                        ? `Found ${filteredProducts.length} items.`
                        : "Our premium eco-friendly collection."
                    }
                </p>
            </div>

            {/* 2. Minimalist Meta Row - Reduced padding and border-b spacing */}
            <div className="mb-4 flex items-center justify-between border-b border-(--toggle-bg) pb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-(--neutral-color) opacity-70">
                    Search Results
                </span>
                <span className="text-xs font-medium text-(--neutral-color)">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
                </span>
            </div>

            {/* 3. Products List - Maintains gap-4 for density */}
            <div className="w-full space-y-4">
                {filteredProducts.length > 0 ? (
                    <div className="flex flex-col gap-4 text-left">
                        {filteredProducts.map((product) => (
                            <ProductCardHorizontal
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    /* 4. Semantic Empty State */
                    <div
                        className="mt-4 flex flex-col items-center justify-center rounded-2xl bg-(--surface-muted)/20 py-12 px-6 text-center"
                        role="status"
                    >
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-(--surface-muted)">
                            <Icon
                                name="search"
                                size={24}
                                variant="neutral"
                                label="No results found"
                            />
                        </div>
                        <Heading level={2} weight="semibold" align="center" className="mb-1">
                            No results
                        </Heading>
                        <p className="text-(--neutral-color) text-sm max-w-xs mx-auto">
                            Nothing matched &quot;{query}&quot;. Try the search bar above.
                        </p>
                    </div>
                )}
            </div>
        </PageContainer>
    );
}
