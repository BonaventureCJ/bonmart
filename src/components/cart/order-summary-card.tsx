// src/components/cart/order-summary-card.tsx

'use client';

import { clsx } from 'clsx';
import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';

interface OrderSummaryItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

export interface OrderSummaryCardProps {
    orderNumber: string;
    date: string;
    items: OrderSummaryItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    className?: string;
}

/**
 * Enterprise Order Summary Card for Bonmart.
 * Optimized for post-purchase review and order history views.
 */
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
        <div
            className={clsx(
                'flex flex-col overflow-hidden rounded-3xl border border-(--toggle-bg)',
                'bg-(--surface-raised) transition-all duration-(--duration-long)',
                className
            )}
        >
            {/* Header: Order Metadata */}
            <div className="border-b border-(--toggle-bg) bg-(--surface-muted)/20 p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-(--neutral-color) opacity-70">
                            Order Number
                        </p>
                        <Heading level={4} weight="bold" className="text-lg">
                            #{orderNumber}
                        </Heading>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold uppercase tracking-widest text-(--neutral-color) opacity-70">
                            Date Placed
                        </p>
                        <p className="text-sm font-semibold text-(--foreground)">{date}</p>
                    </div>
                </div>
            </div>

            {/* Body: Item List */}
            <div className="flex flex-col gap-4 p-6">
                <div className="flex flex-col gap-3">
                    {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                            <p className="text-(--neutral-color)">
                                <span className="font-bold text-(--foreground)">{item.quantity}x</span> {item.name}
                            </p>
                            <span className="font-medium text-(--foreground)">
                                ${(item.price * item.quantity).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="my-2 h-px w-full bg-(--toggle-bg) opacity-50" />

                {/* Financial Breakdown */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-(--neutral-color)">Subtotal</span>
                        <span className="text-(--foreground)">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-(--neutral-color)">Shipping (Eco-Neutral)</span>
                        <span className="text-(--brand-color) font-medium">
                            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-(--neutral-color)">Estimated Tax</span>
                        <span className="text-(--foreground)">${tax.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Footer: Final Total & Impact */}
            <div className="mt-auto border-t border-(--toggle-bg) p-6">
                <div className="mb-4 flex items-center justify-between">
                    <span className="text-base font-bold">Total Amount</span>
                    <span className="text-2xl font-black text-(--foreground)">
                        ${total.toFixed(2)}
                    </span>
                </div>

                {/* Brand Mission Badge */}
                <div className="flex items-center gap-3 rounded-2xl bg-(--brand-color)/10 p-4 text-(--brand-color)">
                    <Icon name="check" size={20} className="shrink-0" />
                    <p className="text-xs font-semibold leading-tight">
                        This order offset <span className="underline">2.4kg of CO2</span> through our reforestation partnership.
                    </p>
                </div>
            </div>
        </div>
    );
}

