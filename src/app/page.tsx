// src/app/page.tsx

import { Hero } from "@/components/sections/hero";
import PageContainer from "@/components/layout/page-container";

/**
 * HOME PAGE
 * 
 * NOTE TO REVIEWERS/DEVELOPERS:
 * The 3-second artificial delay (setTimeout) below is intentionally implemented 
 * to demonstrate the "loading.tsx" global fallback UI and skeleton strategy. 
 * This simulates a high-latency enterprise data fetch to showcase perceived 
 * performance handling and brand-consistent transition states.
 * 
 * The Promise delay will be removed before production launch..
 */
export default async function Home() {
  // SIMULATION: Artificial latency to showcase the loading boundary
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <PageContainer>
      <Hero />
    </PageContainer>
  );
}
