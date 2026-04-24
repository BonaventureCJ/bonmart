//src/app/(shop)/orders/page.tsx

import { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading/heading";
import { OrdersListClient } from "@/components/orders/orders-list-client";

export const metadata: Metadata = {
  title: "Order History | BonMart",
  description: "View and track your eco-friendly purchases and delivery status.",
};

export default function OrdersPage() {
  return (
    <PageContainer>
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-10 py-8 md:py-12">
        <header className="flex flex-col gap-2 border-b border-(--toggle-bg) pb-8 text-center md:text-left">
          <Heading level={1} weight="bold">Your Orders</Heading>
          <p className="text-base text-(--neutral-color) text-center md:text-lg">
            Manage your past purchases and track current shipments.
          </p>
        </header>

        <OrdersListClient />
      </main>
    </PageContainer>
  );
}