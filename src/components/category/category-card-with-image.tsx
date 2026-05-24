// src/components/category/category-card.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui/icon/icon';
import { Heading } from '@/components/ui/heading/heading';
import { useAppSelector } from '@/store/hooks';
import { selectProductCountByCategory } from '@/features/products/product-selectors';

interface CategoryCardProps {
    name: string;
    slug: string;
    imageUrl: string;
    className?: string;
}

/**
 * Category Card
 * Consumes a centralized memoized selector for dynamic item counting.
 * Aligns with normalized createEntityAdapter state structure.
 */
export function CategoryCard({
    name,
    slug,
    imageUrl,
    className,
}: CategoryCardProps) {
    /** 
     * Optimized: Count derived from centralized memoized selector.
     * Performance: Under normalization, selectProductCountByCategory filters 
     * the referentially stable 'selectAll' array derived from the adapter.
     */
    const itemCount = useAppSelector((state) => selectProductCountByCategory(name)(state));

    return (
        <Link
            href={`/category/${slug}`}
            className={clsx(
                'group relative flex aspect-[4/5] w-full flex-col overflow-hidden rounded-3xl',
                'bg-(--surface-muted) ease-(--transition-ease-in-out)',
                'focus-ring outline-offset-4',
                className
            )}
        >
            <Image
                src={imageUrl}
                alt={`Browse ${name} collection`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Gradient Overlay for Text Legibility */}
            <div
                className="absolute inset-0 bg-gradient-to-t from-(--overlay-bg) via-(--overlay-bg)/20 to-transparent transition-opacity duration-500 group-hover:opacity-80"
                aria-hidden="true"
            />

            <div className="relative mt-auto flex flex-col p-6 sm:p-8">
                <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--brand-color) text-(--text-on-image) shadow-lg">
                        <Icon name="chevronRight" size={16} />
                    </div>
                    {/* Display dynamic memoized count with tabular-nums for stability */}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-(--text-on-image)/80 tabular-nums">
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

                {/* Hover Reveal Action */}
                <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-(--text-on-image) opacity-0 transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                    <span>Explore Collection</span>
                    <Icon name="arrowRight" size={14} />
                </div>
            </div>
        </Link>
    );
}
