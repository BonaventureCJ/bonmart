'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCart } from '@/features/cart/cart-slice';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';
import { Button } from '@/components/ui/button/button';
import { CartSummary } from '@/components/cart/cart-summary';
import { CheckoutForm } from '@/components/checkout/checkout-form';
import { PaymentForm } from '@/components/checkout/payment-form';

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  // 1. Fetch live cart items from Redux
  const items = useAppSelector((state) => state.cart.items);

  // 2. Financial calculations based on live state
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 200 || items.length === 0 ? 0 : 15.0;
  const tax = subtotal * 0.08;

  /**
   * Handles the order placement simulation.
   */
  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      router.push('/products');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate real-world payment API latency
      await new Promise((resolve) => setTimeout(resolve, 2500));

      const isSuccessful = true;

      if (isSuccessful) {
        dispatch(clearCart());
        router.push('/checkout/status?status=success');
      } else {
        router.push('/checkout/status?status=error');
      }
    } catch {
      router.push('/checkout/status?status=error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Redirect if user tries to access checkout with an empty cart
  if (items.length === 0 && !isProcessing) {
    return (
      <PageContainer>
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
          <Heading level={2} className="mb-4">Your bag is empty</Heading>
          <p className="mb-8 text-(--neutral-color) max-w-md">
            Add some eco-friendly items to your cart before checking out.
          </p>
          <Button
            href="/products"
            size="lg"
            variant="primary"
          >
            Go to Shop
          </Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <main className="py-8 md:py-12">
        <header className="mb-10 flex items-center gap-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.back()}
            icon="arrowLeft"
            ariaLabel="Go back"
            className="h-10 w-10 !p-0" // Specific override for circular icon-only style
          />
          <Heading level={1} weight="bold" align="left">Secure Checkout</Heading>
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Unified Shipping and Payment Forms */}
          <div className="space-y-8 lg:col-span-7 xl:col-span-8">
            <CheckoutForm />
            <PaymentForm />
          </div>

          {/* Right Column: Sticky Order Summary */}
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
              {/* Trust Badge Section */}
              <div className="mt-6 flex flex-col items-center gap-3 px-2">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-(--brand-color)">
                  <Icon name="lock" size={12} />
                  <span>Secure 256-bit SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-4 opacity-40 grayscale transition-all hover:opacity-100 hover:grayscale-0">
                  <p className="text-[10px] text-(--neutral-color) uppercase font-semibold tracking-tighter">
                    Powered by Bonmart Enterprise
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </PageContainer>
  );
}
