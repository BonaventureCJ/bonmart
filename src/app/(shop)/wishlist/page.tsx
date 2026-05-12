// src/app/(shop)/wishlist/page.tsx

'use client';

import { useAppSelector } from '@/store/hooks';
import { selectWishlistItems, selectWishlistCount } from '@/features/wishlist/wishlist-selectors';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading/heading';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon/icon';
import { WishlistItem } from '@/components/wishlist/wishlist-item';

/**
 * WishlistPage Component
 * 
 * Displays saved items using normalized state logic.
 * Optimized with createEntityAdapter selectors for referential stability.
 */
export default function WishlistPage() {
  /**
   * Normalized State Selection
   * Performance: selectWishlistItems leverages the adapter's selectAll for O(1) collection access.
   */
  const items = useAppSelector(selectWishlistItems);
  const totalCount = useAppSelector(selectWishlistCount);

  // Empty State View
  if (totalCount === 0) {
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
        <header className="mb-10 flex flex-col gap-2 text-center">
          <Heading level={1} weight="bold">
            My Wishlist
          </Heading>
          <p className="text-sm font-medium text-(--brand-color) uppercase tracking-wider">
            <span className="tabular-nums">{totalCount}</span> {totalCount === 1 ? 'item' : 'items'} saved for later
          </p>
        </header>

        {/* Wishlist Items List - Maps through normalized items */}
        <section
          className="flex flex-col border-t border-(--toggle-bg)"
          role="list"
          aria-label="Wishlist items"
        >
          {items.map((item) => (
            <WishlistItem
              key={item.id}
              item={item}
            />
          ))}
        </section>
      </div>
    </PageContainer>
  );
}
