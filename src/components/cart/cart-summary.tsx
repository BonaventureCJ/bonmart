// src/components/cart/cart-summary.tsx

import { Button } from '@/components/ui/button/button';
import { Heading } from '@/components/ui/heading/heading';

/**
 * CartSummary Component
 * 
 * Typically used in the Cart drawer or mini-cart popover.
 * Refactored to use semantic design tokens and v4.1 shorthands.
 */
export const CartSummary = ({ subtotal }: { subtotal: number }) => (
    <div className="rounded-2xl bg-toggle-container-bg p-6">
        <Heading level={3} weight="bold" className="mb-4 text-foreground">
            Cart Total
        </Heading>

        <div className="flex justify-between text-xl font-bold mb-6 text-foreground">
            <span>Subtotal</span>
            <span className="text-brand-color">${subtotal.toFixed(2)}</span>
        </div>

        <Button
            href="/checkout"
            fullWidth
            variant="primary"
            size="lg"
            className="shadow-sm"
        >
            Proceed to Checkout
        </Button>

        <p className="mt-4 text-xs text-center text-neutral-color">
            Taxes and shipping calculated at checkout.
        </p>
    </div>
);

CartSummary.displayName = 'CartSummary';
