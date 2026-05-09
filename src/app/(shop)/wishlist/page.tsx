// src/components/wishlist/wishlist-item.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui/icon/icon';
import { Button } from '@/components/ui/button/button';
import { Heading } from '@/components/ui/heading/heading';
import { useAppDispatch } from '@/store/hooks';
import { toggleWishlist } from '@/features/wishlist/wishlist-slice';
import { addToCart } from '@/features/cart/cart-slice';
import type { Product } from '@/data/mock-products';

interface WishlistItemProps {
  item: Product;
  className?: string;
}

export function WishlistItem({ item, className }: WishlistItemProps) {
  const { id, name, price, imageUrl, slug, isEcoFriendly } = item;
  const dispatch = useAppDispatch();

  // Self-contained logic for better maintainability
  const handleRemove = () => {
    dispatch(toggleWishlist(item));
  };

  const handleMoveToCart = () => {
    dispatch(addToCart({ ...item, quantity: 1 }));
    dispatch(toggleWishlist(item));
  };

  return (
    <article
      className={clsx(
        'group flex items-center gap-4 border-b border-(--toggle-bg) bg-(--background) py-6 transition-colors duration-(--duration-long) last:border-0',
        className
      )}
      role="listitem"
    >
      {/* Product Image */}
      <div className="relative aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-(--surface-muted)/30 sm:h-24 sm:w-24">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="96px"
          className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content Info */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/products/${slug}`} className="focus-ring rounded-sm">
            <Heading
              level={6}
              weight="semibold"
              className="line-clamp-1 text-sm transition-colors hover:text-(--brand-color) sm:text-base"
            >
              {name}
            </Heading>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            icon="trash"
            className="-mr-2 -mt-1 shrink-0 text-(--neutral-color) hover:text-(--error)"
            ariaLabel={`Remove ${name} from wishlist`}
            onClick={handleRemove}
          />
        </div>

        {/* Eco Indicator - Syncing with Product/Cart logic */}
        {isEcoFriendly && (
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-(--brand-color)">
            <Icon name="leaf" size={10} />
            <span>Eco Choice</span>
          </div>
        )}

        <div className="mt-2 flex items-center justify-between gap-4">
          <span className="text-sm font-bold text-(--foreground) tabular-nums sm:text-base">
            ${price.toFixed(2)}
          </span>

          <Button
            variant="primary"
            size="sm"
            icon="cart"
            onClick={handleMoveToCart}
            className="h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm"
          >
            Move to Cart
          </Button>
        </div>
      </div>
    </article>
  );
}
