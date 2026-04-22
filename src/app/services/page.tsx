// src/app/services/page.tsx

import { Metadata } from 'next';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';
import { Button } from '@/components/ui/button/button';
import { SERVICES_DATA } from '@/data/services-data';

/**
 * Enterprise SEO Metadata for the Services Page.
 */
export const metadata: Metadata = {
    title: 'Eco-Services | Bonmart Sustainable Commerce',
    description: 'Explore our suite of sustainable e-commerce services, including carbon-neutral delivery and circular recycling programs.',
    openGraph: {
        title: 'Bonmart Services | Sustainable Solutions',
        description: 'Sustainable e-commerce solutions for a greener planet.',
        type: 'website',
    },
};

export default function ServicesPage() {
    return (
        <PageContainer>
            <article className="mx-auto max-w-5xl py-12 md:py-24">
                {/* Header Section */}
                <header className="mb-16 flex flex-col items-center text-center md:mb-32">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-(--brand-color)/10 px-4 py-1.5 text-[10px] font-bold tracking-widest text-(--brand-color) uppercase">
                        <Icon name="star" size={14} />
                        <span>What We Offer</span>
                    </div>
                    <Heading level={1} weight="bold" className="mb-6">
                        Services Built for <br className="hidden md:block" />
                        <span className="text-(--brand-color)">The Next Generation</span>
                    </Heading>
                    <p className="max-w-2xl text-base leading-relaxed text-(--neutral-color) md:text-lg">
                        Beyond just a marketplace, Bonmart provides an integrated ecosystem
                        designed to make sustainable living effortless and transparent.
                    </p>
                </header>

                {/* Services Grid */}
                <section
                    aria-label="Core Services"
                    className="mb-20 grid grid-cols-1 gap-8 md:mb-40 md:grid-cols-3"
                >
                    {SERVICES_DATA.map((service) => (
                        <div
                            key={service.id}
                            className="flex flex-col items-center text-center rounded-3xl border border-(--toggle-bg) bg-(--surface-raised) p-8"
                        >
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-(--brand-color) text-(--text-on-image)">
                                <Icon name={service.icon} size={28} />
                            </div>
                            <Heading level={3} weight="bold" className="mb-4">
                                {service.title}
                            </Heading>
                            <p className="text-sm leading-relaxed text-(--neutral-color) md:text-base">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </section>

                {/* Feature Highlight Section */}
                <section className="rounded-3xl border border-(--toggle-bg) bg-(--surface-muted) p-8 md:p-16">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                        <div className="space-y-6">
                            <Heading level={2} weight="bold" align="left">
                                Real-Time Impact <br />
                                <span className="text-(--brand-color)">Analytics</span>
                            </Heading>
                            <p className="text-base leading-relaxed text-(--neutral-color) md:text-lg">
                                Our enterprise dashboard allows you to track the environmental
                                saved-impact of every purchase. Monitor your CO2 reduction
                                in real-time.
                            </p>
                            <div className="flex pt-4">
                                <Button
                                    href="/products"
                                    variant="primary"
                                    size="md"
                                    icon="arrowRight"
                                    iconPlacement="right"
                                >
                                    Start Shopping
                                </Button>
                            </div>
                        </div>
                        <div className="relative aspect-video overflow-hidden rounded-2xl bg-(--surface-raised) shadow-sm">
                            <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center text-(--neutral-color) opacity-20">
                                <Icon name="monitor" size={80} className="mb-4" />
                                <div className="h-2 w-32 rounded-full bg-(--neutral-color) mb-2" />
                                <div className="h-2 w-24 rounded-full bg-(--neutral-color)" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Page CTA Section */}
                <section className="mt-20 flex flex-col items-center text-center md:mt-40">
                    <Heading level={2} weight="bold" className="mb-6">
                        Have Questions?
                    </Heading>
                    <p className="mb-10 max-w-xl text-(--neutral-color)">
                        Our environmental specialists are available to discuss our sourcing
                        standards or circular economy programs.
                    </p>
                    <Button
                        href="/contact"
                        variant="secondary"
                        size="lg"
                        className="bg-(--surface-muted) text-(--foreground) hover:bg-(--toggle-bg)"
                    >
                        Contact Support
                    </Button>
                </section>
            </article>
        </PageContainer>
    );
}

