//src/app/(shop)/cart/page.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CART_ITEMS as INITIAL_CART } from '@/data/cart-data';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading/heading';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon/icon';
import { CartItem } from '@/components/cart/cart-item';
import { CartSummary } from '@/components/cart/cart-summary';

export default function CartPage() {
  const [items, setItems] = useState(INITIAL_CART);

  const handleUpdateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout with items:', items);
    // Redirect logic would go here
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 200 || items.length === 0 ? 0 : 15.0; // Free shipping over $200
  const tax = subtotal * 0.08; // 8% Tax example

  if (items.length === 0) {
    return (
      <PageContainer>
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="mb-6 rounded-full bg-(--surface-muted) p-6">
            <Icon name="cart" size={48} className="text-(--neutral-color)" />
          </div>
          <Heading level={2} className="mb-2">Your cart is empty</Heading>
          <p className="mb-8 text-(--neutral-color)">Looks like you haven&apos;t added anything to your cart yet.</p>
          <Link href="/products">
            <Button variant="primary" size="lg">Start Shopping</Button>
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <main className="py-8 md:py-12">
        <header className="mb-10 flex flex-col gap-2">
          <Heading level={1} weight="bold">Shopping Cart</Heading>
          <p className="text-(--neutral-color) font-medium">
            Review your {items.length} {items.length === 1 ? 'item' : 'items'} before checkout
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* List of Cart Items */}
          <section className="lg:col-span-7 xl:col-span-8">
            <div className="flex flex-col border-t border-(--toggle-bg)">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </section>

          {/* Sticky Summary Card */}
          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24">
              <CartSummary
                subtotal={subtotal}
                shippingFee={shippingFee}
                tax={tax}
                onCheckout={handleCheckout}
              />
            </div>
          </aside>
        </div>
      </main>
    </PageContainer>
  );
}
