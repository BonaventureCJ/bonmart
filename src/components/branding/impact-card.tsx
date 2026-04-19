// src/components/branding/impact-card.tsx

'use client';

import { clsx } from 'clsx';
import { Icon, type IconName } from '@/components/ui/icon/icon';
import { Heading } from '@/components/ui/heading/heading';

export interface ImpactCardProps {
    title: string;
    value: string;
    description: string;
    icon: IconName;
    /** Primary brand background variant */
    isProminent?: boolean;
    className?: string;
}

/**
 * Enterprise Impact Card for Bonmart.
 * 100% Variable-driven to ensure perfect dark/light mode synchronization.
 */
export function ImpactCard({
    title,
    value,
    description,
    icon,
    isProminent = false,
    className,
}: ImpactCardProps) {
    return (
        <article
            className={clsx(
                'group relative flex flex-col gap-4 overflow-hidden rounded-3xl p-6 sm:p-8',
                'transition-all duration-(--duration-long) ease-(--transition-ease-in-out)',
                'border border-(--toggle-bg)',
                isProminent
                    ? 'bg-(--brand-color) text-(--text-on-image)'
                    : 'bg-(--surface-raised) text-(--foreground)',
                className
            )}
        >
            {/* Decorative Brand Accent (Top-Right) */}
            <div
                className={clsx(
                    'absolute -top-4 -right-4 h-24 w-24 rounded-full opacity-10 transition-transform duration-700 group-hover:scale-150',
                    isProminent ? 'bg-(--text-on-image)' : 'bg-(--brand-color)'
                )}
                aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col gap-6">
                {/* Icon Container */}
                <div
                    className={clsx(
                        'flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm',
                        isProminent
                            ? 'bg-(--text-on-image)/20 text-(--text-on-image)'
                            : 'bg-(--brand-color)/10 text-(--brand-color)'
                    )}
                >
                    <Icon name={icon} size={28} />
                </div>

                <div className="flex flex-col gap-1">
                    <Heading
                        level={4}
                        weight="bold"
                        className={clsx(
                            'text-3xl sm:text-4xl tracking-tight',
                            isProminent ? 'text-(--text-on-image)' : 'text-(--foreground)'
                        )}
                    >
                        {value}
                    </Heading>
                    <Heading
                        level={6}
                        weight="semibold"
                        className={clsx(
                            'text-sm uppercase tracking-widest opacity-90',
                            isProminent ? 'text-(--text-on-image)/80' : 'text-(--brand-color)'
                        )}
                    >
                        {title}
                    </Heading>
                </div>

                <p
                    className={clsx(
                        'text-sm leading-relaxed max-w-[22ch] sm:max-w-none',
                        isProminent ? 'text-(--text-on-image)/90' : 'text-(--neutral-color)'
                    )}
                >
                    {description}
                </p>
            </div>
        </article>
    );
}
