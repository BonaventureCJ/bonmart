// src/features/api/api-slice.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Centralized Enterprise API Slice Gateway
 * Handles global base URLs, request headers, caching policies, 
 * and orchestration of system-wide invalidation tags.
 */
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
    tagTypes: ['Products', 'Categories', 'Cart', 'Orders', 'User'],
    /**
     * Endpoints are left empty at initialization.
     * Features will inject their individual endpoints dynamically using injectEndpoints.
     */
    endpoints: () => ({}),
});

