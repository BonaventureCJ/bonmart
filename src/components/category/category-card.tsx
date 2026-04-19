// src/components/ecommerce/category-card.tsx

'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';

interface CategoryCardProps {
    title: string;
    description?: string;
    imageUrl: string;
    href: string;
    itemCount?: number;
    className?: string;
}

/**
 * CategoryCard Component
 * 
 * Features:
 * - Immersive lifestyle imagery with brand-color overlays.
 * - Semantic structure for SEO discoverability.
 * - Mobile-first responsive design.
 * - High-performance Next.js Image handling.
 */
export const CategoryCard = React.memo(function CategoryCard({
    title,
    description,
    imageUrl,
    href,
    itemCount,
    className,
}: CategoryCardProps) {
    return (
        <Link
            href={href}
            className={clsx(
                'group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-surface-muted',
                'focus-ring outline-offset-4',
                className
            )}
        >
            {/* Background Image */}
            <Image
                src={imageUrl}
                alt="" // Decorative: Title provides context
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />

            {/* Gradient Overlay: Transitions from neutral black to brand-color on hover */}
            <div
                className={clsx(
                    "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent",
                    "transition-colors duration-500 group-hover:from-brand-color/90 group-hover:via-brand-color/40"
                )}
                aria-hidden="true"
            />

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-text-on-image sm:p-8">
                <div className="translate-y-4 transition-transform duration-500 ease-out group-hover:translate-y-0">
                    {itemCount !== undefined && (
                        <span className="mb-2 inline-block text-xs font-bold uppercase tracking-widest text-text-on-image/80">
                            {itemCount} Products
                        </span>
                    )}

                    <Heading
                        level={2}
                        as="span" // Semantic H2 but visually scoped to card
                        weight="bold"
                        className="mb-2 text-2xl text-text-on-image md:text-3xl"
                    >
                        {title}
                    </Heading>

                    {description && (
                        <p className="line-clamp-2 max-h-0 text-sm font-medium text-text-on-image/0 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:text-text-on-image/90 group-hover:opacity-100">
                            {description}
                        </p>
                    )}

                    <div className="mt-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                        Explore Collection
                        <Icon
                            name="arrowRight"
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
});

CategoryCard.displayName = 'CategoryCard';
