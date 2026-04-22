// src/components/cart/cart-summary.tsx

'use client';

import { clsx } from 'clsx';
import { Button } from '@/components/ui/button/button';
import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';

interface CartSummaryProps {
    subtotal: number;
    shippingFee: number;
    tax: number;
    onAction: () => void;
    buttonLabel?: string;
    isProcessing?: boolean;
    className?: string;
}

export function CartSummary({
    subtotal,
    shippingFee,
    tax,
    onAction,
    buttonLabel = "Proceed to Checkout",
    isProcessing = false,
    className,
}: CartSummaryProps) {
    const total = subtotal + shippingFee + tax;

    return (
        <section
            className={clsx(
                'flex flex-col gap-6 rounded-3xl border border-(--toggle-bg) p-6 sm:p-8',
                'bg-(--surface-raised) shadow-sm',
                className
            )}
        >
            <Heading level={2} weight="bold" className="text-xl sm:text-2xl">
                Order Summary
            </Heading>

            <div className="flex flex-col gap-4 border-b border-(--toggle-bg) pb-6">
                <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-(--neutral-color)">Subtotal</span>
                    <span className="font-medium text-(--foreground)">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-(--neutral-color)">Estimated Shipping</span>
                    <span className="font-medium text-(--foreground)">
                        {shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}
                    </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-(--neutral-color)">Tax</span>
                    <span className="font-medium text-(--foreground)">${tax.toFixed(2)}</span>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-black text-(--foreground)">
                    ${total.toFixed(2)}
                </span>
            </div>

            <div className="rounded-2xl bg-(--brand-color)/5 p-4 flex items-start gap-3">
                <Icon name="globe" size={20} className="shrink-0 text-(--brand-color)" />
                <p className="text-xs leading-relaxed text-(--neutral-color)">
                    By completing this order, you&apos;re supporting
                    <span className="font-bold text-(--brand-color)"> carbon-neutral </span>
                    shipping and eco-conscious manufacturers.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    icon={isProcessing ? "loader" : "arrowRight"}
                    iconPlacement="right"
                    onClick={onAction}
                    disabled={isProcessing}
                >
                    {isProcessing ? "Processing..." : buttonLabel}
                </Button>
            </div>
        </section>
    );
}
