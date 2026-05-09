// src/features/products/product-selectors.ts

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

const selectProductState = (state: RootState) => state.products;

export const selectAllProducts = createSelector(
    [selectProductState],
    (products) => products.items
);

export const selectFilteredProducts = createSelector(
    [selectProductState],
    (products) => products.filteredItems
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
 * Memoized Category List
 * Derived from items to ensure unique categories for UI filters
 */
export const selectProductCategories = createSelector(
    [selectAllProducts],
    (items) => Array.from(new Set(items.map((item) => item.category)))
);

export const selectProductById = (productId: string | number) =>
    createSelector([selectAllProducts], (items) =>
        items.find((product) => String(product.id) === String(productId))
    );

