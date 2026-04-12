//src/app/(shop)/cart/page.tsx

import { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "Shopping Cart | BonMart",
  description: "View your selected eco-friendly items in your BonMart shopping cart.",
};

/**
 * CartPage Component
 * Placeholder for the enterprise e-commerce cart experience.
 */
export default function CartPage() {
  return (
    <PageContainer>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold sm:text-4xl">Your Cart</h1>
        <p className="text-neutral-color max-w-md">
          Your eco-conscious selections will appear here. This page is currently
          under construction as we build a better shopping experience.
        </p>
      </div>
    </PageContainer>
  );
}
