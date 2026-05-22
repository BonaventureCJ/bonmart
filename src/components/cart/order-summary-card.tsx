// src/components/cart/order-summary-card.tsx

'use client';

import { clsx } from 'clsx';
import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';
import type { Order } from '@/features/orders/orders-slice';

/**
 * Order Summary Card.
 * Optimized for post-purchase receipts and Order History lists.
 */
export interface OrderSummaryCardProps {
    orderNumber: string;
    date: string;
    items: Order['items'];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    status: Order['status'];
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
    status,
    className,
}: OrderSummaryCardProps) {
    const statusConfig = {
        processing: { label: 'Processing', step: 1 },
        shipped: { label: 'Shipped', step: 2 },
        delivered: { label: 'Delivered', step: 3 },
    };

    const currentStep = statusConfig[status].step;

    return (
        <article
            className={clsx(
                'flex flex-col overflow-hidden rounded-3xl border border-(--toggle-bg)',
                'bg-(--surface-raised) shadow-sm',
                className
            )}
        >
            <header className="border-b border-(--toggle-bg) bg-(--surface-muted) p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold tracking-widest text-(--neutral-color) uppercase opacity-60">
                            Order Reference
                        </p>
                        <div className="flex items-center gap-3">
                            <Heading level={4} weight="bold" className="text-lg tabular-nums text-(--foreground)">
                                #{orderNumber}
                            </Heading>
                            <span className={clsx(
                                "rounded-full px-2 py-0.5 text-[9px] font-black tracking-widest ring-1 ring-inset uppercase",
                                status === 'delivered'
                                    ? "bg-(--brand-color)/10 text-(--brand-color) ring-(--brand-color)/20"
                                    : "bg-(--warning)/10 text-(--warning) ring-(--warning)/20"
                            )}>
                                {status}
                            </span>
                        </div>
                    </div>
                    <div className="space-y-1 text-right">
                        <p className="text-[10px] font-bold tracking-widest text-(--neutral-color) uppercase opacity-60">
                            Transaction Date
                        </p>
                        <p className="text-sm font-semibold text-(--foreground)">{date}</p>
                    </div>
                </div>
            </header>

            {/* Tracking Progress Section */}
            <div className="px-6 pt-6">
                <div className="relative flex w-full items-center justify-between">
                    <div className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 bg-(--toggle-bg)" />
                    <div
                        className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 bg-(--brand-color) transition-all duration-500"
                        style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                    />
                    {[1, 2, 3].map((step) => (
                        <div key={step} className={clsx(
                            "relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors",
                            currentStep >= step
                                ? "border-(--brand-color) bg-(--brand-color) text-(--text-on-brand)"
                                : "border-(--toggle-bg) bg-(--surface-raised) text-(--neutral-color)"
                        )}>
                            <Icon name={step === 1 ? "clock" : step === 2 ? "globe" : "check"} size={12} />
                        </div>
                    ))}
                </div>
                <div className="mt-2 flex justify-between text-[9px] font-bold tracking-tighter text-(--neutral-color) uppercase opacity-60">
                    <span>Confirmed</span>
                    <span className="pl-2">In Transit</span>
                    <span>Arrived</span>
                </div>
            </div>

            {/* Body: Item List */}
            <div className="flex flex-col gap-6 p-6">
                <section aria-label="Purchased items">
                    <div className="flex flex-col gap-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-start justify-between gap-4 text-sm">
                                <p className="leading-tight text-(--neutral-color)">
                                    <span className="font-bold text-(--foreground) tabular-nums">{item.quantity}x</span> {item.name}
                                </p>
                                <span className="whitespace-nowrap font-semibold text-(--foreground) tabular-nums">
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
                        <span className="font-bold tracking-tight text-(--brand-color) uppercase">
                            {shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-(--neutral-color)">Sales Tax</span>
                        <span className="font-medium text-(--foreground) tabular-nums">${tax.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="mt-auto border-t border-(--toggle-bg) bg-(--surface-muted) p-6">
                <div className="mb-6 flex items-center justify-between">
                    <span className="text-base font-bold text-(--foreground)">Total Paid</span>
                    <span className="text-3xl font-black tracking-tighter text-(--foreground) tabular-nums">
                        ${total.toFixed(2)}
                    </span>
                </div>

                {/* Brand Mission Badge */}
                <div
                    className="flex items-center gap-3 rounded-2xl bg-(--brand-color)/10 p-4 text-(--brand-color) ring-1 ring-(--brand-color)/20"
                    role="status"
                >
                    <Icon name="leaf" size={20} className="shrink-0" />
                    <p className="text-[11px] font-semibold leading-relaxed">
                        Order Impact: This purchase offset <span className="font-bold underline decoration-2 underline-offset-4">2.4kg of CO2</span> via our reforestation partners.
                    </p>
                </div>
            </div>
        </article>
    );
}
