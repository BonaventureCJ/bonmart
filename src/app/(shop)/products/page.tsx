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
            <main className="flex flex-col">
                {/* Header Section: Now center-aligned for all viewports */}
                <header className="mb-10 flex flex-col items-center gap-4 border-b border-(--toggle-bg) pb-10 text-center">
                    <div className="max-w-2xl">
                        {/* Heading defaults to center now */}
                        <Heading level={1} weight="bold" className="mb-3">
                            Our Products
                        </Heading>
                        <p className="text-(--neutral-color) text-base md:text-lg">
                            Browse through our extensive collection of {products.length} sustainable items.
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-(--brand-color) opacity-80">
                            Showing all {products.length} results
                        </span>
                    </div>
                </header>

                {/* Product Grid */}
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
