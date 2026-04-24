// src/components/product/product-details.tsx

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui/icon/icon';
import { Button } from '@/components/ui/button/button';
import { Heading } from '@/components/ui/heading/heading';
import type { Product } from '@/data/mock-products';

// RTK Imports
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/features/cart/cart-slice';
import { toggleWishlist } from '@/features/wishlist/wishlist-slice';

interface ProductDetailsProps {
    product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
    const { id, name, price, description, category, imageUrl, rating, isEcoFriendly } = product;

    const dispatch = useAppDispatch();
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    // Track state from store
    const isFavourite = useAppSelector((state) =>
        state.wishlist.items.some((item) => item.id === id)
    );

    // Feedback effect
    useEffect(() => {
        if (isAdded) {
            const timer = setTimeout(() => setIsAdded(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isAdded]);

    const handleUpdateQuantity = (type: 'inc' | 'dec') => {
        setQuantity((prev) => (type === 'inc' ? prev + 1 : Math.max(1, prev - 1)));
    };

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity }));
        setIsAdded(true);
    };

    const handleWishlistToggle = () => {
        dispatch(toggleWishlist(product));
    };

    return (
        <section className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">

                {/* Left: Image Gallery */}
                <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-(--toggle-bg) bg-(--surface-muted)/30">
                    {isEcoFriendly && (
                        <div className="absolute top-6 left-6 z-10 flex items-center gap-2 rounded-full bg-(--brand-color) px-4 py-2 text-xs font-bold uppercase tracking-widest text-(--text-on-image) shadow-xl">
                            <Icon name="globe" size={16} />
                            <span>Eco-Conscious Choice</span>
                        </div>
                    )}
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-contain p-12 transition-transform duration-700 hover:scale-105"
                    />
                </div>

                {/* Right: Product Information */}
                <div className="flex flex-col">
                    <nav className="mb-4 flex items-center gap-2 text-sm font-medium text-(--neutral-color)" aria-label="Breadcrumb">
                        <span className="capitalize">{category}</span>
                        <Icon name="chevronRight" size={14} className="opacity-40" />
                        <span className="truncate text-(--foreground)">{name}</span>
                    </nav>

                    <Heading level={1} weight="bold" className="mb-4 text-3xl md:text-4xl lg:text-5xl">
                        {name}
                    </Heading>

                    <div className="mb-8 flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2 rounded-full bg-(--warning)/10 px-3 py-1.5">
                            <Icon name="star" variant="warning" size={18} />
                            <span className="font-bold text-(--foreground)">{rating.rate}</span>
                            <span className="text-xs text-(--neutral-color) opacity-80">({rating.count} Reviews)</span>
                        </div>
                        <div className="hidden h-5 w-px bg-(--toggle-bg) sm:block" />
                        <div className="flex items-center gap-2 text-sm font-semibold text-(--brand-color)">
                            <Icon name="check" size={18} />
                            <span>In Stock & Ready to Ship</span>
                        </div>
                    </div>

                    <div className="mb-8 border-y border-(--toggle-bg) py-6">
                        <div className="flex items-baseline gap-4">
                            <span className="text-4xl font-black text-(--foreground)">
                                ${price.toFixed(2)}
                            </span>
                            <span className="text-lg text-(--neutral-color) line-through opacity-50">
                                ${(price * 1.25).toFixed(2)}
                            </span>
                        </div>
                        <p className="mt-2 text-xs font-medium text-(--neutral-color)">
                            Prices include taxes. Shipping calculated at checkout.
                        </p>
                    </div>

                    <p className="mb-10 text-lg leading-relaxed text-(--neutral-color) lg:max-w-xl">
                        {description}
                    </p>

                    {/* Purchase Actions */}
                    <div className="mb-10 flex flex-col gap-4 sm:flex-row">
                        <div className="flex items-center justify-between rounded-full border border-(--toggle-bg) bg-(--background) p-1.5 sm:w-36">
                            <Button
                                variant="ghost"
                                size="sm"
                                icon="minus"
                                ariaLabel="Decrease quantity"
                                onClick={() => handleUpdateQuantity('dec')}
                                disabled={quantity <= 1}
                            />
                            <span className="w-10 text-center font-bold text-(--foreground)" aria-live="polite">
                                {quantity}
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                icon="plus"
                                ariaLabel="Increase quantity"
                                onClick={() => handleUpdateQuantity('inc')}
                            />
                        </div>

                        <Button
                            variant={isAdded ? "secondary" : "primary"}
                            size="lg"
                            fullWidth
                            icon={isAdded ? "check" : "cart"}
                            onClick={handleAddToCart}
                            className="flex-1 shadow-md transition-all active:scale-95"
                        >
                            {isAdded ? "Added to Cart" : "Add to Shopping Cart"}
                        </Button>

                        <Button
                            variant="secondary"
                            size="lg"
                            icon="heart"
                            ariaLabel={isFavourite ? "Remove from wishlist" : "Add to wishlist"}
                            onClick={handleWishlistToggle}
                            className={clsx("sm:px-6 transition-colors", isFavourite && "text-(--error) bg-(--error-muted)/10")}
                        />
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-1 gap-4 rounded-2xl bg-(--surface-muted)/20 p-6 sm:grid-cols-2">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-(--brand-color)/10 text-(--brand-color)">
                                <Icon name="globe" size={24} />
                            </div>
                            <div>
                                <Heading level={6} weight="bold" className="text-sm">Carbon Neutral</Heading>
                                <p className="text-xs text-(--neutral-color)">Offsetting every delivery</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-(--brand-color)/10 text-(--brand-color)">
                                <Icon name="check" size={24} />
                            </div>
                            <div>
                                <Heading level={6} weight="bold" className="text-sm">Quality Guaranteed</Heading>
                                <p className="text-xs text-(--neutral-color)">30-day money-back policy</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
