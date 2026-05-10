// src/components/product/details/product-gallery.tsx

import Image from 'next/image';
import { Icon } from '@/components/ui/icon/icon';
import type { Product } from '@/data/mock-products';

export function ProductGallery({ product }: { product: Product }) {
    return (
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-(--toggle-bg) bg-(--surface-muted)/30">
            {/* Branding: Replaced 'globe' with 'leaf' to match enterprise Green strategy */}
            {product.isEcoFriendly && (
                <div
                    className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-(--brand-color) px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-(--text-on-image) shadow-lg sm:top-6 sm:left-6 sm:px-4 sm:py-2 sm:text-xs"
                    role="status"
                    aria-label="Eco-friendly product badge"
                >
                    <Icon name="leaf" size={16} />
                    <span>Eco Choice</span>
                </div>
            )}

            <Image
                src={product.imageUrl}
                alt={`Detailed view of ${product.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-8 transition-transform duration-700 hover:scale-105 sm:p-12"
            />
        </div>
    );
}
