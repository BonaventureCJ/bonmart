// src/app/about/page.tsx

import { Metadata } from 'next';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';
import { Button } from '@/components/ui/button/button';

/**
 * Enterprise SEO Metadata for the About Page.
 */
export const metadata: Metadata = {
    title: 'Our Story | Bonmart Sustainable Commerce',
    description: 'Discover Bonmart’s mission to revolutionise e-commerce through sustainability, eco-friendly sourcing, and carbon-neutral operations.',
    openGraph: {
        title: 'About Bonmart | Eco-Friendly Shopping',
        description: 'Our journey toward a greener planet through responsible commerce.',
        type: 'website',
    },
};

/**
 * AboutPage Component
 * Optimized for standardized vertical rhythm and enterprise consistency.
 */
export default function AboutPage() {
    return (
        <PageContainer>
            <article className="mx-auto max-w-5xl">
                {/* Hero Section: Spacing optimized for standardized page-section wrapper */}
                <header className="mb-16 flex flex-col items-center text-center md:mb-32">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-(--brand-color)/10 px-4 py-1.5 text-[10px] font-bold tracking-widest text-(--brand-color) uppercase">
                        <Icon name="globe" size={14} />
                        <span>Our Mission</span>
                    </div>
                    <Heading level={1} weight="bold" className="mb-6">
                        Driving the Future of <br className="hidden md:block" />
                        <span className="text-(--brand-color)">Sustainable Commerce</span>
                    </Heading>
                    <p className="max-w-2xl text-base leading-relaxed text-(--neutral-color) md:text-lg">
                        At Bonmart, we believe that shopping shouldn&apos;t cost the Earth.
                        Founded in 2025, our platform was built to bridge the gap between
                        premium quality and environmental responsibility.
                    </p>
                </header>

                {/* Brand Values Grid */}
                <section className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mb-40">
                    <div className="flex flex-col items-center rounded-3xl border border-(--toggle-bg) bg-(--surface-raised) p-8 text-center">
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-(--brand-color) text-(--text-on-image)">
                            <Icon name="check" size={24} />
                        </div>
                        <Heading level={3} weight="bold" align="center" className="mb-3">
                            Eco-Certified Sourcing
                        </Heading>
                        <p className="text-sm leading-relaxed text-(--neutral-color) md:text-base">
                            Every product in our catalog undergoes a rigorous vetting process
                            to ensure it meets international sustainability standards and
                            ethical labor practices.
                        </p>
                    </div>

                    <div className="flex flex-col items-center rounded-3xl border border-(--toggle-bg) bg-(--surface-raised) p-8 text-center">
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-(--brand-color) text-(--text-on-image)">
                            <Icon name="monitor" size={24} />
                        </div>
                        <Heading level={3} weight="bold" align="center" className="mb-3">
                            Radical Transparency
                        </Heading>
                        <p className="text-sm leading-relaxed text-(--neutral-color) md:text-base">
                            We provide full visibility into our supply chain via digital
                            tracking, so you know exactly where your items come from and
                            the impact of their production.
                        </p>
                    </div>
                </section>

                {/* Narrative Section */}
                <section className="flex flex-col items-center gap-12 text-center">
                    <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-(--surface-muted) md:max-w-3xl">
                        <div className="flex h-full w-full items-center justify-center text-(--neutral-color) opacity-20">
                            <Icon name="globe" size={120} />
                        </div>
                    </div>

                    <div className="max-w-3xl space-y-6">
                        <Heading level={2} weight="bold" align="center">
                            Why We Care
                        </Heading>
                        <p className="text-base leading-relaxed text-(--neutral-color) md:text-lg">
                            The traditional retail model generates millions of tonnes of waste annually.
                            Bonmart operates on a zero-waste philosophy, utilizing biodegradable
                            packaging and carbon-neutral shipping for every order.
                        </p>
                        <p className="text-base leading-relaxed text-(--neutral-color) md:text-lg">
                            Our goal is to plant 1 million trees by 2030 through our reforestation
                            partnerships. When you shop with us, you are a partner in global restoration.
                        </p>
                    </div>
                </section>

                {/* Page-Specific CTA: Using semantic variables for high-contrast block */}
                <section className="mt-20 rounded-3xl bg-(--brand-color) p-8 text-center text-(--text-on-brand) md:mt-40 md:p-16">
                    <Heading level={2} weight="bold" className="mb-4 text-(--text-on-brand)">
                        Ready to make a difference?
                    </Heading>
                    <p className="mb-10 text-base text-(--text-on-brand) md:text-lg">
                        Join thousands of eco-conscious shoppers worldwide.
                    </p>
                    <div className="flex justify-center">
                        <Button
                            href="/products"
                            variant="secondary"
                            size="lg"
                            icon="arrowRight"
                            iconPlacement="right"
                        >
                            Shop Sustainable
                        </Button>
                    </div>
                </section>
            </article>
        </PageContainer>
    );
}
