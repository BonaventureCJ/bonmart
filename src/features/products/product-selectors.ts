// src/features/products/product-selectors.ts

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

/**
 * Base Selector
 */
const selectProductState = (state: RootState) => state.products;

/**
 * Selects all products from the store
 */
export const selectAllProducts = createSelector(
    [selectProductState],
    (products) => products.items
);

/**
 * Selects currently filtered products
 */
export const selectFilteredProducts = createSelector(
    [selectProductState],
    (products) => products.filteredItems
);

/**
 * Selects loading state
 */
export const selectProductsLoading = createSelector(
    [selectProductState],
    (products) => products.isLoading
);

/**
 * Selects error state
 */
export const selectProductsError = createSelector(
    [selectProductState],
    (products) => products.error
);

/**
 * Memoized Category List
 * Derived from items to ensure unique categories for UI filters
 */
export const selectProductCategories = createSelector(
    [selectAllProducts],
    (items) => Array.from(new Set(items.map((item) => item.category)))
);

/**
 * Parameterized Selector: Find a specific product by ID
 * Handles both string and number ID comparison safely
 */
export const selectProductById = (productId: string | number) =>
    createSelector([selectAllProducts], (items) =>
        items.find((product) => String(product.id) === String(productId))
    );

/**
 * Parameterized Selector: Get item count for a specific category
 * Optimized for reuse in CategoryCards and Sidebars
 */
export const selectProductCountByCategory = (categoryName: string) =>
    createSelector(
        [selectAllProducts],
        (items) => items.filter(
            (p) => p.category.toLowerCase() === categoryName.toLowerCase()
        ).length
    );
