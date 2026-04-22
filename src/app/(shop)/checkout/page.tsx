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
import { PaymentForm } from '@/components/checkout/payment-form';

export default function CheckoutPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  // Financial calculations
  const subtotal = CART_ITEMS.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 200 ? 0 : 15.0;
  const tax = subtotal * 0.08;

  /**
   * Handles the order placement simulation.
   * Redirects to the status page with a success flag.
   */
  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      // Simulate real-world payment API latency
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // In a real application, logic here would determine success vs failure
      const isSuccessful = true;

      if (isSuccessful) {
        router.push('/checkout/status?status=success');
      } else {
        router.push('/checkout/status?status=error');
      }
    } catch (error) {
      router.push('/checkout/status?status=error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PageContainer>
      <main className="py-8 md:py-12">
        <header className="mb-10 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            /* Transition classes removed to prevent theme lag during mode switching */
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-(--toggle-bg) hover:bg-(--surface-muted)"
            aria-label="Go back"
          >
            <Icon name="arrowLeft" size={20} className="group-hover:text-(--brand-color)" />
          </button>
          <Heading level={1} weight="bold">Secure Checkout</Heading>
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Content: Shipping & Payment */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            <CheckoutForm />
            <PaymentForm />
          </div>

          {/* Sticky Summary: Order Breakdown & Primary Action */}
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
              <p className="mt-4 px-2 text-center text-[10px] text-(--neutral-color) uppercase tracking-widest opacity-60">
                Taxes and shipping calculated based on Nigeria region
              </p>
            </div>
          </aside>
        </div>
      </main>
    </PageContainer>
  );
}


