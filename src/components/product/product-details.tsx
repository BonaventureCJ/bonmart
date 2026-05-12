// src/components/product/product-details.tsx

'use client';

import type { Product } from '@/data/mock-products';
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
    return (
        <section className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
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
