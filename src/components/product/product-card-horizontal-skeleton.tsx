// src/components/product/product-card-horizontal-skeleton.tsx

import React from 'react';
import { clsx } from 'clsx';

interface ProductCardHorizontalSkeletonProps {
    readonly className?: string;
}

/**
 * ProductCardHorizontalSkeleton Component
 * 
 * High-fidelity loading layout structure built specifically for horizontal e-commerce lists.
 * Mirrors the exact structural footprints, padding metrics, flex layouts, and responsive 
 * media query dimensions of the live <ProductCardHorizontal /> component to prevent layout shifts.
 */
export function ProductCardHorizontalSkeleton({ className }: ProductCardHorizontalSkeletonProps) {
    return (
        <div
            className={clsx(
                'flex w-full flex-row items-center gap-3 overflow-hidden rounded-xl border border-(--toggle-bg) bg-(--surface-raised) p-2 animate-pulse',
                'sm:gap-6 sm:p-4',
                className
            )}
            aria-hidden="true"
        >
            {/* Left Column: Visual Image Placeholder Box */}
            <div className="relative aspect-square w-24 shrink-0 rounded-lg bg-(--surface-muted)/40 sm:w-48 sm:rounded-xl" />

            {/* Right Column: Metadata & Core Operational Content Fields Block */}
            <div className="flex flex-1 flex-col justify-between self-stretch py-0.5">

                {/* Upper Sub-Container: Taxonomy & Header Content Fields */}
                <div className="flex flex-col">
                    <div className="flex items-center justify-between gap-2">
                        {/* Category Label Token Skeleton */}
                        <div className="h-2.5 w-16 rounded bg-(--toggle-bg) sm:h-3 sm:w-24" />

                        {/* Wishlist Round Toggle Badge Skeleton */}
                        <div className="h-7 w-7 rounded-full bg-(--toggle-bg) sm:h-9 sm:w-9" />
                    </div>

                    {/* Primary Heading Title Anchor Line Skeletons */}
                    <div className="mt-2 space-y-1.5">
                        <div className="h-3.5 w-full rounded bg-(--toggle-bg) sm:h-5" />
                    </div>

                    {/* Star Rating Layout Composite Blocks */}
                    <div className="mt-3 flex items-center gap-1">
                        <div className="h-3 w-16 rounded bg-(--toggle-bg)" />
                        <div className="h-3 w-10 rounded bg-(--toggle-bg)" />
                    </div>
                </div>

                {/* Lower Sub-Container: Currency Pricing & Interactive Trigger Actions */}
                <div className="mt-4 flex items-center justify-between gap-4">
                    {/* Financial Expenditure Total Label Line */}
                    <div className="h-5 w-14 rounded bg-(--toggle-bg) sm:h-7 sm:w-24" />

                    {/* Dynamic Add to Cart Action Execution Trigger Button Shape */}
                    <div className="h-8 w-8 rounded-full bg-(--toggle-bg) sm:h-10 sm:w-[140px] sm:rounded-lg" />
                </div>

            </div>
        </div>
    );
}
