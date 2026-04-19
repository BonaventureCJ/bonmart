// src/components/product/product-details.tsx

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@/components/ui/icon/icon';
import { Button } from '@/components/ui/button/button';
import { Heading } from '@/components/ui/heading/heading';
import type { Product } from '@/data/mock-products';

interface ProductDetailsProps {
    product: Product;
}

/**
 * Enterprise Product Details Component for Bonmart.
 * Features: Responsive two-column layout, theme-aware semantic tokens,
 * and high-accessibility quantity controls.
 */
export function ProductDetails({ product }: ProductDetailsProps) {
    const [quantity, setQuantity] = useState(1);
    const { name, price, description, category, imageUrl, rating, isEcoFriendly } = product;

    const updateQuantity = (type: 'inc' | 'dec') => {
        setQuantity((prev) => (type === 'inc' ? prev + 1 : Math.max(1, prev - 1)));
    };

    return (
        <section className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">

                {/* Left: Image Gallery / Preview */}
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
                    {/* Breadcrumb / Category */}
                    <div className="mb-4 flex items-center gap-2 text-sm font-medium text-(--neutral-color)">
                        <span className="capitalize">{category}</span>
                        <Icon name="chevronRight" size={14} className="opacity-40" />
                        <span className="text-(--foreground) truncate">{name}</span>
                    </div>

                    <Heading level={1} weight="bold" className="mb-4 text-3xl md:text-4xl lg:text-5xl">
                        {name}
                    </Heading>

                    {/* Ratings and Stock */}
                    <div className="mb-8 flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2 rounded-full bg-(--warning)/10 px-3 py-1.5">
                            <Icon name="star" variant="warning" size={18} />
                            <span className="font-bold text-(--foreground)">{rating.rate}</span>
                            <span className="text-xs text-(--neutral-color) opacity-80">({rating.count} Verified Reviews)</span>
                        </div>
                        <div className="h-5 w-px bg-(--toggle-bg) hidden sm:block" />
                        <div className="flex items-center gap-2 text-sm font-semibold text-(--brand-color)">
                            <Icon name="check" size={18} />
                            <span>In Stock & Ready to Ship</span>
                        </div>
                    </div>

                    {/* Pricing Section */}
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
                    <div className="flex flex-col gap-4 sm:flex-row mb-10">
                        {/* Quantity Toggle */}
                        <div className="flex items-center justify-between rounded-full border border-(--toggle-bg) bg-(--background) p-1.5 sm:w-36">
                            <Button
                                variant="ghost"
                                size="sm"
                                icon="minus"
                                ariaLabel="Decrease quantity"
                                onClick={() => updateQuantity('dec')}
                                disabled={quantity <= 1}
                            />
                            <span
                                className="w-10 text-center font-bold text-(--foreground)"
                                aria-live="polite"
                            >
                                {quantity}
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                icon="plus"
                                ariaLabel="Increase quantity"
                                onClick={() => updateQuantity('inc')}
                            />
                        </div>

                        <Button
                            variant="primary"
                            size="lg"
                            fullWidth
                            icon="cart"
                            className="flex-1 shadow-md hover:shadow-lg"
                        >
                            Add to Shopping Cart
                        </Button>

                        <Button
                            variant="secondary"
                            size="lg"
                            icon="heart"
                            ariaLabel="Add to Wishlist"
                            className="px-4"
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
