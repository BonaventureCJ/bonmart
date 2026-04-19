// src/components/product/product-details.tsx

'use client';

import * as React from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { Heading } from '@/components/ui/heading/heading';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon/icon';
import type { Product } from '@/data/mock-products';

interface ProductDetailsProps {
    product: Product;
    onAddToCart?: (id: number, quantity: number) => void;
}

/**
 * ProductDetails Component
 * 
 * Refactored to use the Button.tsx design system for all interactions.
 * Features:
 * - Next.js Image optimization with priority for LCP.
 * - Accessible Quantity management via reusable Button component.
 * - Enterprise "Green" brand values integrated via semantic tokens.
 */
export const ProductDetails = React.memo(function ProductDetails({
    product,
    onAddToCart,
}: ProductDetailsProps) {
    const [quantity, setQuantity] = React.useState(1);
    const { name, price, description, category, imageUrl, rating, isEcoFriendly, id } = product;

    const handleQuantity = (delta: number) => {
        setQuantity((prev) => Math.max(1, prev + delta));
    };

    return (
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* 1. Media Section */}
            <div className="flex flex-col gap-4">
                <figure className="relative aspect-square overflow-hidden rounded-3xl border border-toggle-bg bg-surface-muted/50">
                    <Image
                        src={imageUrl}
                        alt={`${name} main view`}
                        fill
                        priority
                        className="object-contain p-8 transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {isEcoFriendly && (
                        <div className="absolute top-6 left-6 z-10 flex items-center gap-2 rounded-full bg-brand-color px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-background shadow-lg">
                            <Icon name="check" className="h-4 w-4" />
                            Environmentally Friendly
                        </div>
                    )}
                </figure>
            </div>

            {/* 2. Information Section */}
            <div className="flex flex-col">
                <nav className="mb-4 flex items-center gap-2 text-sm font-medium text-neutral-color">
                    <span className="capitalize">{category}</span>
                    <Icon name="chevronRight" className="h-3 w-3" />
                    <span className="text-foreground/60">Product Details</span>
                </nav>

                <Heading level={1} weight="bold" className="mb-2 text-3xl md:text-4xl text-foreground">
                    {name}
                </Heading>

                <div className="mb-6 flex items-center gap-4">
                    <div className="flex items-center gap-1" aria-label={`Rating: ${rating.rate} out of 5 stars`}>
                        {[...Array(5)].map((_, i) => (
                            <Icon
                                key={i}
                                name="star"
                                className={clsx(
                                    "h-4 w-4",
                                    i < Math.floor(rating.rate) ? "fill-warning text-warning" : "text-surface-muted"
                                )}
                            />
                        ))}
                        <span className="ml-2 text-sm font-semibold text-foreground">{rating.rate}</span>
                    </div>
                    <span className="h-4 w-px bg-toggle-bg" aria-hidden="true" />
                    <span className="text-sm text-neutral-color font-medium">{rating.count} Verified Reviews</span>
                </div>

                <div className="mb-8 border-y border-toggle-bg py-6">
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-foreground">${price.toFixed(2)}</span>
                        <span className="text-sm font-medium text-neutral-color">Inc. VAT</span>
                    </div>
                </div>

                <div className="mb-8">
                    <Heading level={4} weight="semibold" className="mb-3 uppercase tracking-wider text-xs text-neutral-color">
                        Description
                    </Heading>
                    <p className="leading-relaxed text-neutral-color text-base">
                        {description}
                    </p>
                </div>

                {/* 3. Actions Section */}
                <div className="mt-auto flex flex-col gap-4 sm:flex-row sm:items-center">
                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between rounded-full border-2 border-toggle-bg bg-toggle-container-bg p-1 sm:w-32">
                        <Button
                            variant="ghost"
                            onClick={() => handleQuantity(-1)}
                            disabled={quantity <= 1}
                            ariaLabel="Decrease quantity"
                            className="h-10 w-10 p-0 rounded-full hover:bg-background"
                            icon="minus"
                        />

                        <span className="text-base font-bold select-none text-foreground" aria-live="polite">
                            {quantity}
                        </span>

                        <Button
                            variant="ghost"
                            onClick={() => handleQuantity(1)}
                            ariaLabel="Increase quantity"
                            className="h-10 w-10 p-0 rounded-full hover:bg-background"
                            icon="plus"
                        />
                    </div>

                    <Button
                        variant="primary"
                        size="lg"
                        fullWidth
                        icon="cart"
                        className="h-14 text-lg shadow-md"
                        onClick={() => onAddToCart?.(id, quantity)}
                    >
                        Add to Basket
                    </Button>

                    <Button
                        variant="secondary"
                        size="lg"
                        icon="heart"
                        ariaLabel="Add to wishlist"
                        className="h-14 w-14 p-0 sm:w-auto sm:px-6 hover:text-error"
                    />
                </div>

                {/* Brand Trust Signals */}
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-toggle-bg pt-8 text-[10px] sm:text-xs font-bold text-neutral-color uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <Icon name="globe" className="h-4 w-4 text-brand-color" />
                        Carbon Neutral Delivery
                    </div>
                    <div className="flex items-center gap-2">
                        <Icon name="check" className="h-4 w-4 text-brand-color" />
                        Ethically Sourced
                    </div>
                </div>
            </div>
        </section>
    );
});

ProductDetails.displayName = 'ProductDetails';
