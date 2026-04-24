// src/components/product/details/trust-badges.tsx

import { Icon } from '@/components/ui/icon/icon';
import { Heading } from '@/components/ui/heading/heading';

export function TrustBadges() {
    return (
        <div className="grid grid-cols-1 gap-4 rounded-2xl bg-(--surface-muted)/20 p-6 sm:grid-cols-2">
            {[
                { icon: 'globe', title: 'Carbon Neutral', desc: 'Offsetting every delivery' },
                { icon: 'check', title: 'Quality Guaranteed', desc: '30-day money-back policy' }
            ].map((badge) => (
                <div key={badge.title} className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-(--brand-color)/10 text-(--brand-color)">
                        <Icon name={badge.icon as any} size={24} />
                    </div>
                    <div>
                        <Heading level={6} weight="bold" className="text-sm">{badge.title}</Heading>
                        <p className="text-xs text-(--neutral-color)">{badge.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
