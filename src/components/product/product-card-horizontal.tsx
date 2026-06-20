// src/components/product/product-card-horizontal.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui/icon/icon';
import { Button } from '@/components/ui/button/button';
import { Heading } from '@/components/ui/heading/heading';
import type { Product } from '@/types/product';
import { useProductActions } from './card/use-product-actions';
import { CardBadge } from './card/card-badge';
import { CardRating } from './card/card-rating';

export function ProductCardHorizontal({ product, className }: { product: Product; className?: string }) {
    const { name, price, imageUrl, slug, rating, isEcoFriendly, category } = product;
    const { isInCart, isFavourite, isAnimating, isHeartAnimating, handleAddToCart, handleWishlistToggle } = useProductActions(product);

    return (
        <article className={clsx('group relative flex w-full flex-row items-center gap-3 overflow-hidden rounded-xl border border-(--toggle-bg) bg-(--surface-raised) p-2 hover:border-(--brand-color)/30 hover:shadow-md sm:gap-6 sm:p-4', className)}>
            <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-lg bg-(--surface-muted)/20 sm:w-48 sm:rounded-xl">
                <Image src={imageUrl} alt={name} fill sizes="200px" className="object-contain p-2 transition-transform group-hover:scale-105 sm:p-6" />
                {isEcoFriendly && <CardBadge className="absolute top-1 left-1 z-10" />}
            </div>

            <div className="flex flex-1 flex-col justify-between self-stretch py-0.5">
                <div className="flex flex-col">
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-(--neutral-color) opacity-60 sm:text-xs">{category}</span>
                        <Button variant="ghost" size="sm" className="h-7 w-7 rounded-full p-0 sm:h-9 sm:w-9" onClick={handleWishlistToggle}>
                            <Icon name="heart" size={16} filled={isFavourite} className={clsx("transition-transform", isHeartAnimating && "scale-150", isFavourite ? "text-(--brand-color)" : "text-(--neutral-color)")} />
                        </Button>
                    </div>
                    <Link href={`/products/${slug}`} className="focus-ring block">
                        <Heading level={3} weight="semibold" className="line-clamp-1 text-xs sm:text-lg group-hover:text-(--brand-color)">{name}</Heading>
                    </Link>
                    <div className="mt-1"><CardRating rate={rating.rate} count={rating.count} /></div>
                </div>
                <div className="mt-2 flex items-center justify-between gap-4">
                    <span className="text-sm font-bold sm:text-2xl">${price.toFixed(2)}</span>
                    <Button variant={isAnimating || isInCart ? 'secondary' : 'primary'} size="sm" icon={isAnimating ? 'check' : 'plus'} onClick={handleAddToCart} className="h-8 min-w-[32px] sm:h-10 sm:min-w-[140px]">
                        <span className="hidden sm:inline">{isAnimating ? 'Added!' : isInCart ? 'Add More' : 'Add to Cart'}</span>
                    </Button>
                </div>
            </div>
        </article>
    );
}
