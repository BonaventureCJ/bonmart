// src/components/cart/cart-summary.tsx

'use client';

import { clsx } from 'clsx';
import { Button } from '@/components/ui/button/button';
import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';
import { useAppSelector } from '@/store/hooks';
import { selectCartSubtotal, selectEcoFriendlyCartCount } from '@/features/cart/cart-selectors';

interface CartSummaryProps {
    shippingFee: number;
    tax: number;
    onAction: () => void;
    buttonLabel?: string;
    isProcessing?: boolean;
    className?: string;
}

/**
 * Enterprise Cart Summary Component.
 * Powered by normalized selectors for high-performance financial and eco-metric calculation.
 */
export function CartSummary({
    shippingFee,
    tax,
    onAction,
    buttonLabel = "Proceed to Checkout",
    isProcessing = false,
    className,
}: CartSummaryProps) {
    /** 
     * Normalized Selectors
     * Performance: Utilizes memoized selectors derived from EntityState for O(1) derived data.
     */
    const subtotal = useAppSelector(selectCartSubtotal);
    const ecoCount = useAppSelector(selectEcoFriendlyCartCount);

    const total = subtotal + shippingFee + tax;
    // Enterprise check: Disable action if cart has been emptied (verified via normalized total)
    const isCartEmpty = subtotal === 0;

    return (
        <section
            aria-labelledby="summary-heading"
            className={clsx(
                'flex flex-col gap-6 rounded-3xl border border-(--toggle-bg) bg-(--surface-raised) p-6 shadow-sm transition-all duration-(--duration-long) sm:p-8',
                className
            )}
        >
            <Heading level={2} weight="bold" id="summary-heading" className="text-xl sm:text-2xl">
                Order Summary
            </Heading>

            <div className="flex flex-col gap-4 border-b border-(--toggle-bg) pb-6">
                <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-(--neutral-color)">Subtotal</span>
                    <span className="font-semibold text-(--foreground) tabular-nums">
                        ${subtotal.toFixed(2)}
                    </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-(--neutral-color)">Estimated Shipping</span>
                    <span className={clsx(
                        "font-semibold tabular-nums",
                        shippingFee === 0 ? "text-(--brand-color)" : "text-(--foreground)"
                    )}>
                        {shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}
                    </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-(--neutral-color)">Tax</span>
                    <span className="font-semibold text-(--foreground) tabular-nums">
                        ${tax.toFixed(2)}
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-between" aria-live="polite">
                <span className="text-lg font-bold text-(--foreground)">Total</span>
                <span className="text-2xl font-black text-(--foreground) tabular-nums">
                    ${total.toFixed(2)}
                </span>
            </div>

            {/* Bonmart Brand Trust Area - Dynamic Green Initiative Badge */}
            <div className={clsx(
                "flex items-start gap-3 rounded-2xl p-4 ring-1 transition-colors duration-500",
                ecoCount > 0
                    ? "bg-(--brand-color)/10 ring-(--brand-color)/20"
                    : "bg-(--surface-muted)/30 ring-(--toggle-bg)"
            )}>
                <Icon
                    name={ecoCount > 0 ? "leaf" : "globe"}
                    size={20}
                    className={clsx("shrink-0", ecoCount > 0 ? "text-(--brand-color)" : "text-(--neutral-color)")}
                />
                <div className="flex flex-col gap-1">
                    <p className="text-xs leading-relaxed text-(--neutral-color)">
                        {ecoCount > 0 ? (
                            <>
                                You have <span className="font-bold text-(--brand-color)">{ecoCount} eco-friendly</span> items! Your purchase supports sustainable manufacturing.
                            </>
                        ) : (
                            <>
                                By completing this order, you&apos;re supporting
                                <span className="font-bold text-(--brand-color)"> carbon-neutral </span>
                                shipping.
                            </>
                        )}
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    icon={isProcessing ? "loader" : "arrowRight"}
                    iconPlacement="right"
                    onClick={onAction}
                    disabled={isProcessing || isCartEmpty}
                    className={clsx(isProcessing && "opacity-80")}
                >
                    {isProcessing ? "Processing..." : buttonLabel}
                </Button>

                {shippingFee > 0 && !isCartEmpty && subtotal < 200 && (
                    <p className="text-center text-[10px] font-medium text-(--neutral-color) uppercase tracking-tighter opacity-70">
                        Add ${(200 - subtotal).toFixed(2)} more for free shipping
                    </p>
                )}
            </div>
        </section>
    );
}
