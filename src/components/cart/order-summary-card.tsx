// src/components/cart/order-summary-card.tsx

'use client';

import { clsx } from 'clsx';
import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';
// Import the CartItem type to ensure data structure alignment
import type { CartItem } from '@/features/cart/cart-slice';

/**
 * Enterprise Order Summary Card for Bonmart.
 * Used for post-purchase receipts and Order History.
 */
export interface OrderSummaryCardProps {
    orderNumber: string;
    date: string;
    // Aligning with our RTK CartItem structure for easier data passing
    items: Array<Pick<CartItem, 'id' | 'name' | 'quantity' | 'price'>>;
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    className?: string;
}

export function OrderSummaryCard({
    orderNumber,
    date,
    items,
    subtotal,
    shipping,
    tax,
    total,
    className,
}: OrderSummaryCardProps) {
    return (
        <article
            className={clsx(
                'flex flex-col overflow-hidden rounded-3xl border border-(--toggle-bg)',
                'bg-(--surface-raised) shadow-sm transition-all duration-(--duration-long)',
                className
            )}
        >
            {/* Header: Order Metadata */}
            <header className="border-b border-(--toggle-bg) bg-(--surface-muted)/20 p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-(--neutral-color) opacity-60">
                            Order Reference
                        </p>
                        <Heading level={4} weight="bold" className="text-lg tabular-nums">
                            #{orderNumber}
                        </Heading>
                    </div>
                    <div className="text-right space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-(--neutral-color) opacity-60">
                            Transaction Date
                        </p>
                        <p className="text-sm font-semibold text-(--foreground)">{date}</p>
                    </div>
                </div>
            </header>

            {/* Body: Item List */}
            <div className="flex flex-col gap-6 p-6">
                <section aria-label="Purchased items">
                    <div className="flex flex-col gap-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex justify-between items-start gap-4 text-sm">
                                <p className="text-(--neutral-color) leading-tight">
                                    <span className="font-bold text-(--foreground) tabular-nums">{item.quantity}x</span> {item.name}
                                </p>
                                <span className="font-semibold text-(--foreground) whitespace-nowrap tabular-nums">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="h-px w-full bg-(--toggle-bg)/50" aria-hidden="true" />

                {/* Financial Breakdown */}
                <div className="flex flex-col gap-2.5" role="list">
                    <div className="flex justify-between text-sm">
                        <span className="text-(--neutral-color)">Subtotal</span>
                        <span className="font-medium text-(--foreground) tabular-nums">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-(--neutral-color)">Eco-Neutral Shipping</span>
                        <span className="text-(--brand-color) font-bold tracking-tight">
                            {shipping === 0 ? 'COMPLIMENTARY' : `$${shipping.toFixed(2)}`}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-(--neutral-color)">Sales Tax</span>
                        <span className="font-medium text-(--foreground) tabular-nums">${tax.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Footer: Final Total & Impact */}
            <footer className="mt-auto border-t border-(--toggle-bg) p-6 bg-(--surface-muted)/5">
                <div className="mb-6 flex items-center justify-between">
                    <span className="text-base font-bold">Total Paid</span>
                    <span className="text-3xl font-black text-(--foreground) tracking-tighter tabular-nums">
                        ${total.toFixed(2)}
                    </span>
                </div>

                {/* Brand Mission Badge */}
                <div
                    className="flex items-center gap-3 rounded-2xl bg-(--brand-color)/10 p-4 text-(--brand-color) ring-1 ring-(--brand-color)/20"
                    role="status"
                >
                    <Icon name="check" size={20} className="shrink-0" variant="success" />
                    <p className="text-[11px] font-semibold leading-relaxed">
                        Order Impact: This purchase offset <span className="underline decoration-2 underline-offset-4 font-bold">2.4kg of CO2</span> via our reforestation partners.
                    </p>
                </div>
            </footer>
        </article>
    );
}
