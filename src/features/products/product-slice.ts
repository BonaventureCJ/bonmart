// src/features/products/product-slice.ts

import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
    EntityState
} from '@reduxjs/toolkit';
import { MOCK_PRODUCTS, type Product } from '@/data/mock-products';

export const productsAdapter = createEntityAdapter<Product, number>({
    selectId: (product) => product.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

interface ProductState extends EntityState<Product, number> {
    isLoading: boolean;
    error: string | null;
}

const initialState: ProductState = productsAdapter.getInitialState({
    isLoading: false,
    error: null,
});

const populatedInitialState = productsAdapter.setAll(initialState, MOCK_PRODUCTS);

const productSlice = createSlice({
    name: 'products',
    initialState: populatedInitialState,
    reducers: {
        setProducts: productsAdapter.setAll,
        updateProduct: productsAdapter.upsertOne,
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setProducts, updateProduct, setLoading, setError } = productSlice.actions;
export default productSlice.reducer;
