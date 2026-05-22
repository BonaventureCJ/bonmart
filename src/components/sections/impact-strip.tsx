// src/components/sections/impact-strip.tsx

import { Icon } from '@/components/ui/icon/icon';

const IMPACT_STATS = [
    { label: 'Trees Planted', value: '150K+', icon: 'leaf' },
    { label: 'Carbon Offset', value: '2.4M kg', icon: 'globe' },
    { label: 'Eco-Partners', value: '500+', icon: 'check' },
] as const;

export function ImpactStrip() {
    return (
        <section className="border-y border-(--toggle-bg) bg-(--surface-muted) py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {IMPACT_STATS.map((stat) => (
                        <div key={stat.label} className="flex items-center justify-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--brand-color)/10 text-(--brand-color)">
                                <Icon name={stat.icon} size={24} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-(--foreground)">{stat.value}</p>
                                <p className="text-sm font-medium text-(--neutral-color)">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
