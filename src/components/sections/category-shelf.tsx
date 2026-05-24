// src/components/sections/category-shelf.tsx

'use client';

import { useRef } from 'react';
import { useAppSelector } from '@/store/hooks';
import { Heading } from '@/components/ui/heading/heading';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon/icon';
import { CategoryCard } from '@/components/category/category-card';
import { selectProductCategories } from '@/features/products/product-selectors';

export function CategoryShelf() {
    const categories = useAppSelector(selectProductCategories);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const offset = clientWidth * 0.8;
            const scrollTo = direction === 'left' ? scrollLeft - offset : scrollLeft + offset;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section aria-labelledby="category-shelf-title">
            <header className="mb-6 flex items-end justify-between px-1">
                <div className="space-y-1">
                    <Heading id="category-shelf-title" level={3} weight="bold" align="left">
                        Explore <span className="text-(--brand-color)">Categories</span>
                    </Heading>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 w-8 p-0 md:h-10 md:w-10"
                        onClick={() => scroll('left')}
                    >
                        <Icon name="chevronLeft" size={18} />
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 w-8 p-0 md:h-10 md:w-10"
                        onClick={() => scroll('right')}
                    >
                        <Icon name="chevronRight" size={18} />
                    </Button>
                </div>
            </header>

            {/* Horizontal Track with smaller card widths */}
            <div
                ref={scrollRef}
                className="scroll-snap-x scrollbar-none -mx-4 flex gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
            >
                {categories.map((category) => (
                    <div
                        key={category}
                        className="w-[240px] shrink-0 snap-start sm:w-[280px]"
                    >
                        <CategoryCard
                            name={category}
                            slug={encodeURIComponent(category.toLowerCase())} 
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

