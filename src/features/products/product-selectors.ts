// src/features/products/product-selectors.ts

import { createSelector } from '@reduxjs/toolkit';
import { shallowEqual } from 'react-redux';
import { RootState } from '@/store/store';
import { productsAdapter } from './product-slice';
import { type Product } from '@/data/mock-products';

export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'eco-high';

const selectProductState = (state: RootState) => state.products;

export const {
    selectAll: selectAllProducts,
    selectEntities: selectProductEntities,
    selectById: selectProductById,
} = productsAdapter.getSelectors(selectProductState);

/**
 * Parametric Filter & Multi-Criteria Sort Selector
 * Combines search queries, category parameters, and sorting logic seamlessly.
 */
export const selectProductsByFiltersAndSort = createSelector(
    [
        selectAllProducts,
        (_state: RootState, query: string) => query,
        (_state: RootState, _query: string, category: string) => category,
        (_state: RootState, _query: string, _category: string, sort: SortOption) => sort
    ],
    (items, query, category, sort): Product[] => {
        let filteredItems = items;

        // 1. Category Filter Pass
        const trimmedCategory = category.trim().toLowerCase();
        if (trimmedCategory) {
            filteredItems = filteredItems.filter(
                (product) => product.category.toLowerCase() === trimmedCategory
            );
        }

        // 2. Text Query Search Pass
        const trimmedQuery = query.trim().toLowerCase();
        if (trimmedQuery) {
            filteredItems = filteredItems.filter(
                (product) =>
                    product.name.toLowerCase().includes(trimmedQuery) ||
                    product.category.toLowerCase().includes(trimmedQuery) ||
                    product.description.toLowerCase().includes(trimmedQuery)
            );
        }

        // 3. Multi-Criteria Sort Pass
        return [...filteredItems].sort((a, b) => {
            switch (sort) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'eco-high':
                    if (a.isEcoFriendly !== b.isEcoFriendly) {
                        return a.isEcoFriendly ? -1 : 1;
                    }
                    return b.rating.rate - a.rating.rate;
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'name-asc':
                default:
                    return a.name.localeCompare(b.name);
            }
        });
    }
);

export const selectAutocompleteSuggestions = createSelector(
    [selectAllProducts, (_state: RootState, query: string) => query],
    (items, query): string[] => {
        const trimmed = query.trim().toLowerCase();
        if (!trimmed || trimmed.length < 2) return [];

        const suggestions = new Set<string>();
        for (const item of items) {
            if (item.name.toLowerCase().includes(trimmed)) {
                suggestions.add(item.name);
            }
            if (suggestions.size >= 5) break;
        }
        return Array.from(suggestions);
    }
);

export const selectProductsLoading = createSelector(
    [selectProductState],
    (products) => products.isLoading
);

export const selectProductsError = createSelector(
    [selectProductState],
    (products) => products.error
);

/**
 * Derived List: All unique product categories.
 * Optimized: Enforces strict shallow array reference comparison.
 * Performance: Completely blocks downstream UI re-renders if the list of categories is un-mutated.
 */
export const selectProductCategories = createSelector(
    [selectAllProducts],
    (items) => Array.from(new Set(items.map((item) => item.category))),
    {
        memoizeOptions: {
            resultEqualityCheck: shallowEqual
        }
    }
);

export const selectProductCountByCategory = (categoryName: string) =>
    createSelector([selectAllProducts], (items) =>
        items.filter((p) => p.category.toLowerCase() === categoryName.toLowerCase()).length
    );

/**
 * Featured Eco Products Selector
 * Returns the top 5 products filtered by eco-friendly status 
 * and sorted by highest rating.
 */
export const selectFeaturedEcoProducts = createSelector(
    [selectAllProducts],
    (items): Product[] => {
        return [...items]
            .sort((a, b) => {
                // Priority 1: Eco-friendly status
                if (a.isEcoFriendly !== b.isEcoFriendly) {
                    return a.isEcoFriendly ? -1 : 1;
                }
                // Priority 2: Highest rating rate
                return b.rating.rate - a.rating.rate;
            })
            .slice(0, 5);
    }
);
