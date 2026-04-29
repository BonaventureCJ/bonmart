// src/app/(shop)/wishlist/page.tsx

'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleWishlist } from '@/features/wishlist/wishlist-slice';
import { addToCart } from '@/features/cart/cart-slice';
import type { Product } from '@/data/mock-products';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading/heading';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon/icon';
import { WishlistItem } from '@/components/wishlist/wishlist-item';

/**
 * WishlistPage Component
 * Optimized for standardized vertical rhythm and enterprise state management.
 */
export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.wishlist);

  const handleRemove = (product: Product) => {
    dispatch(toggleWishlist(product));
  };

  const handleMoveToCart = (product: Product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    dispatch(toggleWishlist(product));
  };

  // Empty State View: Leveraging min-height to center content within the page-section
  if (items.length === 0) {
    return (
      <PageContainer>
        <section
          className="flex min-h-[50vh] flex-col items-center justify-center text-center"
          aria-labelledby="empty-wishlist-heading"
        >
          <div className="mb-6 rounded-full bg-(--surface-muted) p-6">
            <Icon name="heart" size={48} className="text-(--neutral-color) opacity-50" />
          </div>
          <Heading level={2} weight="bold" id="empty-wishlist-heading" className="mb-2">
            Your wishlist is empty
          </Heading>
          <p className="mb-8 text-(--neutral-color)">
            Save items you love to find them easily later.
          </p>
          <Button href="/products" variant="primary" size="lg">
            Browse Products
          </Button>
        </section>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="mx-auto max-w-4xl">
        {/* Header: Simplified spacing as LayoutWrapper handles page-section padding */}
        <header className="mb-10 flex flex-col gap-2">
          <Heading level={1} weight="bold">
            My Wishlist
          </Heading>
          <p className="text-center text-sm font-medium text-(--brand-color) tracking-wider">
            {items.length} {items.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </header>


        {/* Wishlist Items List */}
        <section
          className="flex flex-col border-t border-(--toggle-bg)"
          aria-label="Wishlist items"
        >
          {items.map((item) => (
            <WishlistItem
              key={item.id}
              item={item}
              onRemove={() => handleRemove(item)}
              onMoveToCart={() => handleMoveToCart(item)}
            />
          ))}
        </section>
      </div>
    </PageContainer>
  );
}
