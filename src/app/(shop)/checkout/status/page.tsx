// src/app/(shop)/checkout/status/page.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectLatestOrder } from '@/features/orders/orders-selectors';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading/heading';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon/icon';
import { OrderSummaryCard } from '@/components/cart/order-summary-card';

/**
 * StatusContent Component
 */
function StatusContent() {
    const searchParams = useSearchParams();
    const status = searchParams.get('status');
    const isSuccess = status === 'success';
    const latestOrder = useAppSelector(selectLatestOrder);

    return (
        <main className="mx-auto max-w-3xl py-12 md:py-20">
            <header className="mb-12 flex flex-col items-center">
                <div
                    className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full ${isSuccess
                        ? 'bg-(--brand-color)/10 text-(--brand-color)'
                        : 'bg-(--error)/10 text-(--error)'
                        }`}
                    role="img"
                    aria-label={isSuccess ? "Success icon" : "Error icon"}
                >
                    <Icon
                        name={isSuccess ? "check" : "alertCircle"}
                        size={40}
                        variant={isSuccess ? "success" : "error"}
                    />
                </div>

                <Heading level={1} weight="bold" className="mb-3 text-center">
                    {isSuccess ? "Payment successful!" : "Payment failed"}
                </Heading>

                <p className="max-w-md text-center text-(--neutral-color)">
                    {isSuccess
                        ? "Your order is confirmed. A receipt and tracking details have been sent to your email."
                        : "We couldn't process your payment. Please check your card details or try a different payment method."}
                </p>
            </header>

            {isSuccess && latestOrder ? (
                <OrderSummaryCard
                    orderNumber={latestOrder.id}
                    date={latestOrder.date}
                    items={latestOrder.items}
                    subtotal={latestOrder.subtotal}
                    shipping={latestOrder.shipping}
                    tax={latestOrder.tax}
                    total={latestOrder.total}
                    status={latestOrder.status} // Added for visual tracking
                    className="shadow-xl"
                />
            ) : !isSuccess && (
                <section className="rounded-3xl border border-(--toggle-bg) bg-(--surface-raised) p-8 text-center">
                    <Heading level={4} weight="bold" className="mb-4">Common issues:</Heading>
                    <ul className="mb-8 inline-block space-y-2 text-left text-sm text-(--neutral-color)">
                        <li>• Incorrect card number or CVC</li>
                        <li>• Insufficient funds</li>
                        <li>• Bank-side blocks</li>
                    </ul>
                    <div className="flex justify-center">
                        <Button href="/checkout" variant="primary" size="lg">Return to Checkout</Button>
                    </div>
                </section>
            )}

            <nav className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button href="/products" variant={isSuccess ? "secondary" : "ghost"} size="lg">
                    {isSuccess ? "Continue Shopping" : "Back to Shop"}
                </Button>
                {isSuccess && (
                    <Button variant="ghost" size="lg" icon="printer" className="hidden sm:flex" onClick={() => window.print()}>
                        Print Receipt
                    </Button>
                )}
            </nav>
        </main>
    );
}

export default function CheckoutStatusPage() {
    return (
        <PageContainer>
            <Suspense fallback={<div>Verifying transaction...</div>}>
                <StatusContent />
            </Suspense>
        </PageContainer>
    );
}
