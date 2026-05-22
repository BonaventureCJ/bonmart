// src/app/(shop)/products/page.tsx

import { Metadata } from 'next';
import React, { Suspense } from 'react';
import { Heading } from '@/components/ui/heading/heading';
import PageContainer from '@/components/layout/page-container';
import { ProductListClient } from '@/components/product/product-list-client';
import { ProductCardSkeleton } from '@/components/product/product-card-skeleton';
import { type SortOption } from '@/features/products/product-selectors';

interface ProductsPageProps {
    searchParams: Promise<{ sort?: string; category?: string }>;
}

export const metadata: Metadata = {
    title: 'All Products | Bonmart',
    description: 'Explore our curated selection of high-quality, eco-friendly products for a sustainable lifestyle.',
};

/**
 * Loading Skeleton Wrapper
 * Matches the responsive grid layout of ProductListClient.
 * Provides a high-fidelity loading state using specific card skeletons.
 */
const ProductsLoadingSkeleton = () => (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl:gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
        ))}
    </div>
);

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const resolvedParams = await searchParams;
    const sort = (resolvedParams.sort?.trim() || 'name-asc') as SortOption;
    const category = resolvedParams.category?.trim() || '';

    return (
        <PageContainer>
            <div className="flex flex-col">
                <header className="mb-8 flex flex-col items-center gap-4 border-b border-(--toggle-bg) pb-8 text-center">
                    <div className="max-w-2xl">
                        <Heading level={1} weight="bold" className="mb-3 text-(--foreground)">
                            Our Products
                        </Heading>
                        <p className="text-base text-(--neutral-color) md:text-lg">
                            Browse through our extensive collection of sustainable items designed for a better future.
                        </p>
                    </div>
                </header>

                <Suspense fallback={<ProductsLoadingSkeleton />}>
                    <ProductListClient sort={sort} category={category} />
                </Suspense>
            </div>
        </PageContainer>
    );
}

