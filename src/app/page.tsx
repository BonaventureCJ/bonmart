// src/app/page.tsx

import { Hero } from "@/components/sections/hero";
import PageContainer from "@/components/layout/page-container";

/**
 * HOME PAGE
 * 
 * NOTE TO REVIEWERS:
 * - To visualize LOADING: Set TRIGGER_ERROR to false.
 * - To visualize ERROR: Set TRIGGER_ERROR to true.
 */
export default async function Home() {
  // --- TEST CONTROLS ---
  const TRIGGER_ERROR = false; // Flip this to true to see error.tsx
  const SIMULATE_DELAY = 3000;
  // ---------------------

  // 1. Simulate Latency (Visualizes loading.tsx)
  await new Promise((resolve) => setTimeout(resolve, SIMULATE_DELAY));

  // 2. Simulate Crash (Visualizes error.tsx)
  if (TRIGGER_ERROR) {
    throw new Error(
      "BONMART_DATA_SYNC_ERROR: Failed to establish a secure connection to the sustainability engine."
    );
  }

  return (
    <PageContainer>
      <Hero />
    </PageContainer>
  );
}
