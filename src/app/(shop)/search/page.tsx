// src/app/(shop)/search/page.tsx
'use client';

import React, { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { MOCK_PRODUCTS } from '@/data/mock-products';
import { ProductCardHorizontal } from '@/components/product/product-card-horizontal';
import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';
import { SearchForm } from '@/components/search/search-form';
import PageContainer from '@/components/layout/page-container';

/**
 * Enterprise Search Results Page for Bonmart.
 * 
 * Compatibility:
 * - Integrates with custom Icon component system using variants.
 * - Utilizes PageContainer for centralized, max-width layout.
 * - Optimized with useMemo for client-side filtering.
 */
export default function SearchPage() {
    const query = useAppSelector((state) => state.search.query);

    // Filter products based on name, category, or description
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
            <main className="flex flex-col items-center py-8 md:py-12">
                {/* 1. Header Section */}
                <header className="mb-10 w-full max-w-2xl space-y-6">
                    <div className="space-y-3">
                        <Heading
                            level={1}
                            weight="bold"
                            align="center"
                        >
                            {query ? `Results for "${query}"` : 'Search Products'}
                        </Heading>
                        <p className="text-(--neutral-color) text-sm md:text-base">
                            Discover our curated collection of eco-friendly products.
                            Everything we offer is selected with the planet in mind.
                        </p>
                    </div>

                    {/* Search Form for refining queries within the page */}
                    <div className="flex justify-center">
                        <SearchForm className="max-w-md" />
                    </div>
                </header>

                {/* 2. Results Meta Information */}
                <div className="mb-8 w-full border-b border-(--toggle-bg) pb-4 text-center">
                    <span className="text-sm font-medium text-(--neutral-color)">
                        Found {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                    </span>
                </div>

                {/* 3. Products List Container */}
                <div className="w-full space-y-6">
                    {filteredProducts.length > 0 ? (
                        <div className="flex flex-col gap-6 text-left">
                            {filteredProducts.map((product) => (
                                <ProductCardHorizontal
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    ) : (
                        /* 4. Semantic Empty State using the updated Icon component */
                        <div
                            className="mt-8 flex flex-col items-center justify-center rounded-3xl bg-(--surface-muted)/20 py-20 px-6 text-center"
                            role="status"
                        >
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-(--surface-muted)">
                                <Icon
                                    name="search"
                                    size={32}
                                    variant="neutral"
                                    label="No results found"
                                />
                            </div>
                            <Heading level={2} weight="semibold" align="center" className="mb-2">
                                No products found
                            </Heading>
                            <p className="text-(--neutral-color) max-w-xs mx-auto">
                                We couldn&apos;t find anything matching &quot;{query}&quot;.
                                Try checking your spelling or using more general terms.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </PageContainer>
    );
}

