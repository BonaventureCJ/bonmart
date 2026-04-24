// src/components/product/details/product-info.tsx

import { Icon } from '@/components/ui/icon/icon';
import { Heading } from '@/components/ui/heading/heading';
import type { Product } from '@/data/mock-products';

export function ProductInfo({ product }: { product: Product }) {
    return (
        <>
            <nav className="mb-4 flex items-center gap-2 text-sm font-medium text-(--neutral-color)" aria-label="Breadcrumb">
                <span className="capitalize">{product.category}</span>
                <Icon name="chevronRight" size={14} className="opacity-40" />
                <span className="truncate text-(--foreground)">{product.name}</span>
            </nav>

            <Heading level={1} weight="bold" className="mb-4 text-3xl md:text-4xl lg:text-5xl">
                {product.name}
            </Heading>

            <div className="mb-8 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 rounded-full bg-(--warning)/10 px-3 py-1.5">
                    <Icon name="star" variant="warning" size={18} />
                    <span className="font-bold text-(--foreground)">{product.rating.rate}</span>
                    <span className="text-xs text-(--neutral-color) opacity-80">({product.rating.count} Reviews)</span>
                </div>
                <div className="hidden h-5 w-px bg-(--toggle-bg) sm:block" />
                <div className="flex items-center gap-2 text-sm font-semibold text-(--brand-color)">
                    <Icon name="check" size={18} />
                    <span>In Stock & Ready to Ship</span>
                </div>
            </div>

            <div className="mb-8 border-y border-(--toggle-bg) py-6">
                <div className="flex items-baseline gap-4">
                    <span className="text-4xl font-black text-(--foreground)">
                        ${product.price.toFixed(2)}
                    </span>
                    <span className="text-lg text-(--neutral-color) line-through opacity-50">
                        ${(product.price * 1.25).toFixed(2)}
                    </span>
                </div>
                <p className="mt-2 text-xs font-medium text-(--neutral-color)">
                    Prices include taxes. Shipping calculated at checkout.
                </p>
            </div>

            <p className="mb-10 text-lg leading-relaxed text-(--neutral-color) lg:max-w-xl">
                {product.description}
            </p>
        </>
    );
}
