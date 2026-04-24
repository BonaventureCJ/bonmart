// src/components/product/product-list-client.tsx

"use client";

import { useAppSelector } from '@/store/hooks';
import { ProductCard } from '@/components/product/product-card';
import { Heading } from '@/components/ui/heading/heading';

export function ProductListClient() {
    // Select only the data needed to prevent unnecessary re-renders
    const { filteredItems } = useAppSelector((state) => state.products);
    const hasProducts = filteredItems.length > 0;

    if (!hasProducts) {
        return (
            <div
                className="flex flex-col items-center justify-center py-20 text-center"
                role="status"
            >
                <Heading level={2} weight="semibold" className="mb-4">
                    No products found
                </Heading>
                <p className="text-(--neutral-color)">
                    We couldn&apos;t find any products matching your criteria.
                </p>
            </div>
        );
    }

    return (
        <section
            aria-label="Product list"
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl:gap-4"
        >
            {filteredItems.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </section>
    );
}
