// src/components/sections/electronics-products.tsx

'use client';

import { useAppSelector } from '@/store/hooks';
import { ProductSliderSection } from './product-slider-section';
import {
    selectElectronicsProducts,
    selectProductsLoading
} from '@/features/products/product-selectors';

/**
 * ElectronicsProducts Section
 * Renders a curated list of tech essentials using the reusable slider shell.
 */
export function ElectronicsProducts() {
    const products = useAppSelector(selectElectronicsProducts);
    const isLoading = useAppSelector(selectProductsLoading);

    return (
        <ProductSliderSection
            title="Premium"
            accentWord="Electronics"
            tagline="Cutting-edge technology meets sustainable engineering."
            products={products}
            isLoading={isLoading}
            viewAllHref="/products?category=electronics"
        />
    );
}
