// src/components/cart/cart-item.tsx

'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button/button';
import { Heading } from '@/components/ui/heading/heading';
import type { Product } from '@/data/mock-products';

interface CartItemProps {
    item: Product & { quantity: number };
    onUpdateQuantity: (id: number, delta: number) => void;
    onRemove: (id: number) => void;
}

export const CartItem = React.memo(function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
    return (
        <article className="flex gap-4 py-6 border-b border-toggle-bg last:border-0 bg-background">
            {/* Image Container - Replaced neutral-100 with surface-muted */}
            <div className="relative h-24 w-24 shrink-0 rounded-lg bg-surface-muted overflow-hidden">
                <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-contain p-2"
                    sizes="96px"
                />
            </div>

            <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between">
                    <Link href={`/products/${item.slug}`} className="hover:text-brand-color transition-colors focus-ring rounded-sm">
                        <Heading level={4} weight="semibold" className="line-clamp-1 text-foreground">
                            {item.name}
                        </Heading>
                    </Link>
                    <span className="font-bold text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                    </span>
                </div>

                <div className="flex items-center justify-between mt-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-1 rounded-full border border-toggle-bg bg-toggle-container-bg p-1">
                        <Button
                            variant="ghost"
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                            icon="minus"
                            className="h-8 w-8 p-0 rounded-full hover:bg-background"
                            ariaLabel="Decrease"
                        />
                        <span className="w-8 text-center text-sm font-bold text-foreground">
                            {item.quantity}
                        </span>
                        <Button
                            variant="ghost"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            icon="plus"
                            className="h-8 w-8 p-0 rounded-full hover:bg-background"
                            ariaLabel="Increase"
                        />
                    </div>

                    {/* Remove Action - Replaced red-500 with semantic error token */}
                    <Button
                        variant="ghost"
                        onClick={() => onRemove(item.id)}
                        icon="close"
                        className="text-neutral-color hover:text-error hover:bg-error-muted rounded-full"
                        ariaLabel="Remove"
                    />
                </div>
            </div>
        </article>
    );
});

CartItem.displayName = 'CartItem';
