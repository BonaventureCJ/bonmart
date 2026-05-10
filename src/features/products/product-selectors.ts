// src/features/products/product-selectors.ts

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { selectSearchQuery } from '@/features/search/search-selectors';

/**
 * Base Selector
 * Isolates the product slice from the root state.
 */
const selectProductState = (state: RootState) => state.products;

/**
 * Selects the master list of all products.
 */
export const selectAllProducts = createSelector(
    [selectProductState],
    (products) => products.items
);

/**
 * Specialized Search Results Selector
 * Used ONLY by the Search Results page. 
 * Reactively filters products based on the global search query.
 */
export const selectSearchResults = createSelector(
    [selectAllProducts, selectSearchQuery],
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
 * General Product Feed Selector
 * Used by the main Products Page.
 * Decoupled from the search query so the shop always displays the full catalog.
 */
export const selectFilteredProducts = createSelector(
    [selectAllProducts],
    (items) => items
);

/**
 * Selects loading state.
 */
export const selectProductsLoading = createSelector(
    [selectProductState],
    (products) => products.isLoading
);

/**
 * Selects error state.
 */
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
 * Parameterized Selector: Find a specific product by ID.
 */
export const selectProductById = (productId: string | number) =>
    createSelector([selectAllProducts], (items) =>
        items.find((product) => String(product.id) === String(productId))
    );

/**
 * Parameterized Selector: Get item count for a specific category.
 */
export const selectProductCountByCategory = (categoryName: string) =>
    createSelector(
        [selectAllProducts],
        (items) => items.filter(
            (p) => p.category.toLowerCase() === categoryName.toLowerCase()
        ).length
    );
