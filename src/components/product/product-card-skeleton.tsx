// src/components/product/product-card-skeleton.tsx

import { clsx } from 'clsx';

export function ProductCardSkeleton() {
    return (
        <div className="flex flex-col overflow-hidden rounded-xl border border-(--toggle-bg) bg-(--surface-raised) animate-pulse">
            {/* Image Placeholder */}
            <div className="aspect-square w-full bg-(--surface-muted)/40" />

            {/* Content Placeholder */}
            <div className="flex flex-col p-3 space-y-3">
                <div className="flex justify-between items-center">
                    <div className="h-2 w-12 rounded bg-(--toggle-bg)" />
                    <div className="h-2 w-8 rounded bg-(--toggle-bg)" />
                </div>
                <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-(--toggle-bg)" />
                    <div className="h-3 w-4/5 rounded bg-(--toggle-bg)" />
                </div>
                <div className="flex justify-between items-center pt-2">
                    <div className="h-4 w-16 rounded bg-(--toggle-bg)" />
                    <div className="h-7 w-7 rounded-full bg-(--toggle-bg)" />
                </div>
            </div>
        </div>
    );
}
