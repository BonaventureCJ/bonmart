// src/components/product/details/product-info.tsx

'use client';

import { Icon } from '@/components/ui/icon/icon';
import { Heading } from '@/components/ui/heading/heading';
import { useAppSelector } from '@/store/hooks';
import { selectProductById } from '@/features/products/product-selectors';
import type { Product } from '@/data/mock-products';

/**
 * ProductInfo Component
 * 
 * Displays core product metadata. Updated to subscribe to the normalized 
 * store via selectProductById to ensure real-time data consistency.
 */
export function ProductInfo({ product: initialProduct }: { product: Product }) {
    /**
     * Enterprise Optimization:
     * Subscribing to the specific entity in the normalized store ensures 
     * this component reflects global updates (e.g. price drops or stock changes)
     * with O(1) lookup performance.
     */
    const product = useAppSelector((state) =>
        selectProductById(state, initialProduct.id)
    ) ?? initialProduct;

    const { name, category, rating, price, description } = product;

    return (
        <>
            {/* Breadcrumb Navigation - Enterprise SEO best practice */}
            <nav className="mb-4 flex items-center gap-2 text-sm font-medium text-(--neutral-color)" aria-label="Breadcrumb">
                <span className="capitalize">{category}</span>
                <Icon name="chevronRight" size={14} className="opacity-40" />
                <span className="truncate text-(--foreground)">{name}</span>
            </nav>

            <Heading level={1} weight="bold" className="mb-4 text-3xl md:text-4xl lg:text-5xl">
                {name}
            </Heading>

            {/* Social Proof & Availability Row */}
            <div className="mb-8 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 rounded-full bg-(--warning)/10 px-3 py-1.5">
                    <Icon name="star" variant="warning" size={18} />
                    <span className="font-bold tabular-nums text-(--foreground)">{rating.rate}</span>
                    <span className="text-xs text-(--neutral-color) opacity-80">
                        (<span className="tabular-nums">{rating.count}</span> Reviews)
                    </span>
                </div>

                <div className="hidden h-5 w-px bg-(--toggle-bg) sm:block" aria-hidden="true" />

                <div className="flex items-center gap-2 text-sm font-semibold text-(--brand-color)">
                    <Icon name="leaf" size={18} />
                    <span>In Stock & Ready to Ship</span>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="mb-8 border-y border-(--toggle-bg) py-6">
                <div className="flex items-baseline gap-4" aria-live="polite">
                    <span className="text-4xl font-black tabular-nums text-(--foreground)">
                        ${price.toFixed(2)}
                    </span>
                    {/* Mock discount for visual engagement */}
                    <span className="text-lg tabular-nums text-(--neutral-color) line-through opacity-50">
                        ${(price * 1.25).toFixed(2)}
                    </span>
                </div>
                <p className="mt-2 text-xs font-medium text-(--neutral-color)">
                    Prices include taxes. Shipping calculated at checkout.
                </p>
            </div>

            {/* Product Description */}
            <p className="mb-10 text-lg leading-relaxed text-(--neutral-color) lg:max-w-xl">
                {description}
            </p>
        </>
    );
}
