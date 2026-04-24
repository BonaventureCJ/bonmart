// src/components/ecommerce/category-card.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui/icon/icon';
import { Heading } from '@/components/ui/heading/heading';
import { useAppSelector } from '@/store/hooks'; // RTK Hook

interface CategoryCardProps {
    name: string;
    slug: string;
    imageUrl: string;
    className?: string;
}

export function CategoryCard({
    name,
    slug,
    imageUrl,
    className,
}: CategoryCardProps) {
    // 1. RTK Optimization: Derive the product count dynamically from the store
    // This ensures "itemCount" is always accurate based on the live product list
    const itemCount = useAppSelector((state) =>
        state.products.items.filter(product =>
            product.category.toLowerCase() === name.toLowerCase()
        ).length
    );

    return (
        <Link
            href={`/category/${slug}`}
            className={clsx(
                'group relative flex aspect-[4/5] w-full flex-col overflow-hidden rounded-3xl',
                'bg-(--surface-muted) transition-all duration-(--duration-long) ease-(--transition-ease-in-out)',
                'focus-ring outline-offset-4',
                className
            )}
        >
            <Image
                src={imageUrl}
                alt={name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            <div
                className="absolute inset-0 bg-gradient-to-t from-(--overlay-bg) via-(--overlay-bg)/20 to-transparent transition-opacity duration-500 group-hover:opacity-80"
                aria-hidden="true"
            />

            <div className="relative mt-auto flex flex-col p-6 sm:p-8">
                <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--brand-color) text-(--text-on-image) shadow-lg">
                        <Icon name="chevronRight" size={16} />
                    </div>
                    {/* Display dynamic count from RTK */}
                    <span className="text-xs font-bold uppercase tracking-widest text-(--text-on-image)/80">
                        {itemCount} Products
                    </span>
                </div>

                <Heading
                    level={2}
                    weight="bold"
                    className="text-2xl text-(--text-on-image) sm:text-3xl"
                >
                    {name}
                </Heading>

                <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-(--text-on-image) opacity-0 transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                    <span>Explore Collection</span>
                    <Icon name="arrowRight" size={14} />
                </div>
            </div>
        </Link>
    );
}


