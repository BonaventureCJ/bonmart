// src/app/not-found.tsx

import { Metadata } from 'next';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading/heading';
import { Button } from '@/components/ui/button/button';
import { Brand } from '@/components/branding/brand';

export const metadata: Metadata = {
  title: '404: Page Not Found | BonMart',
  description: "The page you're looking for doesn't exist. Return to BonMart to explore our sustainable marketplace.",
};

export default function NotFound(): React.JSX.Element {
  return (
    <PageContainer>
      <section
        className="flex min-h-[65vh] flex-col items-center justify-center text-center"
        aria-labelledby="not-found-heading"
      >
        <div className="flex flex-col items-center max-w-2xl">
          <div className="mb-12 opacity-80 transition-opacity hover:opacity-100">
            <Brand logoSize="lg" className="pointer-events-none" />
          </div>

          <div className="space-y-4">
            <Heading
              level={1}
              weight="bold"
              id="not-found-heading"
              className="text-7xl sm:text-8xl text-(--brand-color) tracking-tighter"
            >
              404
            </Heading>

            <Heading level={2} weight="bold" tracking-tight>
              Page Not Found!
            </Heading>

            <p className="mx-auto max-w-md text-base text-(--neutral-color) sm:text-lg leading-relaxed text-balance">
              We couldn&apos;t find the page you&apos;re looking for. If the URL was entered correctly,
              it might have been migrated or removed.
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Button href="/" variant="primary" size="lg" icon="home" className="min-w-[200px]">
              Back to Home
            </Button>
            <Button href="/search" variant="secondary" size="lg" icon="search" className="min-w-[200px]">
              Search Products
            </Button>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
