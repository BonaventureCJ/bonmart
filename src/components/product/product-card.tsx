//src/components/product/product-card.tsx

'use client';

import * as React from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { Heading } from '@/components/ui/heading/heading';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon/icon';
import type { Product } from '@/data/mock-products';

interface ProductCardProps {
    product: Product;
    onAddToCart?: (id: number) => void;
    className?: string;
}

/**
 * ProductCard Component
 * 
 * Features:
 * - Responsive Mobile-first design
 * - Semantic HTML (article, figure, section)
 * - WCAG Accessible (ARIA labels, focus states)
 * - Eco-friendly indicator using brand-primary colors
 */
export const ProductCard = React.memo(function ProductCard({
    product,
    onAddToCart,
    className,
}: ProductCardProps) {
    const {
        id,
        slug,
        name,
        price,
        category,
        imageUrl,
        rating,
        isEcoFriendly,
    } = product;

    const productHref = `/products/${slug}`;

    return (
        <article
            className={clsx(
                'group relative flex flex-col overflow-hidden rounded-2xl border border-toggle-bg bg-background transition-shadow duration-long hover:shadow-lg',
                className
            )}
        >
            {/* Image Container */}
            <figure className="relative aspect-square overflow-hidden bg-neutral-100/50 dark:bg-neutral-800/50">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                    priority={id <= 4} // Priority for top products above the fold
                />

                {/* Eco-Friendly Badge */}
                {isEcoFriendly && (
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-brand-color px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                        <Icon name="check" className="h-3 w-3" />
                        Eco-Friendly
                    </div>
                )}

                {/* Wishlist Toggle (Positioned for easy thumb reach on mobile) */}
                <button
                    type="button"
                    className="focus-ring absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:text-red-500"
                    aria-label={`Add ${name} to wishlist`}
                >
                    <Icon name="heart" className="h-5 w-5" />
                </button>
            </figure>

            {/* Content Section */}
            <section className="flex flex-1 flex-col p-4">
                <header className="mb-1 flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-wide text-neutral-color">
                        {category}
                    </span>
                    <div className="flex items-center gap-1" aria-label={`Rating: ${rating.rate} out of 5 stars`}>
                        <Icon name="star" className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-semibold">{rating.rate}</span>
                    </div>
                </header>

                <Link href={productHref} className="focus-ring mb-2 block outline-offset-4">
                    <Heading level={3} weight="semibold" className="line-clamp-2 min-h-[3rem] transition-colors group-hover:text-brand-color">
                        {name}
                    </Heading>
                </Link>

                <div className="mt-auto flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="sr-only">Price:</span>
                        <span className="text-xl font-bold tracking-tight text-foreground">
                            ${price.toFixed(2)}
                        </span>
                    </div>

                    <Button
                        size="sm"
                        variant="primary"
                        icon="cart"
                        onClick={() => onAddToCart?.(id)}
                        ariaLabel={`Add ${name} to cart`}
                        className="shadow-sm"
                    >
                        Add
                    </Button>
                </div>
            </section>

            {/* Hidden SEO Link for better hit area and indexing */}
            <Link
                href={productHref}
                className="absolute inset-0 z-0"
                aria-hidden="true"
                tabIndex={-1}
            >
                <span className="sr-only">View {name} details</span>
            </Link>
        </article>
    );
});

// Helper for SEO and hit area - imports relative to your structure
import Link from 'next/link';
