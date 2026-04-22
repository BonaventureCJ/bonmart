// src/components/wishlist/wishlist-item.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/icon/icon';
import { Button } from '@/components/ui/button/button';
import { Heading } from '@/components/ui/heading/heading';
import type { Product } from '@/data/mock-products';

interface WishlistItemProps {
    item: Product;
    onRemove: (id: number) => void;
    onMoveToCart: (id: number) => void;
}

export function WishlistItem({ item, onRemove, onMoveToCart }: WishlistItemProps) {
    const { id, name, price, imageUrl, slug, category, isEcoFriendly } = item;

    return (
        <article className="group flex items-center gap-4 py-6 border-b border-(--toggle-bg)">
            {/* Image Section */}
            <div className="relative aspect-square h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-(--surface-muted)/40 p-2 sm:h-32 sm:w-32">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-contain mix-blend-multiply dark:mix-blend-normal transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100px, 150px"
                />
            </div>

            {/* Info Section */}
            <div className="flex flex-1 flex-col gap-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-(--brand-color)">
                            {category}
                        </p>
                        <Link href={`/products/${slug}`}>
                            <Heading level={5} weight="semibold" className="line-clamp-1 text-sm sm:text-base hover:text-(--brand-color)">
                                {name}
                            </Heading>
                        </Link>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        icon="close"
                        className="text-(--neutral-color) hover:text-(--error) shrink-0"
                        ariaLabel="Remove from wishlist"
                        onClick={() => onRemove(id)}
                    />
                </div>

                <div className="mt-2 flex items-center gap-3">
                    <span className="text-lg font-bold text-(--foreground)">
                        ${price.toFixed(2)}
                    </span>
                    {isEcoFriendly && (
                        <div className="flex items-center gap-1 rounded-full bg-(--brand-color)/10 px-2 py-0.5 text-[10px] font-bold text-(--brand-color)">
                            <Icon name="globe" size={10} />
                            <span>ECO</span>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center gap-3">
                    <Button
                        variant="primary"
                        size="sm"
                        icon="cart"
                        onClick={() => onMoveToCart(id)}
                        className="px-4 text-xs h-9"
                    >
                        Add to Cart
                    </Button>
                    <Link href={`/products/${slug}`}>
                        <Button variant="secondary" size="sm" className="px-4 text-xs h-9">
                            View Details
                        </Button>
                    </Link>
                </div>
            </div>
        </article>
    );
}
