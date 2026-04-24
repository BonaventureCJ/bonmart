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
    // Enterprise check: Disable action if cart has been emptied while on the page
    const isCartEmpty = subtotal === 0;

    return (
        <section
            aria-labelledby="summary-heading"
            className={clsx(
                'flex flex-col gap-6 rounded-3xl border border-(--toggle-bg) p-6 sm:p-8',
                'bg-(--surface-raised) shadow-sm transition-all duration-(--duration-long)',
                className
            )}
        >
            <Heading level={2} weight="bold" id="summary-heading" className="text-xl sm:text-2xl">
                Order Summary
            </Heading>

            <div className="flex flex-col gap-4 border-b border-(--toggle-bg) pb-6">
                <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-(--neutral-color)">Subtotal</span>
                    <span className="font-semibold text-(--foreground)">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-(--neutral-color)">Estimated Shipping</span>
                    <span className={clsx(
                        "font-semibold",
                        shippingFee === 0 ? "text-(--brand-color)" : "text-(--foreground)"
                    )}>
                        {shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}
                    </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-(--neutral-color)">Tax</span>
                    <span className="font-semibold text-(--foreground)">${tax.toFixed(2)}</span>
                </div>
            </div>

            <div className="flex items-center justify-between" aria-live="polite">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-black text-(--foreground)">
                    ${total.toFixed(2)}
                </span>
            </div>

            {/* Bonmart Brand Trust Area */}
            <div className="flex items-start gap-3 rounded-2xl bg-(--brand-color)/5 p-4 ring-1 ring-(--brand-color)/10">
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
                    disabled={isProcessing || isCartEmpty} // Safety check
                    className={clsx(isProcessing && "opacity-80")}
                >
                    {isProcessing ? "Processing..." : buttonLabel}
                </Button>

                {shippingFee > 0 && !isCartEmpty && (
                    <p className="text-center text-[10px] font-medium text-(--neutral-color) uppercase tracking-tighter opacity-70">
                        Add ${(200 - subtotal).toFixed(2)} more for free shipping
                    </p>
                )}
            </div>
        </section>
    );
}
