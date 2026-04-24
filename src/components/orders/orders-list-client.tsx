// src/components/orders/orders-list-client.tsx

"use client";

import { useAppSelector } from "@/store/hooks";
import { OrderSummaryCard } from "@/components/cart/order-summary-card";
import { Heading } from "@/components/ui/heading/heading";
import { Button } from "@/components/ui/button/button";
import { Icon } from "@/components/ui/icon/icon";
import Link from "next/link";

export function OrdersListClient() {
    const { history } = useAppSelector((state) => state.orders);

    if (history.length === 0) {
        return (
            <section className="flex flex-col items-center py-20 text-center">
                <div className="mb-6 rounded-full bg-(--surface-muted) p-6">
                    <Icon name="home" size={48} className="text-(--neutral-color) opacity-40" />
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
        <section className="flex w-full flex-col gap-8">
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
