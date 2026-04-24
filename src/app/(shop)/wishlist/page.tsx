//src/app/(shop)/wishlist/page.tsx
'use client';

import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleWishlist } from '@/features/wishlist/wishlist-slice';
import { addToCart } from '@/features/cart/cart-slice';
import type { Product } from '@/data/mock-products';

import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading/heading';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon/icon';
import { WishlistItem } from '@/components/wishlist/wishlist-item';

export default function WishlistPage() {
  const dispatch = useAppDispatch();

  // Access items directly from the Redux store
  const { items } = useAppSelector((state) => state.wishlist);

  const handleRemove = (product: Product) => {
    // toggleWishlist removes the item if it already exists in state
    dispatch(toggleWishlist(product));
  };

  const handleMoveToCart = (product: Product) => {
    // Add to cart with a default quantity of 1
    dispatch(addToCart({ ...product, quantity: 1 }));
    // Remove from wishlist after moving
    dispatch(toggleWishlist(product));
  };

  // Empty State View
  if (items.length === 0) {
    return (
      <PageContainer>
        <section
          className="flex min-h-[60vh] flex-col items-center justify-center text-center"
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
          <Link href="/products" className="focus-ring rounded-lg">
            <Button variant="primary" size="lg">
              Browse Products
            </Button>
          </Link>
        </section>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <main className="mx-auto max-w-4xl py-8 md:py-12">
        <header className="mb-10 flex flex-col gap-2">
          <Heading level={1} weight="bold">
            My Wishlist
          </Heading>
          <p className="text-sm font-medium text-(--brand-color)">
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
              // These callbacks now receive correctly typed Product objects
              onRemove={() => handleRemove(item)}
              onMoveToCart={() => handleMoveToCart(item)}
            />
          ))}
        </section>
      </main>
    </PageContainer>
  );
}
