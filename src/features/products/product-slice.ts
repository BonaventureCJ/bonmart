// src/features/products/product-slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MOCK_PRODUCTS, Product } from '@/data/mock-products';

interface ProductState {
    items: Product[];
    filteredItems: Product[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    items: MOCK_PRODUCTS,
    filteredItems: MOCK_PRODUCTS,
    isLoading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // Reducers handle the "How the state changes"
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.items = action.payload;
        },
        filterEcoFriendly: (state, action: PayloadAction<boolean>) => {
            state.filteredItems = action.payload
                ? state.items.filter((p) => p.isEcoFriendly)
                : state.items;
        },
        searchProducts: (state, action: PayloadAction<string>) => {
            const query = action.payload.toLowerCase();
            state.filteredItems = state.items.filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    p.category.toLowerCase().includes(query)
            );
        },
    },
});

export const { filterEcoFriendly, searchProducts, setProducts } = productSlice.actions;
export default productSlice.reducer;
