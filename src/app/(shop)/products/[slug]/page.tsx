// src/app/(shop)/products/[slug]/page.tsx

// src/app/(shop)/products/[slug]/page.tsx

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/data/mock-products';
import PageContainer from '@/components/layout/page-container';
import { ProductDetails } from '@/components/product/product-details';

interface ProductPageProps {
  /** Next.js 15: params must be a Promise */
  params: Promise<{ slug: string }>;
}

/**
 * Enterprise SEO: Metadata generation remains on the server.
 * This ensures social shares and search engines see the correct product info.
 */
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found | Bonmart',
      description: 'The requested eco-friendly product could not be found.'
    };
  }

  return {
    title: `${product.name} | Bonmart`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Bonmart`,
      description: product.description,
      images: [{ url: product.imageUrl }],
    },
  };
}

/**
 * Product Details Page
 * Server component that passes the hydrated product data to the Client-side logic.
 */
export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // Find product from source (eventually an API call)
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <PageContainer>
      {/* 
        Semantic Main wrapper:
        The ProductDetails component (Client) will now handle the Redux dispatches
        for cart and wishlist based on the 'product' prop passed from the server.
      */}
      <main className="w-full">
        <ProductDetails product={product} />
      </main>
    </PageContainer>
  );
}

/**
 * Enterprise Optimization: generateStaticParams
 * Pre-renders these pages at build time for instant loading.
 */
export async function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}
