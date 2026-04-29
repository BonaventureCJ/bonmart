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

/**
 * ProductsPage Component
 * Optimized for consistent vertical rhythm and semantic structure.
 */
export default function ProductsPage() {
    return (
        <PageContainer>
            <div className="flex flex-col">
                {/* 
                  Header Section:
                  - Spacing: Uses semantic border colors and consistent padding.
                  - Typography: Leverages standardized Heading and neutral color tokens.
                */}
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
                        <span className="text-xs font-bold tracking-widest text-(--brand-color)">
                            Showing all available results
                        </span>
                    </div>
                </header>

                {/* Main Product Feed: Client-side state managed grid */}
                <ProductListClient />
            </div>
        </PageContainer>
    );
}
