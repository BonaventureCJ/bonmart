//src/app/(shop)/checkout/page.tsx

import { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "Secure Checkout | BonMart",
  description: "Complete your eco-conscious purchase through our secure checkout process.",
};

/**
 * CheckoutPage Component
 * Standardized placeholder within the (shop) route group.
 */
export default function CheckoutPage() {
  return (
    <PageContainer>
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold sm:text-4xl">Checkout</h1>
        
        <div 
          role="status"
          className="w-full max-w-2xl rounded-lg p-10"
        >
          <p className="text-lg font-medium text-[var(--brand-color)]">
            Checkout System Integration Pending
          </p>
          <p className="mt-4 text-neutral-color">
            Secure, carbon-neutral payment processing is being finalized.
            This area will soon house the shipping and payment forms.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
