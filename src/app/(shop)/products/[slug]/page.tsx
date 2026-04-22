// src/app/(shop)/products/[slug]/page.tsx

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/data/mock-products';
import PageContainer from '@/components/layout/page-container';
import { ProductDetails } from '@/components/product/product-details';

interface ProductPageProps {
  // 1. Update the type to a Promise
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  // 2. Await the params before destructuring
  const { slug } = await params;

  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) return { title: 'Product Not Found | Bonmart' };

  return {
    title: `${product.name} | Bonmart`,
    description: product.description,
  };
}

// 3. Make the component 'async' so you can use 'await'
export default async function ProductDetailsPage({ params }: ProductPageProps) {
  // 4. Await the params here too
  const { slug } = await params;

  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <PageContainer>
      <main className="w-full px-4 py-8 md:py-12">
        <ProductDetails product={product} />
      </main>
    </PageContainer>
  );
}
