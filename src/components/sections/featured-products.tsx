// src/components/sections/featured-products.tsx

import { Heading } from '@/components/ui/heading/heading';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon/icon';

/**
 * FeaturedProducts Section
 * High-density placeholder grid for curated sustainable essentials.
 * Designed for scannability and professional e-commerce aesthetics.
 */
export function FeaturedProducts() {
    return (
        <section aria-labelledby="featured-products-title">
            {/* Header: Compact layout with primary action */}
            <header className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
                <div className="text-center md:text-left">
                    <Heading id="featured-products-title" level={3} weight="bold" align="left">
                        Featured <span className="text-(--brand-color)">Essentials</span>
                    </Heading>
                    <p className="mt-1 text-sm text-(--neutral-color)">Our most-loved eco-friendly picks.</p>
                </div>
                <Button
                    href="/products"
                    variant="ghost"
                    size="sm"
                    icon="arrowRight"
                    iconPlacement="right"
                    className="text-(--brand-color) hover:bg-(--brand-color)/5"
                >
                    View Catalog
                </Button>
            </header>

            {/* High-Density Grid: 2 columns mobile, 5 columns desktop */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                {[1, 2, 3, 4, 5].map((item) => (
                    <div
                        key={item}
                        className="group flex flex-col rounded-2xl border border-(--toggle-bg) bg-(--surface-raised) p-3 transition-colors hover:border-(--brand-color)/30"
                    >
                        {/* Compact Visual Area (4:5 Aspect Ratio) */}
                        <div className="relative aspect-[4/5] mb-3 flex items-center justify-center overflow-hidden rounded-xl bg-(--surface-muted)">
                            <Icon
                                name="leaf"
                                size={32}
                                className="text-(--brand-color) opacity-10 transition-transform group-hover:scale-110"
                            />
                        </div>

                        {/* Skeleton Metadata Content */}
                        <div className="space-y-1.5">
                            <div className="h-3 w-full rounded-full bg-(--toggle-bg)" />
                            <div className="h-3 w-2/3 rounded-full bg-(--toggle-bg) opacity-60" />

                            <div className="flex items-center justify-between pt-1">
                                <div className="h-4 w-12 rounded bg-(--brand-color)/10" />
                                <div className="h-6 w-6 rounded-full bg-(--toggle-bg)" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Implementation Note for Developers */}
            <div className="mt-8 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-(--toggle-bg) bg-(--surface-muted)/50 px-4 py-1">
                    <Icon name="clock" size={12} className="text-(--neutral-color)" />
                    <p className="text-[10px] font-medium tracking-wide text-(--neutral-color) uppercase opacity-70">
                        Interactive product cards and data fetching will be implemented in upcoming iterations.
                    </p>
                </div>
            </div>
        </section>
    );
}

