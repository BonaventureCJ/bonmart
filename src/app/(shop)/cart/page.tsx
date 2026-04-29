// src/app/(shop)/cart/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeFromCart, updateQuantity } from '@/features/cart/cart-slice';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading/heading';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon/icon';
import { CartItem } from '@/components/cart/cart-item';
import { CartSummary } from '@/components/cart/cart-summary';

/**
 * CartPage Component
 * Optimized for consistent vertical rhythm and enterprise state management.
 */
export default function CartPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.cart.items);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 200 || items.length === 0 ? 0 : 15.0;
  const tax = subtotal * 0.08;
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleUpdateQuantity = (id: number, currentQty: number, delta: number) => {
    const newQuantity = currentQty + delta;
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  // Empty State View: Centered within the LayoutWrapper's page-section
  if (items.length === 0) {
    return (
      <PageContainer>
        <section
          className="flex min-h-[50vh] flex-col items-center justify-center text-center"
          aria-labelledby="empty-cart-heading"
        >
          <div className="mb-6 rounded-full bg-(--surface-muted) p-6">
            <Icon name="cart" size={48} className="text-(--neutral-color) opacity-40" />
          </div>
          <Heading level={2} weight="bold" id="empty-cart-heading" className="mb-2">
            Your cart is empty
          </Heading>
          <p className="mb-8 text-(--neutral-color)">
            Looks like you haven&apos;t added any sustainable goodies yet.
          </p>
          <Button variant="primary" size="lg" href="/products">
            Start Shopping
          </Button>
        </section>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="flex flex-col">
        {/* Header: Centered counter with standardized spacing */}
        <header className="mb-10 flex flex-col gap-2 text-center">
          <Heading level={1} weight="bold">Shopping Cart</Heading>
          <p className="text-sm font-medium text-(--brand-color) tracking-wider">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} ready for checkout
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Cart Items List */}
          <section className="lg:col-span-7 xl:col-span-8">
            <div className="flex flex-col border-t border-(--toggle-bg)" role="list">
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

          {/* Sticky Summary Aside */}
          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24">
              <CartSummary
                subtotal={subtotal}
                shippingFee={shippingFee}
                tax={tax}
                onAction={() => router.push('/checkout')}
                buttonLabel="Proceed to Checkout"
              />
            </div>
          </aside>
        </div>
      </div>
    </PageContainer>
  );
}
