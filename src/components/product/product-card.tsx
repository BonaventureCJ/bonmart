// src/components/product/product-card.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/icon/icon';
import { Button } from '@/components/ui/button/button';
import { Heading } from '@/components/ui/heading/heading';
import type { Product } from '@/data/mock-products';
import { clsx } from 'clsx';

interface ProductCardProps {
    product: Product;
    className?: string;
    isFavourite?: boolean;
    onFavouriteToggle?: (id: number) => void;
}

/**
 * Enterprise Product Card for Bonmart.
 * Optimized with theme-aware tokens and enhanced UX features.
 */
export function ProductCard({
    product,
    className,
    isFavourite = false,
    onFavouriteToggle
}: ProductCardProps) {
    const { id, name, price, imageUrl, slug, rating, isEcoFriendly, category } = product;

    return (
        <article
            className={clsx(
                'group relative flex flex-col overflow-hidden rounded-2xl border border-(--toggle-bg)',
                'bg-(--surface-raised) transition-all duration-(--duration-long) ease-(--transition-ease-in-out)',
                'hover:shadow-lg hover:border-(--brand-color)/30',
                className
            )}
        >
            {/* Image & Actions Container */}
            <div className="relative aspect-square w-full overflow-hidden bg-(--surface-muted)/30">
                {/* Wishlist / Favourite Button */}
                <div className="absolute top-3 right-3 z-20">
                    <Button
                        variant="ghost"
                        size="sm"
                        className={clsx(
                            'rounded-full bg-(--surface-raised)/80 backdrop-blur-sm hover:bg-(--surface-raised)',
                            isFavourite ? 'text-(--error)' : 'text-(--neutral-color)'
                        )}
                        icon={isFavourite ? 'heart' : 'heart'} // In a full app, you might use a 'heart-filled' variant
                        ariaLabel={isFavourite ? "Remove from wishlist" : "Add to wishlist"}
                        onClick={() => onFavouriteToggle?.(id)}
                    />
                </div>

                {/* Eco-friendly Badge */}
                {isEcoFriendly && (
                    <div
                        className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-(--brand-color) px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-(--text-on-image)"
                        aria-label="Eco-friendly product"
                    >
                        <Icon name="globe" size={12} />
                        <span>Eco Choice</span>
                    </div>
                )}

                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                    priority={id <= 4}
                />

                {/* Quick Add Overlay (Desktop) */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-(--overlay-bg) to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0 hidden md:block">
                    <Button
                        variant="primary"
                        fullWidth
                        size="md"
                        icon="plus"
                        ariaLabel={`Add ${name} to cart`}
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-(--neutral-color)">
                        {category}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-(--warning)">
                        <Icon name="star" size={14} variant="warning" />
                        <span>{rating.rate}</span>
                        <span className="font-normal text-(--neutral-color) opacity-60">({rating.count})</span>
                    </div>
                </div>

                <Link href={`/products/${slug}`} className="focus-ring group/link rounded-sm outline-offset-4">
                    <Heading
                        level={3}
                        weight="semibold"
                        className="line-clamp-2 min-h-[2.8rem] text-(--foreground) group-hover/link:text-(--brand-color) transition-colors"
                    >
                        {name}
                    </Heading>
                </Link>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-(--foreground)">
                            ${price.toFixed(2)}
                        </span>
                    </div>

                    {/* Mobile Add to Cart Icon Button */}
                    <div className="md:hidden">
                        <Button
                            variant="secondary"
                            size="sm"
                            icon="plus"
                            ariaLabel={`Add ${name} to cart`}
                        />
                    </div>
                </div>
            </div>
        </article>
    );
}
