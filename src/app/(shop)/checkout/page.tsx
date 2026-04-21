//src/app/(shop)/checkout/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CART_ITEMS } from '@/data/cart-data';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';
import { CartSummary } from '@/components/cart/cart-summary';
import { CheckoutForm } from '@/components/checkout/checkout-form';

export default function CheckoutPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = CART_ITEMS.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 200 ? 0 : 15.0;
  const tax = subtotal * 0.08;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate real-world payment API latency
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setIsProcessing(false);
    router.push('/checkout/success');
  };

  return (
    <PageContainer>
      <main className="py-8 md:py-12">
        <header className="mb-10 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-(--toggle-bg) hover:bg-(--surface-muted)"
            aria-label="Go back"
          >
            <Icon name="chevronLeft" size={20} className="group-hover:text-(--brand-color)" />
          </button>
          <Heading level={1} weight="bold">Secure Checkout</Heading>
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 xl:col-span-8">
            <CheckoutForm />
          </div>

          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24">
              <CartSummary
                subtotal={subtotal}
                shippingFee={shippingFee}
                tax={tax}
                onAction={handlePlaceOrder}
                buttonLabel="Place Order"
                isProcessing={isProcessing}
              />
            </div>
          </aside>
        </div>
      </main>
    </PageContainer>
  );
}

