// src/app/(shop)/checkout/status/page.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';
import Link from 'next/link';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading/heading';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon/icon';
import { OrderSummaryCard } from '@/components/cart/order-summary-card';
// Import the actual CartItem type for strict checking
import type { CartItem } from '@/features/cart/cart-slice';

function StatusContent() {
    const searchParams = useSearchParams();
    const status = searchParams.get('status');
    const isSuccess = status === 'success';

    /**
     * Enterprise Logic: 
     * We type this specifically as an array of CartItem picks to 
     * ensure it satisfies the OrderSummaryCard requirements.
     */
    const orderDetails = useMemo(() => {
        // Defining the shape clearly to avoid 'id' type mismatch
        const items: Pick<CartItem, 'id' | 'name' | 'quantity' | 'price'>[] = [
            { id: 1, name: 'Fjallraven - Foldsack No. 1', quantity: 1, price: 109.95 },
            { id: 2, name: 'Mens Casual Premium T-Shirt', quantity: 2, price: 22.30 },
        ];

        return {
            orderNumber: 'BM-8829-01',
            date: new Date().toLocaleDateString('en-NG', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }),
            items,
            shipping: 0,
            tax: 12.40,
        };
    }, []);

    const subtotal = orderDetails.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = subtotal + orderDetails.tax + orderDetails.shipping;

    return (
        <main className="mx-auto max-w-3xl py-12 md:py-20">
            <header className="mb-12 flex flex-col items-center">
                <div
                    className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full transition-colors ${isSuccess
                        ? 'bg-(--brand-color)/10 text-(--brand-color)'
                        : 'bg-(--error)/10 text-(--error)'
                        }`}
                    role="img"
                    aria-label={isSuccess ? "Success icon" : "Error icon"}
                >
                    {/* Updated to use variant="success" for the checkmark */}
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

            {isSuccess ? (
                <OrderSummaryCard
                    orderNumber={orderDetails.orderNumber}
                    date={orderDetails.date}
                    items={orderDetails.items}
                    subtotal={subtotal}
                    shipping={orderDetails.shipping}
                    tax={orderDetails.tax}
                    total={total}
                    className="shadow-xl"
                />
            ) : (
                <section
                    className="rounded-3xl border border-(--toggle-bg) bg-(--surface-raised) p-8 text-center"
                    aria-labelledby="failure-reasons"
                >
                    <Heading level={4} weight="bold" id="failure-reasons" className="mb-4">
                        Common issues:
                    </Heading>
                    <ul className="mb-8 inline-block space-y-2 text-left text-sm text-(--neutral-color)">
                        <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-(--error)" />
                            Incorrect card number or CVC
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-(--error)" />
                            Insufficient funds in the account
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-(--error)" />
                            Bank-side transaction blocks
                        </li>
                    </ul>
                    <div className="flex justify-center">
                        <Link href="/checkout" className="focus-ring rounded-lg">
                            <Button variant="primary" size="lg">Return to Checkout</Button>
                        </Link>
                    </div>
                </section>
            )}

            <nav className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/products" className="focus-ring rounded-lg">
                    <Button variant={isSuccess ? "secondary" : "ghost"} size="lg">
                        {isSuccess ? "Continue Shopping" : "Back to Shop"}
                    </Button>
                </Link>
                {isSuccess && (
                    <Button
                        variant="ghost"
                        size="lg"
                        icon="printer"
                        className="hidden sm:flex"
                        onClick={() => typeof window !== 'undefined' && window.print()}
                    >
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
            <Suspense fallback={
                <div className="flex py-20 items-center justify-center gap-3 text-(--neutral-color)">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-(--brand-color) border-t-transparent" />
                    <span>Verifying transaction...</span>
                </div>
            }>
                <StatusContent />
            </Suspense>
        </PageContainer>
    );
}
