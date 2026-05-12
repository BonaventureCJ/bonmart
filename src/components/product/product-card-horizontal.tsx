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
import { selectIsItemInCart } from '@/features/cart/cart-selectors';
import { toggleWishlist } from '@/features/wishlist/wishlist-slice';
import { selectIsProductWishlisted } from '@/features/wishlist/wishlist-selectors';

interface ProductCardHorizontalProps {
    product: Product;
    className?: string;
}

/**
 * Compact Horizontal Product Card.
 * Uses normalized O(1) selectors for optimal performance.
 */
export function ProductCardHorizontal({
    product,
    className,
}: ProductCardHorizontalProps) {
    const { id, name, price, imageUrl, slug, rating, isEcoFriendly, category } = product;
    const dispatch = useAppDispatch();

    const [isAnimating, setIsAnimating] = useState(false);
    const [isHeartAnimating, setIsHeartAnimating] = useState(false);

    /** 
     * Memoized Selectors (Parameterized)
     * Performance: Direct key lookups in the entities dictionary.
     * Ensures high-performance list rendering by avoiding array iterations.
     * Updated to support normalized state closure pattern.
     */
    const isInCart = useAppSelector((state) => selectIsItemInCart(id)(state));
    const isFavourite = useAppSelector((state) => selectIsProductWishlisted(id)(state));

    // Reset Add-to-Cart animation feedback
    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => setIsAnimating(false), 700);
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    // Reset Heart animation feedback
    useEffect(() => {
        if (isHeartAnimating) {
            const timer = setTimeout(() => setIsHeartAnimating(false), 200);
            return () => clearTimeout(timer);
        }
    }, [isHeartAnimating]);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // Normalized logic: Cart slice handles quantity updates via updateOne internally
        dispatch(addToCart({ ...product, quantity: 1 }));
        setIsAnimating(true);
    };

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleWishlist(product));
        setIsHeartAnimating(true);
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
                        <Icon name="leaf" size={10} className="text-(--text-on-image)" />
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
                                filled={isFavourite}
                                className={clsx(
                                    "transition-all duration-300",
                                    isHeartAnimating && "scale-150",
                                    isFavourite ? "text-(--brand-color)" : "text-(--neutral-color)"
                                )}
                            />
                        </Button>
                    </div>

                    <Link href={`/products/${slug}`} className="focus-ring mt-0.5 block rounded-sm outline-offset-4">
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
                            <span className="font-bold tabular-nums text-(--foreground)">{rating.rate}</span>
                        </div>
                        <span className="text-(--neutral-color) opacity-50 tabular-nums">({rating.count})</span>
                    </div>
                </div>

                {/* 3. Action Footer: Responsive Labeling */}
                <div className="mt-2 flex items-center justify-between gap-4">
                    <span className="text-sm font-bold text-(--foreground) tabular-nums sm:text-2xl">
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
