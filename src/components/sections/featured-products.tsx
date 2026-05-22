// src/components/sections/featured-products.tsx

'use client';

import { useAppSelector } from '@/store/hooks';
import { Heading } from '@/components/ui/heading/heading';
import { Button } from '@/components/ui/button/button';
import { ProductCard } from '@/components/product/product-card';
import { ProductCardSkeleton } from '@/components/product/product-card-skeleton';
import {
    selectFeaturedEcoProducts,
    selectProductsLoading
} from '@/features/products/product-selectors';

/**
 * FeaturedProducts Section
 * Renders the top-rated sustainable products using real-time store data.
 * Displays a skeleton state during data fetching.
 */
export function FeaturedProducts() {
    const products = useAppSelector(selectFeaturedEcoProducts);
    const isLoading = useAppSelector(selectProductsLoading);

    return (
        <section aria-labelledby="featured-products-title">
            <header className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
                <div className="text-center md:text-left">
                    <Heading id="featured-products-title" level={2} weight="bold" align="left">
                        Featured <span className="text-(--brand-color)">Eco-Essentials</span>
                    </Heading>
                    <p className="mt-1 text-sm text-(--neutral-color)">
                        Our highest-rated sustainable picks for a better future.
                    </p>
                </div>
                <Button
                    href="/products"
                    variant="ghost"
                    size="sm"
                    icon="arrowRight"
                    iconPlacement="right"
                    className="text-(--brand-color) hover:bg-(--brand-color)/5"
                >
                    View Catalog
                </Button>
            </header>

            {/* Success/Loading Grid */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => <ProductCardSkeleton key={i} />)
                    : products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>

            {/* Fallback for Empty State */}
            {!isLoading && products.length === 0 && (
                <div className="py-12 text-center border border-dashed border-(--toggle-bg) rounded-3xl">
                    <p className="text-(--neutral-color)">No sustainable essentials found at this time.</p>
                </div>
            )}
        </section>
    );
}
