// src/components/product/product-card-mini.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';
import type { Product } from '@/types/product';

export function ProductCardMini({ product, className }: { product: Product; className?: string }) {
    const { name, price, imageUrl, slug, rating, isEcoFriendly } = product;

    return (
        <article
            className={clsx(
                'group flex flex-col gap-2 rounded-2xl border border-(--toggle-bg)',
                'bg-(--surface-raised) p-2 transition-all duration-300 sm:gap-3 sm:p-3',
                'hover:border-(--brand-color)/40 hover:shadow-md',
                className
            )}
        >
            {/* Visual Anchor & Eco Badge */}
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-(--surface-muted)/20">
                <Link
                    href={`/products/${slug}`}
                    className="block h-full w-full"
                >
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        sizes="(max-width: 640px) 30vw, 15vw"
                        className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-110 sm:p-2"
                    />
                </Link>

                {/* 🍃 Micro Eco Badge: Absolute positioned over image */}
                {isEcoFriendly && (
                    <div
                        className="absolute top-1 left-1 flex items-center justify-center rounded-full bg-(--brand-color) p-1 text-(--text-on-brand) shadow-sm sm:top-1.5 sm:left-1.5"
                        title="Eco-Friendly Choice"
                    >
                        <Icon name="leaf" size={10} className="sm:size-3" />
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-1 sm:gap-1.5">
                {/* 🌟 Micro-Rating */}
                <div className="flex items-center gap-1">
                    <Icon name="star" size={10} className="text-(--warning)" />
                    <span className="text-[9px] font-bold tabular-nums text-(--foreground) sm:text-[10px]">
                        {rating.rate}
                    </span>
                    <span className="text-[8px] font-medium text-(--neutral-color) opacity-50 sm:text-[9px]">
                        ({rating.count})
                    </span>
                </div>

                <Link href={`/products/${slug}`} className="focus-ring block">
                    <Heading
                        level={4}
                        weight="semibold"
                        align="left"
                        className="line-clamp-1 text-[10px] text-(--foreground) transition-colors group-hover:text-(--brand-color) sm:text-sm"
                    >
                        {name}
                    </Heading>
                </Link>

                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-(--foreground) tabular-nums sm:text-base">
                        ${price.toFixed(2)}
                    </span>
                    <div className="h-1 w-1 rounded-full bg-(--brand-color)/30 sm:h-1.5 sm:w-1.5" aria-hidden="true" />
                </div>
            </div>
        </article>
    );
}

