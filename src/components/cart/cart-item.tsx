// src/components/cart/cart-item.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui/icon/icon';
import { Button } from '@/components/ui/button/button';
import { Heading } from '@/components/ui/heading/heading';
import { useAppDispatch } from '@/store/hooks';
import { removeFromCart, updateQuantity, type CartItem as CartItemType } from '@/features/cart/cart-slice';

interface CartItemProps {
    item: CartItemType;
    className?: string;
}

/**
 * CartItem Component
 * 
 * Individual item row for the cart/checkout flow.
 * Optimized with normalized O(1) action dispatches for performant entity updates.
 */
export function CartItem({ item, className }: CartItemProps) {
    const { id, name, price, imageUrl, slug, quantity, isEcoFriendly } = item;
    const dispatch = useAppDispatch();

    // Optimized Handlers using Dispatch
    // These interact with the Normalized Cart Slice using Entity IDs.
    const handleUpdateQuantity = (delta: number) => {
        const newQty = quantity + delta;
        if (newQty > 0) {
            // Uses the refactored updateQuantity which calls cartAdapter.updateOne
            dispatch(updateQuantity({ id, quantity: newQty }));
        }
    };

    const handleRemove = () => dispatch(removeFromCart(id));

    return (
        <article
            className={clsx(
                'group flex items-center gap-4 border-b border-(--toggle-bg) bg-(--background) py-6 duration-(--duration-long) last:border-0',
                className
            )}
            role="listitem"
        >
            <div className="relative aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-(--surface-muted)/30 sm:h-24 sm:w-24">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    sizes="96px"
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-start justify-between gap-2">
                    <Link href={`/products/${slug}`} className="focus-ring rounded-sm">
                        <Heading
                            level={6}
                            weight="semibold"
                            className="line-clamp-1 text-sm hover:text-(--brand-color) sm:text-base"
                        >
                            {name}
                        </Heading>
                    </Link>
                    <Button
                        variant="ghost"
                        size="sm"
                        icon="trash"
                        className="-mr-2 -mt-1 shrink-0 text-(--neutral-color) hover:text-(--error)"
                        ariaLabel={`Remove ${name} from cart`}
                        onClick={handleRemove}
                    />
                </div>

                {isEcoFriendly && (
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-(--brand-color)">
                        <Icon name="leaf" size={10} />
                        <span>Eco Choice</span>
                    </div>
                )}

                <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-(--foreground) sm:text-base tabular-nums">
                            ${(price * quantity).toFixed(2)}
                        </span>
                        {quantity > 1 && (
                            <span className="text-[10px] text-(--neutral-color) opacity-60 tabular-nums">
                                ${price.toFixed(2)} each
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-1 rounded-full border border-(--toggle-bg) bg-(--surface-raised) p-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            icon="minus"
                            className="h-7 w-7 rounded-full"
                            disabled={quantity <= 1}
                            ariaLabel="Decrease quantity"
                            onClick={() => handleUpdateQuantity(-1)}
                        />
                        <span className="min-w-6 text-center text-xs font-bold tabular-nums" aria-live="polite">
                            {quantity}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            icon="plus"
                            className="h-7 w-7 rounded-full"
                            ariaLabel="Increase quantity"
                            onClick={() => handleUpdateQuantity(1)}
                        />
                    </div>
                </div>
            </div>
        </article>
    );
}
