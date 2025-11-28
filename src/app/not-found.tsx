// src/app/not-found.tsx
import Link from 'next/link';
import { Metadata } from 'next';
import PageContainer from '@/components/layout/page-container';

export const metadata: Metadata = {
  title: '404: Page Not Found - BonMart',
  description: "Sorry, we couldn't find the page you're looking for on BonMart. Here are some options to help you find your way.",
};

/**
 * Custom 404 "Not Found" page. Renders within the main site layout,
 * including the header and footer, to maintain a consistent user experience.
 */
export default function NotFound(): React.JSX.Element {
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center text-(--foreground)">
        <div className="space-y-6">
          <h1 className="text-6xl font-bold tracking-tight text-(--brand-color) sm:text-7xl">
            404
          </h1>
          <p
            className="text-xl sm:text-2xl font-medium"
            aria-live="polite"
          >
            Page Not Found
          </p>
          <p className="text-base sm:text-lg max-w-xl text-(--neutral-color)">
            We&apos;re sorry, but the page you requested could not be found. It may have been moved, deleted, or you may have mistyped the address.
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold text-(--surface-light) bg-(--brand-color) hover:bg-(--brand-color)/90 transition-colors duration-(--duration-long) focus-ring"
            >
              Go Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
