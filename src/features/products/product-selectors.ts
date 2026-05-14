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
 * Parametric Search Filter & Multi-Criteria Sort Selector
 * Completely decoupled from internal client slice states to achieve absolute referential stability.
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
        // Array clone protects underlying Redux memory state from mutable mutations
        return [...filteredItems].sort((a, b) => {
            switch (sort) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'eco-high':
                    // Prioritizes higher ecological ratings first
                    return (b.ecoRating || 0) - (a.ecoRating || 0);
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

export const selectProductsLoading = createSelector(
    [selectProductState],
    (products) => products.isLoading
);

export const selectProductsError = createSelector(
    [selectProductState],
    (products) => products.error
);
