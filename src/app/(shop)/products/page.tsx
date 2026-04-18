//src/app/(shop)/productspage.tsx

import { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";
import ProductCard from "@/components/product/product-card";
import { MOCK_PRODUCTS } from "@/data/mock-products";

/**
 * Metadata for SEO - Essential for Enterprise apps
 */
export const metadata: Metadata = {
    title: "Shop Sustainable Products | Bonmart",
    description: "Browse our curated collection of eco-friendly and sustainable products.",
};

/**
 * Products Page (PLP)
 * 
 * Showcases the product catalog in a responsive grid.
 * Uses Server-Side Rendering (SSR) for optimal SEO and performance.
 */
export default function ProductsPage() {
    return (
        <PageContainer>
            {/* Header Section */}
            <header className="mb-10 flex flex-col items-center gap-4 text-center">
                <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                    Our <span className="text-[--brand-color]">Products</span>
                </h1>
                <p className="max-w-2xl text-lg text-[--neutral-color]">
                    Explore our curated selection of environmentally conscious items,
                    crafted to make your shopping experience seamless and sustainable.
                </p>
            </header>


            {/* Catalog Control Bar */}
            <section
                className="mb-8 flex items-center justify-between border-b border-[--toggle-container-bg] pb-4"
                aria-label="Catalog filters"
            >
                <p className="text-sm font-medium">
                    Showing <span className="text-[--brand-color] font-bold">{MOCK_PRODUCTS.length}</span> items
                </p>

                {/* Sort Dropdown - Accessible and Styled */}
                <div className="flex items-center gap-2">
                    <label htmlFor="sort-products" className="sr-only">Sort by</label>
                    <select
                        id="sort-products"
                        className="focus-ring cursor-pointer rounded-lg bg-[--toggle-container-bg] px-3 py-2 text-sm font-semibold outline-none transition-colors hover:bg-[--toggle-hover-bg]"
                    >
                        <option value="featured">Featured</option>
                        <option value="newest">Newest</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>
            </section>

            {/* Responsive Grid - Mobile First */}
            <section
                className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                aria-label="Product list"
            >
                {MOCK_PRODUCTS.map((product, index) => (
                    <ProductCard
                        key={product.id}
                        id={product.id.toString()}
                        slug={product.slug}
                        name={product.name}
                        price={product.price}
                        imageUrl={product.imageUrl}
                        category={product.category}
                        rating={product.rating.rate}
                        isEcoFriendly={product.isEcoFriendly}
                        // Optimization: Prioritize loading for images above the fold
                        priority={index < 4}
                    />
                ))}
            </section>
        </PageContainer>
    );
}
