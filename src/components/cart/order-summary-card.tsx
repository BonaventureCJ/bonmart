// src/components/cart/order-summary-card.tsx

import { Heading } from '@/components/ui/heading/heading';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon/icon';
import { clsx } from 'clsx';

interface OrderSummaryProps {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    isLoading?: boolean;
    className?: string;
}

export const OrderSummaryCard = ({
    subtotal,
    shipping,
    tax,
    total,
    isLoading,
    className
}: OrderSummaryProps) => (
    <section className={clsx(
        "sticky top-24 rounded-2xl border border-toggle-bg bg-surface-raised p-6 shadow-sm",
        className
    )}>
        <Heading level={3} weight="bold" className="mb-6 text-foreground">
            Order Summary
        </Heading>

        <div className="space-y-4 text-sm font-medium">
            <div className="flex justify-between text-neutral-color">
                <span>Subtotal</span>
                <span className="text-foreground">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-neutral-color">
                <span>Shipping Estimate</span>
                <span className="text-foreground">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
            </div>
            <div className="flex justify-between text-neutral-color">
                <span>Estimated Tax</span>
                <span className="text-foreground">${tax.toFixed(2)}</span>
            </div>

            {/* Divider and Total */}
            <div className="pt-4 border-t border-toggle-bg flex justify-between text-lg font-bold text-foreground">
                <span>Order Total</span>
                <span className="text-brand-color">${total.toFixed(2)}</span>
            </div>
        </div>

        <Button
            variant="primary"
            fullWidth
            size="lg"
            className="mt-8 shadow-sm transition-transform active:scale-[0.98]"
            loading={isLoading}
        >
            Complete Purchase
        </Button>

        {/* Secure Checkout Badge - Replaced text-brand-color with semantic variable */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-brand-color font-bold uppercase tracking-wider">
            <Icon name="check" className="h-4 w-4" />
            Secure Environmental Checkout
        </div>
    </section>
);
