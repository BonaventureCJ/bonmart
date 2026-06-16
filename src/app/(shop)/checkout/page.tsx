// src/app/(shop)/checkout/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCart } from '@/features/cart/cart-slice';
import { selectCartItems, selectCartSubtotal } from '@/features/cart/cart-selectors';
import { addOrder } from '@/features/orders/orders-slice';
import { useCheckoutForm } from '@/hooks/use-checkout-form';
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

  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);

  // Hook-driven Validation State
  const { values, errors, touched, handleChange, handleBlur, validateAll } = useCheckoutForm();

  const shippingFee = subtotal > 200 || items.length === 0 ? 0 : 15.0;
  const tax = subtotal * 0.08;

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      router.push('/products');
      return;
    }

    // Trigger validation guard check
    if (!validateAll()) {
      const firstErrorElement = document.querySelector('[aria-invalid="true"]');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (firstErrorElement as HTMLElement).focus();
      }
      return;
    }

    setIsProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2500));

      const newOrder = {
        id: `BM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        date: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        subtotal,
        tax,
        shipping: shippingFee,
        total: subtotal + tax + shippingFee,
        status: 'processing' as const,
      };

      dispatch(addOrder(newOrder));
      dispatch(clearCart());
      router.push('/checkout/status?status=success');
    } catch {
      router.push('/checkout/status?status=error');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0 && !isProcessing) {
    return (
      <PageContainer>
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
          <div className="mb-6 rounded-full bg-(--surface-muted) p-6 text-(--neutral-color) opacity-20">
            <Icon name="cart" size={48} />
          </div>
          <Heading level={2} className="mb-4">Your bag is empty</Heading>
          <p className="mb-8 max-w-md text-(--neutral-color)">
            Add some eco-friendly items to your cart before checking out.
          </p>
          <Button href="/products" size="lg" variant="primary">
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
            className="h-10 w-10 !p-0"
          />
          <Heading level={1} weight="bold" align="left">Secure Checkout</Heading>
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Form Stack Container */}
          <div className="space-y-8 lg:col-span-7 xl:col-span-8">
            <CheckoutForm
              values={values}
              errors={errors}
              touched={touched}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <PaymentForm
              values={values}
              errors={errors}
              touched={touched}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24">
              <CartSummary
                shippingFee={shippingFee}
                tax={tax}
                onAction={handlePlaceOrder}
                buttonLabel="Place Order"
                isProcessing={isProcessing}
              />
              <div className="mt-6 flex flex-col items-center gap-3 px-2">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-(--brand-color)">
                  <Icon name="lock" size={12} />
                  <span>Secure 256-bit SSL Encrypted</span>
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-tighter text-(--neutral-color) opacity-40">
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
