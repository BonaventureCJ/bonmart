// src/app/(shop)/search/page.tsx

import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Heading } from '@/components/ui/heading/heading';
import PageContainer from '@/components/layout/page-container';
import { SearchResultsClient } from '@/components/search/search-results-client';
import { type SortOption } from '@/features/products/product-selectors';

interface SearchPageProps {
    searchParams: Promise<{ q?: string; sort?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
    const resolvedParams = await searchParams;
    const query = resolvedParams.q?.trim() || '';

    return {
        title: query ? `Search results for "${query}" | Bonmart` : 'Eco-Friendly Product Search | Bonmart',
        description: query
            ? `Discover sustainable, green alternative solutions matching "${query}" on Bonmart.`
            : 'Explore our premium eco-friendly collection built for a sustainable lifestyle.',
        robots: { index: false, follow: true }
    };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const resolvedParams = await searchParams;
    const query = resolvedParams.q?.trim() || '';
    const sort = (resolvedParams.sort?.trim() || 'name-asc') as SortOption;

    return (
        <PageContainer>
            <header className="mx-auto mb-6 w-full max-w-2xl space-y-1 text-center">
                <Heading level={1} weight="bold" align="center" className="tracking-tight text-(--foreground)">
                    {query ? `Results for "${query}"` : 'All Products'}
                </Heading>
                <p className="text-xs text-(--neutral-color) md:text-sm">
                    {query ? "Tailored eco-friendly solutions matching your request." : "Our premium eco-friendly collection."}
                </p>
            </header>

            <Suspense fallback={<div className="h-48 w-full animate-pulse rounded-2xl bg-(--surface-muted)/20" />}>
                <SearchResultsClient query={query} sort={sort} />
            </Suspense>
        </PageContainer>
    );
}

