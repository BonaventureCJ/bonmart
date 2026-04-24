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
    onRemove: (product: Product) => void;
    onMoveToCart: (product: Product) => void;
}

export function WishlistItem({ item, onRemove, onMoveToCart }: WishlistItemProps) {
    const { name, price, imageUrl, slug, category, isEcoFriendly } = item;

    return (
        <article className="group flex items-center gap-4 border-b border-(--toggle-bg) py-6 last:border-0">
            {/* Image Section */}
            <div className="relative aspect-square h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-(--surface-muted)/40 p-2 sm:h-32 sm:w-32">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105 dark:brightness-90"
                    sizes="(max-width: 768px) 100px, 150px"
                />
            </div>

            {/* Info Section */}
            <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-(--brand-color)">
                            {category}
                        </p>
                        <Link href={`/products/${slug}`} className="focus-ring block rounded-sm">
                            <Heading
                                level={5}
                                weight="semibold"
                                className="line-clamp-1 text-sm transition-colors hover:text-(--brand-color) sm:text-base"
                            >
                                {name}
                            </Heading>
                        </Link>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        icon="close"
                        className="shrink-0 text-(--neutral-color) hover:text-(--error)"
                        ariaLabel={`Remove ${name} from wishlist`}
                        onClick={() => onRemove(item)}
                    />
                </div>

                <div className="mt-2 flex items-center gap-3">
                    <span className="text-lg font-bold text-(--foreground)">
                        ${price.toFixed(2)}
                    </span>
                    {isEcoFriendly && (
                        <div
                            className="flex items-center gap-1 rounded-full bg-(--brand-color)/10 px-2 py-0.5 text-[10px] font-bold text-(--brand-color)"
                            aria-label="Eco-friendly product"
                        >
                            <Icon name="globe" size={10} />
                            <span className="uppercase">Eco Choice</span>
                        </div>
                    )}
                </div>

                {/* Actions Section */}
                <div className="mt-4 flex items-center gap-3">
                    <Button
                        variant="primary"
                        size="sm"
                        icon="plus"
                        onClick={() => onMoveToCart(item)}
                        className="h-9 px-4 text-xs"
                    >
                        Add to Cart
                    </Button>
                    <Link href={`/products/${slug}`} className="focus-ring rounded-lg">
                        <Button
                            variant="secondary"
                            size="sm"
                            className="h-9 px-4 text-xs"
                        >
                            View Details
                        </Button>
                    </Link>
                </div>
            </div>
        </article>
    );
}
