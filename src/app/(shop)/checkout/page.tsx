'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// RTK Hooks and Actions
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCart } from '@/features/cart/cart-slice';

import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';
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
    // Prevent processing if cart is empty (safety check)
    if (items.length === 0) {
      router.push('/products');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate real-world payment API latency
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // In a real app, this is where you'd call your API
      const isSuccessful = true;

      if (isSuccessful) {
        // 3. Clear the cart state upon success before navigating
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
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <Heading level={2} className="mb-4">Your bag is empty</Heading>
          <p className="mb-8 text-(--neutral-color)">Add some eco-friendly items to your cart before checking out.</p>
          <button
            onClick={() => router.push('/products')}
            className="rounded-full bg-(--brand-color) px-8 py-3 font-bold text-white transition-transform hover:scale-105"
          >
            Go to Shop
          </button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <main className="py-8 md:py-12">
        <header className="mb-10 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-(--toggle-bg) transition-colors hover:bg-(--surface-muted)"
            aria-label="Go back"
          >
            <Icon name="arrowLeft" size={20} className="group-hover:text-(--brand-color)" />
          </button>
          <Heading level={1} weight="bold">Secure Checkout</Heading>
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
              <div className="mt-4 flex flex-col items-center gap-2 px-2 opacity-60">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-(--brand-color)">
                  <Icon name="check" size={12} />
                  <span>Secure transaction</span>
                </div>
                <p className="text-[10px] text-(--neutral-color) uppercase tracking-widest">
                  Powered by Bonmart Enterprise
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </PageContainer>
  );
}
