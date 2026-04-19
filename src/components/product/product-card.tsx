// src/components/product/product-card.tsx

'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
 * - Uses shared Button component for all interactive elements
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
            <figure className="relative aspect-square overflow-hidden bg-surface-muted/50">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                    priority={id <= 4}
                />

                {/* Eco-Friendly Badge */}
                {isEcoFriendly && (
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-brand-color px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-background shadow-sm">
                        <Icon name="check" className="h-3 w-3" />
                        Eco-Friendly
                    </div>
                )}

                {/* Wishlist Toggle refactored to use semantic variables */}
                <div className="absolute top-3 right-3 z-10">
                    <Button
                        variant="ghost"
                        size="sm"
                        icon="heart"
                        ariaLabel={`Add ${name} to wishlist`}
                        className="h-9 w-9 rounded-full bg-background/80 p-0 text-foreground backdrop-blur-sm hover:bg-error-muted hover:text-error"
                    />
                </div>
            </figure>

            {/* Content Section */}
            <section className="flex flex-1 flex-col p-4">
                <header className="mb-1 flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-wide text-neutral-color">
                        {category}
                    </span>
                    <div className="flex items-center gap-1" aria-label={`Rating: ${rating.rate} out of 5 stars`}>
                        <Icon name="star" className="h-3.5 w-3.5 fill-warning text-warning" />
                        <span className="text-xs font-semibold text-foreground">{rating.rate}</span>
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

            {/* Hidden SEO Link for better hit area */}
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

ProductCard.displayName = 'ProductCard';
