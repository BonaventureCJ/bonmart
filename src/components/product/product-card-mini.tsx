// src/components/product/product-card-mini.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { Heading } from '@/components/ui/heading/heading';
import type { Product } from '@/data/mock-products';

export function ProductCardMini({ product, className }: { product: Product; className?: string }) {
    const { name, price, imageUrl, slug } = product;

    return (
        <article
            className={clsx(
                'group flex flex-col gap-2 rounded-2xl border border-(--toggle-bg)',
                'bg-(--surface-raised) p-2 transition-all duration-300 sm:gap-3 sm:p-3',
                'hover:border-(--brand-color)/40 hover:shadow-md',
                className
            )}
        >
            <Link
                href={`/products/${slug}`}
                className="relative aspect-square w-full overflow-hidden rounded-xl bg-(--surface-muted)/20"
            >
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 30vw, 15vw"
                    className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-110 sm:p-2"
                />
            </Link>

            <div className="flex flex-col gap-1 sm:gap-1.5">
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

