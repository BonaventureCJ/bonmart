// src/app/(shop)/products/[slug]/page.tsx

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/data/mock-products';
import PageContainer from '@/components/layout/page-container';
import { ProductDetails } from '@/components/product/product-details';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Enterprise SEO: Metadata generation remains on the server.
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
 * Server component that passes hydrated data to Client logic.
 */
export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <PageContainer>
      <ProductDetails product={product} />
    </PageContainer>
  );
}

/**
 * Enterprise Optimization: generateStaticParams
 */
export async function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}
