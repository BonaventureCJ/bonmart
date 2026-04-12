//src/app/(shop)/wishlist/page.tsx

import { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "My Wishlist | BonMart",
  description: "Save and manage your favorite eco-friendly items for later.",
};

/**
 * WishlistPage Component
 * Semantic placeholder for the customer's saved items.
 */
export default function WishlistPage() {
  return (
    <PageContainer>
      <div className="flex flex-col items-center gap-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">My Wishlist</h1>
          <p className="mt-2 text-neutral-color">
            A curated collection of your favorite sustainable finds.
          </p>
        </header>

        <section 
          aria-labelledby="empty-wishlist-heading"
          className="w-full max-w-3xl rounded-xl p-12 text-center"
        >
          <h2 id="empty-wishlist-heading" className="text-xl font-medium">
            Your wishlist is empty
          </h2>
          <p className="mt-2 text-neutral-color">
            Start exploring our shop to save items you love.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
