// src/app/(shop)/products/page.tsx

import { Metadata } from 'next';
import { Heading } from '@/components/ui/heading/heading';
import PageContainer from '@/components/layout/page-container';
import { ProductListClient } from '@/components/product/product-list-client';

/**
 * Enterprise SEO Metadata - Remains on the Server
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

export default function ProductsPage() {

    return (
        <PageContainer>
            <main className="flex flex-col">
                <header className="mb-10 flex flex-col items-center gap-4 border-b border-(--toggle-bg) pb-10 text-center">
                    <div className="max-w-2xl">
                        <Heading level={1} weight="bold" className="mb-3">
                            Our Products
                        </Heading>
                        <p className="text-base text-(--neutral-color) md:text-lg">
                            Browse through our extensive collection of sustainable items designed for a better future.
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-(--brand-color) opacity-80">
                            Showing all available results
                        </span>
                    </div>
                </header>

                {/* Client-side state managed grid */}
                <ProductListClient />
            </main>
        </PageContainer>
    );
}