// src/components/sections/jewelry-products.tsx.

'use client';

import { useAppSelector } from '@/store/hooks';
import { ProductSliderSection } from './product-slider-section';
import {
    selectJewelryProducts,
    selectProductsLoading
} from '@/features/products/product-selectors';

/**
 * JewelryProducts Section
 * Displays sustainable luxury items using the shared slider architecture.
 */
export function JewelryProducts() {
    const products = useAppSelector(selectJewelryProducts);
    const isLoading = useAppSelector(selectProductsLoading);

    return (
        <ProductSliderSection
            title="Sustainable"
            accentWord="Jewelry"
            tagline="Ethically sourced brilliance for every occasion."
            products={products}
            isLoading={isLoading}
            viewAllHref="/products?category=jewelery"
        />
    );
}
