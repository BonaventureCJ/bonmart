// src/components/product/product-card.tsx

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

export function ProductCard({ product, className }: { product: Product; className?: string }) {
    const { name, price, imageUrl, slug, rating, isEcoFriendly, category } = product;
    const { isInCart, isFavourite, isAnimating, isHeartAnimating, handleAddToCart, handleWishlistToggle } = useProductActions(product);

    return (
        <article className={clsx('group relative flex flex-col overflow-hidden rounded-xl border border-(--toggle-bg) bg-(--surface-raised) hover:border-(--brand-color)/40 hover:shadow-md', className)}>
            <div className="relative aspect-square w-full overflow-hidden bg-(--surface-muted)/20">
                <Button variant="ghost" size="sm" className="absolute top-1.5 right-1.5 z-20 h-7 w-7 rounded-full bg-(--surface-raised)/80 p-0 backdrop-blur-sm" onClick={handleWishlistToggle}>
                    <Icon name="heart" size={18} filled={isFavourite} className={clsx("transition-all", isHeartAnimating && "scale-125", isFavourite ? "text-(--brand-color)" : "text-(--neutral-color)")} />
                </Button>

                {isEcoFriendly && <CardBadge className="absolute top-1.5 left-1.5 z-10" />}

                <Image src={imageUrl} alt={name} fill sizes="(max-width: 640px) 50vw, 16vw" className="object-contain p-4 transition-transform group-hover:scale-105" />

                <div className="absolute inset-x-0 bottom-0 hidden translate-y-full bg-gradient-to-t from-(--overlay-bg) to-transparent p-3 transition-transform group-hover:translate-y-0 md:block">
                    <Button variant={isAnimating || isInCart ? 'secondary' : 'primary'} fullWidth size="sm" icon={isAnimating ? 'check' : 'plus'} onClick={handleAddToCart}>
                        {isAnimating ? 'Added!' : isInCart ? 'Add More' : 'Add to Cart'}
                    </Button>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-2.5 md:p-3">
                <div className="mb-1 flex items-center justify-between">
                    <span className="truncate text-[9px] font-semibold uppercase tracking-wider text-(--neutral-color) md:text-[10px]">{category}</span>
                    <CardRating rate={rating.rate} count={rating.count} />
                </div>
                <Link href={`/products/${slug}`} className="focus-ring block">
                    <Heading level={3} weight="semibold" className="line-clamp-2 min-h-[2rem] text-xs text-(--foreground) group-hover:text-(--brand-color)">{name}</Heading>
                </Link>
                <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-bold sm:text-base">${price.toFixed(2)}</span>
                    <div className="md:hidden">
                        <Button variant={isAnimating || isInCart ? 'secondary' : 'primary'} size="sm" className="h-7 w-7 p-0" icon={isAnimating ? 'check' : 'plus'} onClick={handleAddToCart} />
                    </div>
                </div>
            </div>
        </article>
    );
}
