// src/components/sections/featured-products.tsx

'use client';

import { useAppSelector } from '@/store/hooks';
import { ProductSliderSection } from './product-slider-section';
import {
    selectFeaturedEcoProducts,
    selectProductsLoading
} from '@/features/products/product-selectors';

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
            viewAllHref="/products"
        />
    );
}
