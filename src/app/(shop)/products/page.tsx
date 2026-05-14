// src/app/(shop)/products/page.tsx

import { Metadata } from 'next';
import React, { Suspense } from 'react';
import { Heading } from '@/components/ui/heading/heading';
import PageContainer from '@/components/layout/page-container';
import { ProductListClient } from '@/components/product/product-list-client';
import { type SortOption } from '@/features/products/product-selectors';

interface ProductsPageProps {
    searchParams: Promise<{ sort?: string; category?: string }>;
}

export const metadata: Metadata = {
    title: 'All Products | Bonmart',
    description: 'Explore our curated selection of high-quality, eco-friendly products for a sustainable lifestyle.',
};

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

                <Suspense fallback={<div className="h-96 w-full animate-pulse rounded-3xl bg-(--surface-muted)/20" />}>
                    <ProductListClient sort={sort} category={category} />
                </Suspense>
            </div>
        </PageContainer>
    );
}

