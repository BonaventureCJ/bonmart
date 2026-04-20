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
 * Optimized to prevent "muddy" transitions during theme switching.
 */
export function ProductCard({
    product,
    className,
    isFavourite = false,
    onFavouriteToggle,
}: ProductCardProps) {
    const { id, name, price, imageUrl, slug, rating, isEcoFriendly, category } = product;

    return (
        <article
            className={clsx(
                'group relative flex flex-col overflow-hidden rounded-xl border border-(--toggle-bg)',
                'bg-(--surface-raised)',
                'transition-[box-shadow,transform] duration-(--duration-long) ease-(--transition-ease-in-out)',
                'hover:border-(--brand-color)/40 hover:shadow-md',
                className
            )}
        >
            {/* Image & Actions Container */}
            <div className="relative aspect-square w-full overflow-hidden bg-(--surface-muted)/20">
                {/* Wishlist Button */}
                <div className="absolute top-1.5 right-1.5 z-20 md:top-2 md:right-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className={clsx(
                            'h-7 w-7 rounded-full bg-(--surface-raised)/80 p-0 backdrop-blur-sm hover:bg-(--surface-raised) md:h-8 md:w-8',
                            isFavourite ? 'text-(--error)' : 'text-(--neutral-color)'
                        )}
                        icon={isFavourite ? 'heart' : 'heart'}
                        ariaLabel={isFavourite ? 'Remove from wishlist' : 'Add to wishlist'}
                        onClick={() => onFavouriteToggle?.(id)}
                    />
                </div>

                {/* Eco-friendly Badge */}
                {isEcoFriendly && (
                    <div
                        className="absolute top-1.5 left-1.5 z-10 flex items-center gap-1 rounded-full bg-(--brand-color) px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-tighter text-(--text-on-image) md:top-2 md:left-2 md:px-2 md:text-[9px] md:tracking-wider"
                        aria-label="Eco-friendly product"
                    >
                        <Icon name="globe" size={10} />
                        <span>Eco Choice</span>
                    </div>
                )}

                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    priority={id <= 6}
                />

                {/* Quick Add Overlay (Desktop) */}
                <div className="absolute inset-x-0 bottom-0 hidden translate-y-full bg-gradient-to-t from-(--overlay-bg) to-transparent p-3 transition-transform duration-300 group-hover:translate-y-0 md:block">
                    <Button
                        variant="primary"
                        fullWidth
                        size="sm"
                        icon="plus"
                        ariaLabel={`Add ${name} to cart`}
                    >
                        Quick Add
                    </Button>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-1 flex-col p-2.5 md:p-3">
                <div className="mb-1 flex items-center justify-between">
                    <span className="truncate text-[9px] font-semibold uppercase tracking-wider text-(--neutral-color) md:text-[10px]">
                        {category}
                    </span>
                    <div className="flex items-center gap-0.5 text-[9px] font-bold text-(--warning) md:text-[10px]">
                        <Icon name="star" size={12} variant="warning" />
                        <span>{rating.rate}</span>
                        <span className="hidden font-normal opacity-60 xs:inline">({rating.count})</span>
                    </div>
                </div>

                <Link href={`/products/${slug}`} className="focus-ring group/link rounded-sm outline-offset-4">
                    <Heading
                        level={3}
                        weight="semibold"
                        className="line-clamp-2 min-h-[2rem] text-xs text-(--foreground) transition-colors duration-(--duration-long) group-hover/link:text-(--brand-color) md:min-h-[2.2rem] md:text-sm"
                    >
                        {name}
                    </Heading>
                </Link>

                <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-bold text-(--foreground) md:text-base">
                        ${price.toFixed(2)}
                    </span>

                    <div className="md:hidden">
                        <Button
                            variant="secondary"
                            size="sm"
                            className="h-7 w-7 p-0 md:h-8 md:w-8"
                            icon="plus"
                            ariaLabel={`Add ${name} to cart`}
                        />
                    </div>
                </div>
            </div>
        </article>
    );
}
