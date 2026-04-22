// src/app/(shop)/checkout/status/page.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react'; // 1. Import Suspense
import Link from 'next/link';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading/heading';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon/icon';
import { OrderSummaryCard } from '@/components/cart/order-summary-card';
import { CART_ITEMS } from '@/data/cart-data';

// 2. Create a separate component for the content
function StatusContent() {
    const searchParams = useSearchParams();
    const status = searchParams.get('status');
    const isSuccess = status === 'success';

    const orderData = {
        orderNumber: 'BM-8829-01',
        date: new Date().toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' }),
        subtotal: CART_ITEMS.reduce((acc, item) => acc + item.price * item.quantity, 0),
        shipping: 0,
        tax: 12.40,
    };

    return (
        <main className="mx-auto max-w-3xl py-12 md:py-20">
            <section className="mb-12 flex flex-col items-center">
                <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full ${isSuccess ? 'bg-(--brand-color)/10 text-(--brand-color)' : 'bg-(--error)/10 text-(--error)'
                    }`}>
                    <Icon name={isSuccess ? "check" : "alertCircle"} size={40} />
                </div>

                <Heading level={1} weight="bold" align="center" className="mb-3">
                    {isSuccess ? "Payment successful!" : "Payment failed"}
                </Heading>

                <p className="text-(--neutral-color) max-w-md text-center">
                    {isSuccess
                        ? "Your order is confirmed. A receipt and tracking details have been sent to your email."
                        : "We couldn't process your payment. Please check your card details or try a different payment method."}
                </p>
            </section>

            {isSuccess ? (
                <OrderSummaryCard
                    orderNumber={orderData.orderNumber}
                    date={orderData.date}
                    items={CART_ITEMS.map(item => ({
                        id: String(item.id),
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price
                    }))}
                    subtotal={orderData.subtotal}
                    shipping={orderData.shipping}
                    tax={orderData.tax}
                    total={orderData.subtotal + orderData.tax}
                    className="shadow-xl"
                />
            ) : (
                <div className="rounded-3xl border border-(--toggle-bg) p-8 text-center bg-(--surface-raised)">
                    <Heading level={4} weight="bold" align="center" className="mb-4">
                        Common issues:
                    </Heading>
                    <ul className="text-sm text-(--neutral-color) space-y-2 mb-8 inline-block text-left">
                        <li>• Incorrect card number or CVC</li>
                        <li>• Insufficient funds in the account</li>
                        <li>• Bank-side transaction blocks</li>
                    </ul>
                    <div className="flex justify-center">
                        <Link href="/checkout">
                            <Button variant="primary" size="lg">Return to Checkout</Button>
                        </Link>
                    </div>
                </div>
            )}

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/products">
                    <Button variant={isSuccess ? "secondary" : "ghost"} size="lg">
                        {isSuccess ? "Continue Shopping" : "Back to Shop"}
                    </Button>
                </Link>
            </div>
        </main>
    );
}

// 3. The default export just wraps the content in Suspense
export default function CheckoutStatusPage() {
    return (
        <PageContainer>
            <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
                <StatusContent />
            </Suspense>
        </PageContainer>
    );
}
