// src/components/cart/cart-item.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/icon/icon';
import { Button } from '@/components/ui/button/button';
import { Heading } from '@/components/ui/heading/heading';
import type { Product } from '@/data/mock-products';
import { clsx } from 'clsx';

interface CartItemProps {
    item: Product & { quantity: number };
    onUpdateQuantity: (id: number, delta: number) => void;
    onRemove: (id: number) => void;
    className?: string;
}

/**
 * Enterprise Cart Item Component for Bonmart.
 * Optimized for row-based layout with clear hit areas and theme-aware styling.
 */
export function CartItem({ item, onUpdateQuantity, onRemove, className }: CartItemProps) {
    const { id, name, price, imageUrl, slug, quantity, isEcoFriendly } = item;

    return (
        <article
            className={clsx(
                'group flex items-center gap-4 py-4 border-b border-(--toggle-bg)',
                'bg-(--background) transition-colors duration-(--duration-long)',
                className
            )}
        >
            {/* 1. Product Image */}
            <div className="relative aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-(--surface-muted)/30 sm:h-24 sm:w-24">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    sizes="96px"
                    className="object-contain p-2 transition-transform group-hover:scale-105"
                />
            </div>

            {/* 2. Product Info */}
            <div className="flex flex-1 flex-col gap-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <Link href={`/products/${slug}`} className="focus-ring rounded-sm">
                        <Heading level={6} weight="semibold" className="line-clamp-1 text-sm sm:text-base hover:text-(--brand-color) transition-colors">
                            {name}
                        </Heading>
                    </Link>
                    <Button
                        variant="ghost"
                        size="sm"
                        icon="close"
                        className="text-(--neutral-color) hover:text-(--error) -mt-1 -mr-2"
                        ariaLabel={`Remove ${name} from cart`}
                        onClick={() => onRemove(id)}
                    />
                </div>

                {isEcoFriendly && (
                    <div className="flex items-center gap-1 text-(--brand-color) text-[10px] font-bold uppercase tracking-wider">
                        <Icon name="globe" size={10} />
                        <span>Eco Choice</span>
                    </div>
                )}

                <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                    {/* Price Calculation */}
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-(--foreground)">
                            ${(price * quantity).toFixed(2)}
                        </span>
                        {quantity > 1 && (
                            <span className="text-[10px] text-(--neutral-color) opacity-60">
                                ${price.toFixed(2)} each
                            </span>
                        )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1 rounded-full border border-(--toggle-bg) bg-(--surface-raised) p-0.5">
                        <Button
                            variant="ghost"
                            size="sm"
                            icon="minus"
                            className="h-7 w-7"
                            disabled={quantity <= 1}
                            ariaLabel="Decrease quantity"
                            onClick={() => onUpdateQuantity(id, -1)}
                        />
                        <span className="w-6 text-center text-xs font-bold" aria-live="polite">
                            {quantity}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            icon="plus"
                            className="h-7 w-7"
                            ariaLabel="Increase quantity"
                            onClick={() => onUpdateQuantity(id, 1)}
                        />
                    </div>
                </div>
            </div>
        </article>
    );
}
