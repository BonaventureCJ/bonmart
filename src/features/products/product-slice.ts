// src/features/products/product-slice.ts

import { apiSlice } from '@/features/api/api-slice';
import { createEntityAdapter, type EntityState } from '@reduxjs/toolkit';
import { type Product } from '@/data/mock-products';

interface ApiProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export const productsAdapter = createEntityAdapter<Product, number>({
    selectId: (product) => product.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

/**
 * Helper to generate URL-safe SEO slugs deterministically
 */
const generateSlug = (text: string): string =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

/**
 * RTK Query Endpoint Extension
 * Injects granular product domain queries directly into the core centralized apiSlice.
 * Keeps structural cache slices completely normalized within the cache footprint.
 */
export const productSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<EntityState<Product, number>, void>({
            query: () => '/products',
            providesTags: (result) =>
                result
                    ? [
                        ...result.ids.map((id) => ({ type: 'Products' as const, id })),
                        { type: 'Products', id: 'LIST' },
                    ]
                    : [{ type: 'Products', id: 'LIST' }],
            /**
             * Transform Response Edge Node Pipeline:
             * 1. Translates disparate third-party fields to your exact local interface definitions.
             * 2. Computes the custom brand green eco-friendly tokens deterministically.
             * 3. Wraps the output array in a normalized Entity State object via productsAdapter.
             */
            transformResponse: (response: ApiProduct[]): EntityState<Product, number> => {
                const transformedProducts: Product[] = response.map((item) => ({
                    id: item.id,
                    name: item.title,
                    slug: generateSlug(item.title),
                    price: item.price,
                    description: item.description,
                    category: item.category,
                    imageUrl: item.image,
                    rating: {
                        rate: item.rating.rate,
                        count: item.rating.count,
                    },
                    // Green brand logic matching enterprise theme parameters
                    isEcoFriendly: item.id % 2 === 0 || item.category === 'jewelery',
                }));

                return productsAdapter.setAll(
                    productsAdapter.getInitialState(),
                    transformedProducts
                );
            },
        }),
    }),
    overrideExisting: false,
});

export const { useGetProductsQuery } = productSlice;
export default productSlice;
