// src/components/branding/impact-card.tsx

'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import { Heading } from '@/components/ui/heading/heading';
import { Icon, type IconName } from '@/components/ui/icon/icon';

interface ImpactCardProps {
    title: string;
    description: string;
    icon: IconName;
    metric?: string; // e.g., "100% Organic" or "12kg CO2 saved"
    className?: string;
}

/**
 * ImpactCard Component
 * 
 * Purpose: High-trust informational card for sustainability claims.
 * Features:
 * - Semantic <section> for SEO indexing of brand values.
 * - Integration with brand-primary (green) design tokens.
 * - Mobile-first responsive layout.
 */
export const ImpactCard = React.memo(function ImpactCard({
    title,
    description,
    icon,
    metric,
    className,
}: ImpactCardProps) {
    return (
        <section
            className={clsx(
                'group flex flex-col items-center p-6 text-center transition-all duration-long ease-in-out sm:p-8',
                'rounded-3xl border border-toggle-bg bg-background hover:border-brand-color/40 hover:shadow-md',
                className
            )}
        >
            {/* Icon Container with brand accent - Using brand-color with opacity shorthand */}
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-color/10 text-brand-color transition-transform duration-long group-hover:scale-110">
                <Icon name={icon} className="h-8 w-8" />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2">
                {metric && (
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-color">
                        {metric}
                    </span>
                )}

                <Heading
                    level={3}
                    weight="bold"
                    className="text-xl tracking-tight text-foreground"
                >
                    {title}
                </Heading>

                <p className="text-sm leading-relaxed text-neutral-color md:text-base">
                    {description}
                </p>
            </div>

            {/* Decorative Brand Element - Replaced toggle-bg with semantic variable */}
            <div
                className="mt-6 h-1 w-8 rounded-full bg-toggle-bg transition-all duration-long group-hover:w-16 group-hover:bg-brand-color/50"
                aria-hidden="true"
            />
        </section>
    );
});

ImpactCard.displayName = 'ImpactCard';
