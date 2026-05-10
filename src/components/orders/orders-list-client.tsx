// src/components/orders/orders-list-client.tsx

"use client";

import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { selectOrderHistory } from "@/features/orders/orders-selectors";
import { OrderSummaryCard } from "@/components/cart/order-summary-card";
import { Heading } from "@/components/ui/heading/heading";
import { Button } from "@/components/ui/button/button";
import { Icon } from "@/components/ui/icon/icon";

/**
 * OrdersListClient Component
 * Consumes the memoized order history to provide a high-performance 
 * dashboard view of historical purchases.
 */
export function OrdersListClient() {
    // Memoized Selector Integration
    const history = useAppSelector(selectOrderHistory);

    if (history.length === 0) {
        return (
            <section className="flex flex-col items-center py-20 text-center" role="status">
                <div className="mb-6 rounded-full bg-(--surface-muted) p-6">
                    <Icon name="history" size={48} className="text-(--neutral-color) opacity-40" />
                </div>
                <Heading level={2} weight="bold" className="mb-2">No orders yet</Heading>
                <p className="mb-8 text-(--neutral-color)">
                    When you make a sustainable purchase, it will appear here.
                </p>
                <Link href="/products">
                    <Button variant="primary" size="lg">Start Shopping</Button>
                </Link>
            </section>
        );
    }

    return (
        <section
            className="flex w-full flex-col gap-8"
            aria-label="Order history list"
            role="list"
        >
            {history.map((order) => (
                <OrderSummaryCard
                    key={order.id}
                    orderNumber={order.id}
                    date={order.date}
                    items={order.items}
                    subtotal={order.subtotal}
                    tax={order.tax}
                    shipping={order.shipping}
                    total={order.total}
                />
            ))}
        </section>
    );
}
