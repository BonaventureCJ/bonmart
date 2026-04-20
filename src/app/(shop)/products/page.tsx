// src/app/(shop)/products/page.tsx

import { Metadata } from 'next';
import { MOCK_PRODUCTS } from '@/data/mock-products';
import { ProductCard } from '@/components/product/product-card';
import { Heading } from '@/components/ui/heading/heading';
import PageContainer from '@/components/layout/page-container';

/**
 * Enterprise SEO Metadata
 */
export const metadata: Metadata = {
    title: 'All Products | Bonmart',
    description: 'Explore our curated selection of high-quality, eco-friendly products for a sustainable lifestyle.',
    openGraph: {
        title: 'All Products | Bonmart',
        description: 'Shop sustainable with Bonmart. High-quality products, environmentally friendly.',
        type: 'website',
        images: [{ url: '/og-image.jpg' }],
    },
};

export default async function ProductsPage() {
    const products = MOCK_PRODUCTS;

    return (
        <PageContainer>
            <main className="flex flex-col text-left">
                {/* Header Section */}
                <header className="mb-6 flex flex-col gap-4 border-b border-(--toggle-bg) pb-6 md:mb-10 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <Heading level={1} weight="bold" className="mb-2">
                            Our Products
                        </Heading>
                        <p className="text-(--neutral-color) text-base md:text-lg">
                            Browse through our extensive collection of {products.length} sustainable items.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-(--neutral-color)">
                            Showing all {products.length} results
                        </span>
                    </div>
                </header>

                {/* Product Grid: Mobile-first 2 cols -> Laptop 6 cols */}
                {products.length > 0 ? (
                    <section
                        aria-label="Product list"
                        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl:gap-4"
                    >
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </section>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <Heading level={2} weight="semibold" className="mb-4">
                            No products found
                        </Heading>
                        <p className="text-(--neutral-color)">
                            We couldn&apos;t find any products matching your criteria.
                        </p>
                    </div>
                )}
            </main>
        </PageContainer>
    );
}
