// src/components/product/product-details.tsx

'use client';

import React from 'react';
import type { Product } from '@/types/product';
import { useGetProductsQuery } from '@/features/products/product-slice';
import { ProductGallery } from './details/product-gallery';
import { ProductInfo } from './details/product-info';
import { ProductActions } from './details/product-actions';
import { TrustBadges } from './details/trust-badges';

interface ProductDetailsProps { product: Product; }

/**
 * ProductDetails Component
 * 
 * Master layout for the Product Detail Page.
 * Children are integrated with CreateEntityAdapter normalization for high-performance 
 * state tracking (Wishlist/Cart/Real-time updates).
 */
export function ProductDetails({ product }: ProductDetailsProps) {
    /**
     * Enterprise Cache Synchronization Strategy:
     * We mount the query hook here to subscribe this client tree to the global catalog.
     * If the user deep-links directly to this page, this silently populates the client-side
     * RTK Query cache in the background, allowing children like <ProductInfo /> to smoothly
     * execute O(1) selectors without state disconnects.
     */
    useGetProductsQuery();

    return (
        <section className="mx-auto max-w-7xl px-4 py-8 lg:py-12" aria-label={`Details for ${product.name}`}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                {/* Visual Presentation */}
                <ProductGallery product={product} />

                {/* Information & Interaction Layer */}
                <div className="flex flex-col">
                    {/* Integrated with selectProductById for normalized data sync */}
                    <ProductInfo product={product} />

                    {/* Integrated with O(1) Cart/Wishlist adapters */}
                    <ProductActions product={product} />

                    {/* Static trust markers */}
                    <TrustBadges />
                </div>
            </div>
        </section>
    );
}