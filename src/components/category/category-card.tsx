// src/components/category/category-card.tsx

'use client';

import Link from 'next/link';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui/icon/icon';
import { useAppSelector } from '@/store/hooks';
import { selectProductCountByCategory } from '@/features/products/product-selectors';

interface CategoryCardProps {
    name: string;
    slug: string;
    className?: string;
}

export function CategoryCard({ name, slug, className }: CategoryCardProps) {
    const itemCount = useAppSelector((state) => selectProductCountByCategory(name)(state));

    return (
        <Link
            href={`/products?category=${slug}`}
            className={clsx(
                'group relative flex h-24 w-full items-center overflow-hidden rounded-2xl',
                'bg-(--surface-muted) ring-1 ring-(--toggle-bg)',
                'transition-all duration-300 hover:ring-(--brand-color)/40 hover:shadow-lg',
                className
            )}
        >
            {/* 🎨 Artistic Background: Abstract Mesh */}
            <div className="absolute inset-0 bg-linear-to-r from-(--brand-color)/15 to-transparent" />
            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-(--brand-color)/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />

            {/* Left Brand Accent */}
            <div className="flex h-full w-2 shrink-0 bg-(--brand-color)/20 transition-all duration-300 group-hover:w-3 group-hover:bg-(--brand-color)" />

            <div className="flex flex-1 items-center justify-between px-6">
                <div className="flex flex-col">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-(--brand-color)">
                        {itemCount} Products
                    </span>
                    <h3 className="text-lg font-bold capitalize tracking-tight text-(--foreground) sm:text-xl">
                        {name}
                    </h3>
                </div>

                {/* Right Action: Round Chevron */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--surface-raised) text-(--brand-color) shadow-sm ring-1 ring-(--toggle-bg) transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-(--brand-color) group-hover:text-(--text-on-brand)">
                    <Icon name="arrowRight" size={18} />
                </div>
            </div>

            {/* Subtle Ghost Icon */}
            <div className="absolute right-16 opacity-5 transition-transform duration-500 group-hover:scale-125 group-hover:opacity-10">
                <Icon name="leaf" size={60} />
            </div>
        </Link>
    );
}

