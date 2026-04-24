// src/components/product/product-details.tsx

'use client';

import type { Product } from '@/data/mock-products';
import { ProductGallery } from './details/product-gallery';
import { ProductInfo } from './details/product-info';
import { ProductActions } from './details/product-actions';
import { TrustBadges } from './details/trust-badges';

interface ProductDetailsProps { product: Product; }

export function ProductDetails({ product }: ProductDetailsProps) {
    return (
        <section className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                <ProductGallery product={product} />
                <div className="flex flex-col">
                    <ProductInfo product={product} />
                    <ProductActions product={product} />
                    <TrustBadges />
                </div>
            </div>
        </section>
    );
}
