// src/components/contact/contact-info.tsx

import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';

/**
 * Displays office locations and digital contact channels.
 * Responsive: Icons top/Centered (Mobile) -> Icons side/Left Aligned (Laptop+).
 */
export function ContactInfo() {
    return (
        <section className="space-y-12">
            {/* Header: Centered on mobile, Left-aligned on laptop */}
            <div className="space-y-6">
                <Heading level={2} weight="bold" className="lg:text-left">
                    Contact Information
                </Heading>
                <p className="text-center text-base text-(--neutral-color) lg:text-left">
                    Reach out through any of these channels. We typically respond
                    within 24 business hours.
                </p>
            </div>

            <div className="space-y-10 sm:space-y-8">
                {/* Headquarters Channel */}
                <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-(--brand-color) text-(--text-on-image)">
                        <Icon name="globe" size={24} />
                    </div>
                    <div className="space-y-1">
                        <Heading level={5} weight="bold" className="lg:text-left">
                            Eco-Headquarters
                        </Heading>
                        <p className="text-sm leading-relaxed text-(--neutral-color)">
                            123 Sustainable Way, Green District<br />
                            Lagos, Nigeria
                        </p>
                        <p className="mt-2 text-[10px] font-medium italic leading-tight text-(--neutral-color) opacity-70">
                            Coming soon: Please note that this is a placeholer address!
                        </p>
                    </div>
                </div>

                {/* Email Channel */}
                <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-(--brand-color) text-(--text-on-image)">
                        <Icon name="star" size={24} />
                    </div>
                    <div className="space-y-1">
                        <Heading level={5} weight="bold" className="lg:text-left">
                            Email Us
                        </Heading>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm text-(--neutral-color)">support@bonmart.eco</p>
                            <p className="text-sm text-(--neutral-color)">partnerships@bonmart.eco</p>
                            <p className="mt-2 text-[10px] font-medium italic leading-tight text-(--neutral-color) opacity-70">
                                Coming soon: Please note that these email addresses are not yet
                                functional as we are finalizing our communication channels!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sustainability Commitment Badge */}
            <div className="rounded-3xl border border-(--toggle-bg) bg-(--surface-muted) p-8 text-center sm:text-left">
                <Heading level={4} weight="bold" className="mb-3 lg:text-left">
                    Our Digital Commitment
                </Heading>
                <p className="text-sm leading-relaxed text-(--neutral-color)">
                    This contact portal is hosted on carbon-neutral servers.
                    We prioritize digital efficiency to minimize our total
                    network energy consumption.
                </p>
            </div>
        </section>
    );
}

