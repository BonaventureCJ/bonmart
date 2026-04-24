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

// RTK Imports
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/features/cart/cart-slice';
import { toggleWishlist } from '@/features/wishlist/wishlist-slice';

interface ProductCardHorizontalProps {
    product: Product;
    className?: string;
}

/**
 * Enterprise Horizontal Product Card for Bonmart.
 * Connected to RTK state for Cart/Wishlist synchronization and visual feedback.
 */
export function ProductCardHorizontal({
    product,
    className,
}: ProductCardHorizontalProps) {
    const { id, name, price, imageUrl, slug, rating, isEcoFriendly, description } = product;
    const dispatch = useAppDispatch();

    // Feedback state for cart interaction
    const [isAnimating, setIsAnimating] = useState(false);

    // Track state from store
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
                'group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-(--toggle-bg) bg-(--surface-raised) p-3 transition-all duration-(--duration-long) ease-(--transition-ease-in-out) hover:border-(--brand-color)/30 hover:shadow-md sm:flex-row',
                className
            )}
        >
            {/* 1. Image Section */}
            <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-(--surface-muted)/30 sm:w-48">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 100vw, 200px"
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />

                {isEcoFriendly && (
                    <div
                        className="absolute top-2 left-2 z-10 flex items-center gap-1 rounded-full bg-(--brand-color) px-2 py-0.5 text-[9px] font-bold uppercase text-(--text-on-image)"
                        role="status"
                    >
                        <Icon name="globe" size={10} />
                        <span>Eco Choice</span>
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
                            className="line-clamp-1 text-(--foreground) transition-colors group-hover:text-(--brand-color)"
                        >
                            {name}
                        </Heading>
                    </Link>

                    <Button
                        variant="ghost"
                        size="sm"
                        className={clsx(
                            'h-8 w-8 rounded-full p-0 transition-colors',
                            isFavourite ? 'text-(--error)' : 'text-(--neutral-color) hover:text-(--error)'
                        )}
                        icon="heart"
                        ariaLabel={isFavourite ? "Remove from wishlist" : "Add to wishlist"}
                        onClick={handleWishlistToggle}
                    />
                </div>

                {/* Social Proof */}
                <div className="mt-1 flex items-center gap-2 text-xs font-medium">
                    <div className="flex items-center gap-0.5 text-(--warning)">
                        <Icon name="star" size={14} />
                        <span>{rating.rate}</span>
                    </div>
                    <span className="text-(--neutral-color) opacity-60">({rating.count} reviews)</span>
                </div>

                <p className="mt-2 hidden text-sm leading-relaxed text-(--neutral-color) sm:line-clamp-2">
                    {description}
                </p>

                {/* 3. Action Footer */}
                <div className="mt-auto flex items-center justify-between gap-4 pt-4">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-(--foreground)">
                            ${price.toFixed(2)}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link href={`/products/${slug}`} className="hidden md:block">
                            <Button
                                variant="secondary"
                                size="sm"
                                icon="search"
                                ariaLabel="View Details"
                            />
                        </Link>

                        <Button
                            variant={isAnimating || isInCart ? 'secondary' : 'primary'}
                            size="sm"
                            icon={isAnimating ? 'check' : 'plus'}
                            ariaLabel={`Add ${name} to cart`}
                            onClick={handleAddToCart}
                            className="min-w-[120px]"
                        >
                            <span>{isAnimating ? 'Added!' : isInCart ? 'Add More' : 'Add to Cart'}</span>
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    );
}

