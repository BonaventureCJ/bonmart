// src/components/product/product-card-horizontal.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui/icon/icon';
import { Button } from '@/components/ui/button/button';
import { Heading } from '@/components/ui/heading/heading';
import type { Product } from '@/data/mock-products';

interface ProductCardHorizontalProps {
    product: Product;
    className?: string;
    isFavourite?: boolean;
    onFavouriteToggle?: (id: number) => void;
}

/**
 * Enterprise Horizontal Product Card for Bonmart.
 * Optimized for list views, search results, and cart-like summaries.
 */
export function ProductCardHorizontal({
    product,
    className,
    isFavourite = false,
    onFavouriteToggle,
}: ProductCardHorizontalProps) {
    const { id, name, price, imageUrl, slug, rating, isEcoFriendly, description } = product;

    return (
        <article
            className={clsx(
                'group relative flex flex-col sm:flex-row gap-4 overflow-hidden rounded-2xl border border-(--toggle-bg)',
                'bg-(--surface-raised) p-3 transition-all duration-(--duration-long) ease-(--transition-ease-in-out)',
                'hover:shadow-md hover:border-(--brand-color)/30',
                className
            )}
        >
            {/* 1. Image Section */}
            <div className="relative aspect-square w-full sm:w-48 shrink-0 overflow-hidden rounded-xl bg-(--surface-muted)/30">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 100vw, 200px"
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />

                {isEcoFriendly && (
                    <div className="absolute top-2 left-2 z-10 flex items-center gap-1 rounded-full bg-(--brand-color) px-2 py-0.5 text-[9px] font-bold uppercase text-(--text-on-image)">
                        <Icon name="globe" size={10} />
                        <span>Eco</span>
                    </div>
                )}
            </div>

            {/* 2. Content Section */}
            <div className="flex flex-1 flex-col py-1">
                <div className="flex items-start justify-between gap-4">
                    <Link href={`/products/${slug}`} className="focus-ring rounded-sm">
                        <Heading
                            level={3}
                            weight="semibold"
                            className="line-clamp-1 text-(--foreground) group-hover:text-(--brand-color) transition-colors"
                        >
                            {name}
                        </Heading>
                    </Link>

                    <button
                        onClick={() => onFavouriteToggle?.(id)}
                        className="shrink-0 text-(--neutral-color) hover:text-(--error) transition-colors p-1"
                        aria-label={isFavourite ? "Remove from wishlist" : "Add to wishlist"}
                    >
                        <Icon
                            name="heart"
                            size={20}
                            className={clsx(isFavourite && 'fill-(--error) text-(--error)')}
                        />
                    </button>
                </div>

                {/* Social Proof */}
                <div className="mt-1 flex items-center gap-2 text-xs font-medium">
                    <div className="flex items-center gap-0.5 text-(--warning)">
                        <Icon name="star" size={14} variant="warning" />
                        <span>{rating.rate}</span>
                    </div>
                    <span className="text-(--neutral-color) opacity-60">({rating.count} reviews)</span>
                </div>

                {/* Description - Visible only on horizontal desktop view */}
                <p className="mt-2 hidden sm:line-clamp-2 text-sm text-(--neutral-color) leading-relaxed">
                    {description}
                </p>

                {/* 3. Action Footer */}
                <div className="mt-auto pt-4 flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-(--foreground)">
                            ${price.toFixed(2)}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Secondary Action (Mobile only icon) */}
                        <Button
                            variant="secondary"
                            size="sm"
                            icon="search"
                            ariaLabel="View Details"
                            className="hidden md:flex"
                        />
                        <Button
                            variant="primary"
                            size="sm"
                            icon="plus"
                            ariaLabel={`Add ${name} to cart`}
                        >
                            <span className="hidden sm:inline">Add to Cart</span>
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    );
}

