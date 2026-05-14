// src/components/search/search-results-client.tsx

'use client';

import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectProductsBySearchAndSort, type SortOption } from '@/features/products/product-selectors';
import { setQuery } from '@/features/search/search-slice';
import { ProductCardHorizontal } from '@/components/product/product-card-horizontal';
import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';
import { SearchSortControls } from './search-sort-controls';

interface SearchResultsClientProps {
    readonly query: string;
    readonly sort: SortOption;
}

export const SearchResultsClient: React.FC<SearchResultsClientProps> = ({ query, sort }) => {
    const dispatch = useAppDispatch();

    // Performance: Evaluates multi-criteria calculations instantly via memory adapters
    const filteredProducts = useAppSelector((state) =>
        selectProductsBySearchAndSort(state, query, sort)
    );

    useEffect(() => {
        dispatch(setQuery(query));
    }, [query, dispatch]);

    const hasResults = filteredProducts.length > 0;

    return (
        <>
            <SearchSortControls currentSort={sort} />

            <div className="mb-2 flex justify-end">
                <span className="text-xs font-medium tabular-nums text-(--neutral-color)">
                    Found {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
                </span>
            </div>

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
                    <section
                        className="mt-4 flex flex-col items-center justify-center rounded-2xl bg-(--surface-muted)/20 px-6 py-12 text-center"
                        role="status"
                        aria-live="polite"
                    >
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-(--surface-muted)/50">
                            <Icon name="search" size={24} className="text-(--neutral-color) opacity-40" />
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
