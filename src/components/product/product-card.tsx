// src/components/product/product-card.tsx

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

interface ProductCardProps {
    product: Product;
    className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
    const { id, name, price, imageUrl, slug, rating, isEcoFriendly, category } = product;
    const dispatch = useAppDispatch();

    const [isAnimating, setIsAnimating] = useState(false);
    const [isHeartAnimating, setIsHeartAnimating] = useState(false);

    /** 
     * Memoized Selectors (Parameterized)
     * Performance: These only re-evaluate if the items array in Redux changes,
     * and only trigger a re-render if the boolean result for this specific ID flips.
     * Supports normalized state closure pattern with Create Entity Adapter.
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
                'group relative flex flex-col overflow-hidden rounded-xl border border-(--toggle-bg) bg-(--surface-raised) transition-[box-shadow,transform] duration-(--duration-long) ease-(--transition-ease-in-out) hover:border-(--brand-color)/40 hover:shadow-md',
                className
            )}
        >
            <div className="relative aspect-square w-full overflow-hidden bg-(--surface-muted)/20">
                <div className="absolute top-1.5 right-1.5 z-20 md:top-2 md:right-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        disableFocusRing
                        className="h-7 w-7 rounded-full bg-(--surface-raised)/80 p-0 backdrop-blur-sm transition-colors hover:bg-(--surface-raised) md:h-8 md:w-8"
                        ariaLabel={isFavourite ? 'Remove from wishlist' : 'Add to wishlist'}
                        onClick={handleWishlistToggle}
                    >
                        <Icon
                            name="heart"
                            size={18}
                            filled={isFavourite}
                            className={clsx(
                                "transition-all duration-300",
                                isHeartAnimating && "scale-125",
                                isFavourite ? "text-(--brand-color)" : "text-(--neutral-color)"
                            )}
                        />
                    </Button>
                </div>

                {isEcoFriendly && (
                    <div
                        className="absolute top-1.5 left-1.5 z-10 flex items-center gap-1 rounded-full bg-(--brand-color) px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-tighter text-(--text-on-image) md:top-2 md:left-2 md:px-2 md:text-[9px] md:tracking-wider"
                        aria-label="Eco-friendly product"
                    >
                        <Icon name="leaf" size={10} />
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

                {/* Desktop Add to Cart Overlay */}
                <div className="absolute inset-x-0 bottom-0 hidden translate-y-full bg-gradient-to-t from-(--overlay-bg) to-transparent p-3 transition-transform duration-300 group-hover:translate-y-0 md:block">
                    <Button
                        variant={isAnimating || isInCart ? 'secondary' : 'primary'}
                        fullWidth
                        size="sm"
                        icon={isAnimating ? 'check' : 'plus'}
                        ariaLabel={`Add ${name} to cart`}
                        onClick={handleAddToCart}
                        className="transition-all duration-300"
                    >
                        {isAnimating ? 'Added!' : isInCart ? 'Add More' : 'Add to Cart'}
                    </Button>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-2.5 md:p-3">
                <div className="mb-1 flex items-center justify-between">
                    <span className="truncate text-[9px] font-semibold uppercase tracking-wider text-(--neutral-color) md:text-[10px]">
                        {category}
                    </span>
                    <div className="flex items-center gap-0.5 text-[9px] font-bold text-(--warning) md:text-[10px]">
                        <Icon name="star" size={12} variant="warning" />
                        <span className="text-(--foreground)">{rating.rate}</span>
                        <span className="hidden font-normal text-(--neutral-color) opacity-60 xs:inline">({rating.count})</span>
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
                    <span className="text-sm font-bold text-(--foreground) md:text-base tabular-nums">
                        ${price.toFixed(2)}
                    </span>

                    {/* Mobile Quick Add */}
                    <div className="md:hidden">
                        <Button
                            variant={isAnimating || isInCart ? 'secondary' : 'primary'}
                            size="sm"
                            className="h-7 w-7 p-0 shadow-sm active:scale-95 md:h-8 md:w-8"
                            icon={isAnimating ? 'check' : 'plus'}
                            ariaLabel={`Add ${name} to cart`}
                            onClick={handleAddToCart}
                        />
                    </div>
                </div>
            </div>
        </article>
    );
}
