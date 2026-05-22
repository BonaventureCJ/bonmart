// src/components/sections/featured-services.tsx

import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';
import { SERVICES_DATA } from '@/data/services-data';

/**
 * FeaturedServices Section
 * Extracts core value propositions from the services data to build trust on the homepage.
 * Follows the grid pattern established in the Services page.
 */
export function FeaturedServices() {
    // We take the top 3 services to maintain a balanced 3-column grid on desktop
    const highlightedServices = SERVICES_DATA.slice(0, 3);

    return (
        <section
            aria-labelledby="services-heading"
            className="flex flex-col gap-12"
        >
            {/* Section Header */}
            <header className="flex flex-col items-center text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-(--brand-color)/10 px-4 py-1.5 text-[10px] font-bold tracking-widest text-(--brand-color) uppercase">
                    <Icon name="leaf" size={14} />
                    <span>The BonMart Advantage</span>
                </div>
                <Heading id="services-heading" level={2} weight="bold">
                    Beyond Just <span className="text-(--brand-color)">Commerce</span>
                </Heading>
                <p className="mt-4 max-w-2xl text-base text-(--neutral-color) md:text-lg">
                    We provide an integrated ecosystem designed to make sustainable
                    living effortless, transparent, and rewarding.
                </p>
            </header>

            {/* Services Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {highlightedServices.map((service) => (
                    <div
                        key={service.id}
                        className="group flex flex-col items-center rounded-3xl border border-(--toggle-bg) bg-(--surface-raised) p-8 text-center transition-all duration-(--duration-long) hover:border-(--brand-color)/30 hover:shadow-sm"
                    >
                        {/* Icon Container */}
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-(--brand-color) text-(--text-on-brand) transition-transform group-hover:scale-110">
                            <Icon name={service.icon} size={28} />
                        </div>

                        {/* Content */}
                        <Heading level={3} weight="bold" className="mb-4 text-xl">
                            {service.title}
                        </Heading>
                        <p className="text-sm leading-relaxed text-(--neutral-color) md:text-base">
                            {service.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
