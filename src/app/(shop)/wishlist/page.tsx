//src/app/(shop)/wishlist/page.tsx

'use client';

import { useState } from 'react';
import { WISHLIST_ITEMS as INITIAL_DATA } from '@/data/wishlist-data';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading/heading';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon/icon';
import { WishlistItem } from '@/components/wishlist/wishlist-item';
import Link from 'next/link';

export default function WishlistPage() {
  const [items, setItems] = useState(INITIAL_DATA);

  const handleRemove = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMoveToCart = (id: number) => {
    console.log(`Moving product ${id} to cart...`);
    // Logic for RTK Query or Context will go here later
    handleRemove(id); // Usually items are removed or kept based on settings
  };

  if (items.length === 0) {
    return (
      <PageContainer>
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="mb-6 rounded-full bg-(--surface-muted) p-6">
            <Icon name="heart" size={48} className="text-(--neutral-color)" />
          </div>
          <Heading level={2} className="mb-2">Your wishlist is empty</Heading>
          <p className="mb-8 text-(--neutral-color)">Save items you love to find them easily later.</p>
          <Link href="/products">
            <Button variant="primary" size="lg">Browse Products</Button>
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <main className="mx-auto max-w-4xl py-8 md:py-12">
        <header className="mb-10">
          <Heading level={1} weight="bold">My Wishlist</Heading>
          <p className="text-(--neutral-color)">{items.length} items saved for later</p>
        </header>

        <section className="flex flex-col border-t border-(--toggle-bg)">
          {items.map((item) => (
            <WishlistItem
              key={item.id}
              item={item}
              onRemove={handleRemove}
              onMoveToCart={handleMoveToCart}
            />
          ))}
        </section>
      </main>
    </PageContainer>
  );
}
