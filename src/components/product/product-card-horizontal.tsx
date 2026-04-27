// src/components/product/product-card-horizontal.tsx

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui/icon/icon';
import { Button } from '@/components/ui/button/button';
import { Heading } from '@/components/ui/heading/heading';
import type { Product } from '@/data/mock-products';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/features/cart/cart-slice';
import { toggleWishlist } from '@/features/wishlist/wishlist-slice';

interface ProductCardHorizontalProps {
    product: Product;
    className?: string;
}

/**
 * Enterprise-grade Compact Horizontal Product Card.
 * 
 * Features:
 * - Ultra-dense mobile view (approx 1/3 of standard height).
 * - Full-featured desktop view with "Add More" logic.
 * - Persistent horizontal layout across all breakpoints.
 */
export function ProductCardHorizontal({
    product,
    className,
}: ProductCardHorizontalProps) {
    const { id, name, price, imageUrl, slug, rating, isEcoFriendly, category } = product;
    const dispatch = useAppDispatch();

    const [isAnimating, setIsAnimating] = useState(false);

    // Track global state to show "Add More" logic
    const isInCart = useAppSelector((state) =>
        state.cart.items.some((item) => item.id === id)
    );
    const isFavourite = useAppSelector((state) =>
        state.wishlist.items.some((item) => item.id === id)
    );

    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => setIsAnimating(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart({ ...product, quantity: 1 }));
        setIsAnimating(true);
    };

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleWishlist(product));
    };

    return (
        <article
            className={clsx(
                'group relative flex w-full flex-row items-center gap-3 overflow-hidden rounded-xl border border-(--toggle-bg) bg-(--surface-raised) p-2 transition-all duration-(--duration-long) hover:border-(--brand-color)/30 sm:gap-6 sm:p-4',
                className
            )}
        >
            {/* 1. Compact Image Section (W-24 on Mobile) */}
            <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-lg bg-(--surface-muted)/20 sm:w-48 sm:rounded-xl">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 100px, 200px"
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-105 sm:p-6"
                />

                {isEcoFriendly && (
                    <div className="absolute top-1 left-1 z-10 flex items-center rounded-full bg-(--brand-color) p-0.5 sm:px-2 sm:py-0.5">
                        <Icon name="globe" size={10} className="text-(--text-on-image)" />
                        <span className="ml-1 hidden text-[9px] font-bold uppercase text-(--text-on-image) sm:inline">
                            Eco Choice
                        </span>
                    </div>
                )}
            </div>

            {/* 2. Content Section */}
            <div className="flex flex-1 flex-col justify-between self-stretch py-0.5">
                <div className="flex flex-col">
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-(--neutral-color) opacity-60 sm:text-xs">
                            {category}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 rounded-full p-0 sm:h-9 sm:w-9"
                            onClick={handleWishlistToggle}
                            ariaLabel={isFavourite ? "Remove from wishlist" : "Add to wishlist"}
                        >
                            <Icon
                                name="heart"
                                size={16}
                                variant={isFavourite ? "error" : "neutral"}
                                filled={isFavourite}
                            />
                        </Button>
                    </div>

                    <Link href={`/products/${slug}`} className="focus-ring mt-0.5 block rounded-sm">
                        <Heading
                            level={3}
                            weight="semibold"
                            align="left"
                            className="line-clamp-1 text-xs text-(--foreground) transition-colors group-hover:text-(--brand-color) sm:text-lg"
                        >
                            {name}
                        </Heading>
                    </Link>

                    <div className="mt-1 flex items-center gap-2 text-[10px] sm:text-xs">
                        <div className="flex items-center gap-0.5 text-(--warning)">
                            <Icon name="star" size={12} variant="warning" filled />
                            <span>{rating.rate}</span>
                        </div>
                        <span className="text-(--neutral-color) opacity-50">({rating.count})</span>
                    </div>
                </div>

                {/* 3. Action Footer: Responsive Labeling */}
                <div className="mt-2 flex items-center justify-between gap-4">
                    <span className="text-sm font-bold text-(--foreground) sm:text-2xl">
                        ${price.toFixed(2)}
                    </span>

                    <Button
                        variant={isAnimating || isInCart ? 'secondary' : 'primary'}
                        size="sm"
                        icon={isAnimating ? 'check' : 'plus'}
                        onClick={handleAddToCart}
                        ariaLabel={`Add ${name} to cart`}
                        className="h-8 min-w-[32px] rounded-lg sm:h-10 sm:min-w-[140px]"
                    >
                        <span className="hidden sm:inline">
                            {isAnimating ? 'Added!' : isInCart ? 'Add More' : 'Add to Cart'}
                        </span>
                    </Button>
                </div>
            </div>
        </article>
    );
}
