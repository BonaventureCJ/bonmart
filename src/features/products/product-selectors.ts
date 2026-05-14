// src/features/products/product-selectors.ts

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { productsAdapter } from './product-slice';

/**
 * Base Selector
 */
const selectProductState = (state: RootState) => state.products;

/**
 * Built-in Adapter Selectors
 * selectAll: returns the array of products
 * selectEntities: returns the lookup object (dictionary)
 * selectById: returns a specific entity
 */
export const {
    selectAll: selectAllProducts,
    selectEntities: selectProductEntities,
    selectById: selectProductById,
} = productsAdapter.getSelectors(selectProductState);

/**
 * Specialized Parametric Search Results Selector
 * Decouples directly from internal slice state to ensure absolute server sync referential stability.
 */
export const selectProductsBySearchQuery = createSelector(
    [selectAllProducts, (_state: RootState, query: string) => query],
    (items, query) => {
        const trimmedQuery = query.trim().toLowerCase();
        if (!trimmedQuery) return items;

        return items.filter(
            (product) =>
                product.name.toLowerCase().includes(trimmedQuery) ||
                product.category.toLowerCase().includes(trimmedQuery) ||
                product.description.toLowerCase().includes(trimmedQuery)
        );
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
 * Now performs efficiently against the normalized list.
 */
export const selectProductCountByCategory = (categoryName: string) =>
    createSelector([selectAllProducts], (items) =>
        items.filter((p) => p.category.toLowerCase() === categoryName.toLowerCase()).length
    );
