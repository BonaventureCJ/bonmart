// src/app/(shop)/products/[slug]/page.tsx

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageContainer from '@/components/layout/page-container';
import { ProductDetails } from '@/components/product/product-details';
import { transformRawApiProducts } from '@/features/products/product-slice';
import type { Product } from '@/types/product';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Shared Enterprise Server-Side Catalog Fetcher
 * Hits the base marketplace endpoint directly. Defensively protects the Next.js 
 * engine against HTML format parsing crashes when remote services experience downtime.
 */
async function getTransformedServerCatalog(): Promise<Product[]> {
  try {
    const res = await fetch('https://fakestoreapi.com/products', {
      next: { revalidate: 3600 } // Cache records securely on the edge for 1 hour
    });
    
    if (!res.ok) {
      console.error(`API operational fallback: Server returned invalid status code [${res.status}].`);
      return [];
    }

    // Enterprise Guard: Enforce runtime verification of data stream headers before parsing
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('API critical error: Target endpoint served an unexpected HTML text string.');
      return [];
    }
    
    const rawData = await res.json();
    return transformRawApiProducts(rawData);
  } catch (error) {
    console.error('System exception caught during edge compilation:', error);
    return [];
  }
}

/**
 * Enterprise SEO: Metadata generation remains strictly on the server.
 */
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const catalog = await getTransformedServerCatalog();
  const product = catalog.find((p) => p.slug === slug);

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
 * Server component that passes beautifully transformed schemas directly to Client components.
 */
export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const catalog = await getTransformedServerCatalog();
  const product = catalog.find((p) => p.slug === slug);

  // If the API failed or the product does not match, trigger the Next.js 404 route immediately
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
 * Pre-builds detail templates during build cycles for exceptional performance.
 */
export async function generateStaticParams() {
  const catalog = await getTransformedServerCatalog();
  return catalog.map((product) => ({
    slug: product.slug,
  }));
}