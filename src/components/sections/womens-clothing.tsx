// src/components/sections/womens-clothing.tsx

'use client';

import { useAppSelector } from '@/store/hooks';
import { ProductSliderSection } from './product-slider-section';
import {
    selectWomensClothingProducts,
    selectProductsLoading
} from '@/features/products/product-selectors';

export function WomensClothing() {
    const products = useAppSelector(selectWomensClothingProducts);
    const isLoading = useAppSelector(selectProductsLoading);

    return (
        <ProductSliderSection
            title="Elegant"
            accentWord="Women's Fashion"
            tagline="Ethical fashion that empowers both the wearer and the planet."
            products={products}
            isLoading={isLoading}
            viewAllHref="/products?category=women's clothing"
            viewAllText="View All Women's Fashion"
        />
    );
}
