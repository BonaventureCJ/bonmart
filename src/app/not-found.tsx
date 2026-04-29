// src/app/not-found.tsx

import { Metadata } from 'next';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading/heading';
import { Button } from '@/components/ui/button/button';

export const metadata: Metadata = {
  title: '404: Page Not Found - BonMart',
  description: "Sorry, we couldn't find the page you're looking for on BonMart. Here are some options to help you find your way.",
};

/**
 * Custom 404 "Not Found" page.
 * Standardized using Heading and Button components for enterprise consistency.
 */
export default function NotFound(): React.JSX.Element {
  return (
    <PageContainer>
      <main className="flex min-h-[70vh] flex-col items-center justify-center py-12 text-(--foreground)">
        <div className="space-y-6">
          <Heading
            level={1}
            weight="bold"
            className="text-6xl sm:text-7xl text-(--brand-color)"
          >
            404
          </Heading>

          <p
            className="text-xl font-medium sm:text-2xl"
            aria-live="polite"
          >
            Page Not Found
          </p>

          <p className="mx-auto max-w-xl text-base text-(--neutral-color) sm:text-lg">
            We&apos;re sorry, but the page you requested could not be found.
            It may have been moved, deleted, or you may have mistyped the address.
          </p>

          <div className="mt-8">
            <Button
              href="/"
              variant="primary"
              size="lg"
              icon="home"
            >
              Go Back to Homepage
            </Button>
          </div>
        </div>
      </main>
    </PageContainer>
  );
}
