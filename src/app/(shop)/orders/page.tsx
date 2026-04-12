//src/app/(shop)/orders/page.tsx

import { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "Order History | BonMart",
  description: "View and track your eco-friendly purchases and delivery status.",
};

/**
 * OrdersPage Component
 * Semantic placeholder for the customer's order history.
 */
export default function OrdersPage() {
  return (
    <PageContainer>
      <div className="flex flex-col items-center gap-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Your Orders</h1>
          <p className="mt-2 text-neutral-color">
            Manage your past purchases and track current shipments.
          </p>
        </header>

        <section
          aria-labelledby="empty-orders-heading"
          className="w-full max-w-3xl rounded-xl p-12 text-center"
        >
          <h2 id="empty-orders-heading" className="text-xl font-medium">
            No orders yet
          </h2>
          <p className="mt-2 text-neutral-color">
            When you make a sustainable purchase, it will appear here.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
