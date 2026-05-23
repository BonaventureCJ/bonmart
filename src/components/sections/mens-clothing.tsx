// src/components/sections/mens-clothing.tsx

'use client';

import { useAppSelector } from '@/store/hooks';
import { ProductSliderSection } from './product-slider-section';
import {
    selectMensClothingProducts,
    selectProductsLoading
} from '@/features/products/product-selectors';

export function MensClothing() {
    const products = useAppSelector(selectMensClothingProducts);
    const isLoading = useAppSelector(selectProductsLoading);

    return (
        <ProductSliderSection
            title="Essential"
            accentWord="Men's Wear"
            tagline="Timeless styles crafted with organic and sustainable materials."
            products={products}
            isLoading={isLoading}
            viewAllHref="/products?category=men's clothing"
            viewAllText="View All Men's Wear"
        />
    );
}
