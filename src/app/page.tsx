// src/app/page.tsx

import { Hero } from "@/components/sections/hero";
import PageContainer from "@/components/layout/page-container";

/**
 * HOME PAGE
 * 
 * NOTE TO REVIEWERS:
 * - Test controls are only active in DEVELOPMENT mode.
 * - To visualize LOADING: Set TRIGGER_ERROR to false (local only).
 * - To visualize ERROR: Set TRIGGER_ERROR to true (local only).
 */
export default async function Home() {
  // --- TEST CONTROLS (Local Development Only) ---
  const isDev = process.env.NODE_ENV === "development";
  const TRIGGER_ERROR = false; // Set to true to simulate an error, false to simulate loading (local only)
  const SIMULATE_DELAY = 3000;
  // ----------------------------------------------

  if (isDev) {
    // 1. Simulate Latency (Visualizes loading.tsx)
    await new Promise((resolve) => setTimeout(resolve, SIMULATE_DELAY));

    // 2. Simulate Crash (Visualizes error.tsx)
    if (TRIGGER_ERROR) {
      throw new Error(
        "BONMART_DATA_SYNC_ERROR: Failed to establish a secure connection to the sustainability engine."
      );
    }
  }

  return (
    <PageContainer>
      <Hero />
    </PageContainer>
  );
}

