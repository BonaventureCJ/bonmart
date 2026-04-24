// src/components/product/details/product-gallery.tsx

import Image from 'next/image';
import { Icon } from '@/components/ui/icon/icon';
import type { Product } from '@/data/mock-products';

export function ProductGallery({ product }: { product: Product }) {
    return (
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-(--toggle-bg) bg-(--surface-muted)/30">
            {product.isEcoFriendly && (
                <div className="absolute top-6 left-6 z-10 flex items-center gap-2 rounded-full bg-(--brand-color) px-4 py-2 text-xs font-bold uppercase tracking-widest text-(--text-on-image) shadow-xl">
                    <Icon name="globe" size={16} />
                    <span>Eco-Conscious Choice</span>
                </div>
            )}
            <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-12 transition-transform duration-700 hover:scale-105"
            />
        </div>
    );
}
