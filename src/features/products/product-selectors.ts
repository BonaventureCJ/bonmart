// src/features/products/product-selectors.ts

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { productsAdapter } from './product-slice';
import { type Product } from '@/data/mock-products';

/**
 * Supported Sort Options Matrix Types
 */
export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'eco-high';

const selectProductState = (state: RootState) => state.products;

export const {
    selectAll: selectAllProducts,
    selectEntities: selectProductEntities,
    selectById: selectProductById,
} = productsAdapter.getSelectors(selectProductState);

/**
 * Enterprise Parametric Search Filter & Multi-Criteria Sort Selector
 * Decoupled from internal client states to achieve absolute stability.
 * Utilizes 'isEcoFriendly' and fallback to 'rating.rate' under schema parameters.
 */
export const selectProductsBySearchAndSort = createSelector(
    [
        selectAllProducts,
        (_state: RootState, query: string) => query,
        (_state: RootState, _query: string, sort: SortOption) => sort
    ],
    (items, query, sort): Product[] => {
        // 1. First Pass: Handle text filtering operations
        const trimmedQuery = query.trim().toLowerCase();
        let filteredItems = items;

        if (trimmedQuery) {
            filteredItems = items.filter(
                (product) =>
                    product.name.toLowerCase().includes(trimmedQuery) ||
                    product.category.toLowerCase().includes(trimmedQuery) ||
                    product.description.toLowerCase().includes(trimmedQuery)
            );
        }

        // 2. Second Pass: Handle multi-criteria sorting variations
        // Array clone protects underlying Redux memory state from mutations
        return [...filteredItems].sort((a, b) => {
            switch (sort) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'eco-high':
                    // Prioritize green eco-friendly items first
                    if (a.isEcoFriendly !== b.isEcoFriendly) {
                        return a.isEcoFriendly ? -1 : 1;
                    }
                    // Secondary sorting tier fallback: customer rating score rank
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

/**
 * Direct Live Suggestion Autocomplete Aggregator Selector
 */
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
            if (suggestions.size >= 5) break; // Hard limit suggestions overlay to 5 rows max
        }
        return Array.from(suggestions);
    }
);

/**
 * UI State Selectors
 */
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
 */
export const selectProductCategories = createSelector(
    [selectAllProducts],
    (items) => Array.from(new Set(items.map((item) => item.category)))
);

/**
 * Parameterized Selector: Get item count for a specific category.
 */
export const selectProductCountByCategory = (categoryName: string) =>
    createSelector([selectAllProducts], (items) =>
        items.filter((p) => p.category.toLowerCase() === categoryName.toLowerCase()).length
    );
