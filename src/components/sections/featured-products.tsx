// src/components/sections/featured-products.tsx

import { Suspense } from 'react';
import { Heading } from '@/components/ui/heading/heading';
import { Button } from '@/components/ui/button/button';
import { ProductListClient } from '@/components/product/product-list-client';

export function FeaturedProducts() {
    return (
        <section aria-labelledby="featured-products-title">
            <header className="mb-10 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
                <div className="text-center md:text-left">
                    <Heading id="featured-products-title" level={2} weight="bold" align="left">
                        Featured <span className="text-(--brand-color)">Essentials</span>
                    </Heading>
                    <p className="mt-2 text-(--neutral-color)">Our most-loved eco-friendly picks.</p>
                </div>
                <Button href="/products" variant="ghost" icon="arrowRight" iconPlacement="right">
                    View Catalog
                </Button>
            </header>

            <Suspense fallback={<div className="h-96 w-full animate-pulse rounded-3xl bg-(--surface-muted)/20" />}>
                <ProductListClient sort="name-asc" category="" />
            </Suspense>
        </section>
    );
}
