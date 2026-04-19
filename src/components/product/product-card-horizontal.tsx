// src/components/product/product-card-horizontal.tsx

'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { Heading } from '@/components/ui/heading/heading';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon/icon';
import type { Product } from '@/data/mock-products';

interface ProductCardHorizontalProps {
    product: Product;
    quantity?: number;
    onUpdateQuantity?: (id: number, delta: number) => void;
    onRemove?: (id: number) => void;
    className?: string;
}

/**
 * ProductCardHorizontal Component
 * 
 * Best for: Shopping Cart items, Wishlists, and Search Results.
 * Refactored to use the Button.tsx design system for all actions.
 */
export const ProductCardHorizontal = React.memo(function ProductCardHorizontal({
    product,
    quantity = 1,
    onUpdateQuantity,
    onRemove,
    className,
}: ProductCardHorizontalProps) {
    const { id, slug, name, price, imageUrl, isEcoFriendly } = product;
    const productHref = `/products/${slug}`;

    return (
        <article
            className={clsx(
                'group relative flex w-full gap-4 rounded-xl border border-toggle-bg bg-background p-3 transition-colors hover:border-brand-color/30 sm:p-4',
                className
            )}
        >
            {/* Image Section */}
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-surface-muted sm:h-32 sm:w-32">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-contain p-2 transition-transform duration-long group-hover:scale-105"
                    sizes="(max-width: 640px) 96px, 128px"
                />
                {isEcoFriendly && (
                    <div
                        className="absolute bottom-1 right-1 rounded-full bg-brand-color p-1 shadow-sm text-background"
                        title="Eco-Friendly Product"
                    >
                        <Icon name="check" className="h-3 w-3" />
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex flex-1 flex-col justify-between py-0.5">
                <div className="flex justify-between gap-2">
                    <div className="flex flex-col gap-1">
                        <Link
                            href={productHref}
                            className="focus-ring outline-offset-2"
                            aria-label={`View ${name}`}
                        >
                            <Heading level={4} weight="semibold" className="line-clamp-1 group-hover:text-brand-color">
                                {name}
                            </Heading>
                        </Link>
                        <span className="text-lg font-bold text-foreground">
                            ${(price * quantity).toFixed(2)}
                        </span>
                    </div>

                    {/* Refactored Remove Button */}
                    {onRemove && (
                        <div className="-mt-1 -mr-1">
                            <Button
                                variant="ghost"
                                onClick={() => onRemove(id)}
                                ariaLabel={`Remove ${name} from cart`}
                                icon="close"
                                className="h-10 w-10 p-0 rounded-full text-neutral-color hover:bg-error-muted hover:text-error"
                            />
                        </div>
                    )}
                </div>

                {/* Action Row: Quantity Selector & Secondary Actions */}
                <div className="mt-4 flex items-center justify-between">
                    {onUpdateQuantity ? (
                        <div className="flex items-center gap-1 rounded-full border border-toggle-bg bg-toggle-container-bg p-1">
                            <Button
                                variant="ghost"
                                onClick={() => onUpdateQuantity(id, -1)}
                                disabled={quantity <= 1}
                                ariaLabel="Decrease quantity"
                                icon="minus"
                                className="h-8 w-8 p-0 rounded-full hover:bg-background"
                            />

                            <span className="w-8 text-center text-sm font-bold select-none text-foreground" aria-live="polite">
                                {quantity}
                            </span>

                            <Button
                                variant="ghost"
                                onClick={() => onUpdateQuantity(id, 1)}
                                ariaLabel="Increase quantity"
                                icon="plus"
                                className="h-8 w-8 p-0 rounded-full hover:bg-background"
                            />
                        </div>
                    ) : (
                        <div className="text-sm font-medium text-neutral-color">Qty: {quantity}</div>
                    )}

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            icon="heart"
                            ariaLabel="Save for later"
                            className="hidden sm:flex text-neutral-color hover:text-brand-color"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    );
});

ProductCardHorizontal.displayName = 'ProductCardHorizontal';
