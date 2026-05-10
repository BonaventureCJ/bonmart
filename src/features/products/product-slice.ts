// src/features/products/product-slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MOCK_PRODUCTS, Product } from '@/data/mock-products';

interface ProductState {
    items: Product[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    items: MOCK_PRODUCTS,
    isLoading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        /**
         * Updates the master product list.
         * Useful for API integrations or inventory refreshes.
         */
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.items = action.payload;
        },
        /**
         * Sets the loading state for product operations.
         */
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        /**
         * Captures error messages from failed product actions.
         */
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

// Export clean actions
export const { setProducts, setLoading, setError } = productSlice.actions;

// Default export for the store configuration
export default productSlice.reducer;
