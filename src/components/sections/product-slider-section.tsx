// src/components/sections/product-slider-section.tsx

'use client';

import { useRef } from 'react';
import { Heading } from '@/components/ui/heading/heading';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon/icon';
import { ProductCardMini } from '@/components/product/product-card-mini';
import { ProductCardSkeleton } from '@/components/product/product-card-skeleton';
import type { Product } from '@/types/product';

interface ProductSliderSectionProps {
    title: string;
    tagline?: string;
    products: Product[];
    isLoading?: boolean;
    viewAllHref?: string;
    viewAllText?: string; // Customizable link text for better UX/SEO
    accentWord?: string;
}

/**
 * ProductSliderSection
 * A reusable container for horizontal product shelves.
 * Handles header composition, smooth scroll logic, and responsive grid density.
 */
export function ProductSliderSection({
    title,
    tagline,
    products,
    isLoading = false,
    viewAllHref = '/products',
    viewAllText = 'View All', // Default fallback value
    accentWord
}: ProductSliderSectionProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    /**
     * Smooth scroll logic for navigational chevrons.
     * Uses clientWidth to ensure a full page of products is scrolled.
     */
    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const offset = clientWidth * 0.85;
            const scrollTo = direction === 'left' ? scrollLeft - offset : scrollLeft + offset;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section aria-label={title}>
            <header className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
                <div className="text-center md:text-left">
                    <Heading level={2} weight="bold" align="left">
                        {title} {accentWord && <span className="text-(--brand-color)">{accentWord}</span>}
                    </Heading>
                    {tagline && <p className="mt-1 text-sm text-(--neutral-color)">{tagline}</p>}
                </div>
                <Button
                    href={viewAllHref}
                    variant="ghost"
                    size="sm"
                    icon="arrowRight"
                    iconPlacement="right"
                    className="text-(--brand-color) hover:bg-(--brand-color)/5"
                >
                    {viewAllText}
                </Button>
            </header>

            {/* Slider Wrapper: 'group/slider' scoped specifically for navigation arrows */}
            <div className="group/slider relative">
                {/* ⬅️ Navigation Left */}
                <div className="absolute -left-2 top-1/2 z-30 -translate-y-1/2 opacity-0 transition-opacity group-hover/slider:opacity-100 sm:-left-4">
                    <Button
                        variant="secondary"
                        className="h-10 w-10 rounded-full border border-(--toggle-bg) bg-(--surface-raised) shadow-md hover:scale-110 active:scale-95 sm:h-12 sm:w-12"
                        onClick={() => scroll('left')}
                        ariaLabel="Scroll products left"
                    >
                        <Icon name="chevronLeft" size={20} />
                    </Button>
                </div>

                {/* 🚀 Horizontal Scroll Track */}
                <div
                    ref={scrollRef}
                    className="scroll-snap-x scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:gap-4 sm:px-6 lg:mx-0 lg:px-0"
                >
                    {isLoading
                        ? Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="w-[calc(33.333%-6px)] shrink-0 snap-center sm:w-[240px] lg:w-[calc(16.666%-13.3px)]">
                                <ProductCardSkeleton />
                            </div>
                        ))
                        : products.map((product) => (
                            <div key={product.id} className="w-[calc(33.333%-6px)] shrink-0 snap-center sm:w-[240px] lg:w-[calc(16.666%-13.3px)]">
                                <ProductCardMini product={product} />
                            </div>
                        ))}
                </div>

                {/* ➡️ Navigation Right */}
                <div className="absolute -right-2 top-1/2 z-30 -translate-y-1/2 opacity-0 transition-opacity group-hover/slider:opacity-100 sm:-right-4">
                    <Button
                        variant="secondary"
                        className="h-10 w-10 rounded-full border border-(--toggle-bg) bg-(--surface-raised) shadow-md hover:scale-110 active:scale-95 sm:h-12 sm:w-12"
                        onClick={() => scroll('right')}
                        ariaLabel="Scroll products right"
                    >
                        <Icon name="chevronRight" size={20} />
                    </Button>
                </div>

                {/* Visual Depth Hint: Right Edge Fade */}
                <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-(--background) to-transparent opacity-60 md:w-20" />
            </div>
        </section>
    );
}
