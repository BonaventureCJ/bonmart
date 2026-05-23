// src/components/sections/featured-products.tsx

'use client';

import { useAppSelector } from '@/store/hooks';
import { ProductSliderSection } from './product-slider-section';
import {
    selectFeaturedEcoProducts,
    selectProductsLoading
} from '@/features/products/product-selectors';

/**
 * FeaturedProducts Section
 * Renders the top 8 eco-prioritized products.
 * CTA links directly to the full eco-sorted catalog.
 */
export function FeaturedProducts() {
    const products = useAppSelector(selectFeaturedEcoProducts);
    const isLoading = useAppSelector(selectProductsLoading);

    return (
        <ProductSliderSection
            title="Featured"
            accentWord="Eco-Essentials"
            tagline="Our highest-rated sustainable picks for a better future."
            products={products}
            isLoading={isLoading}
            // 🔗 Navigation points to the full list using the eco-high sort matrix
            viewAllHref="/products?sort=eco-high"
            viewAllText="View All Eco-Essentials"
        />
    );
}

