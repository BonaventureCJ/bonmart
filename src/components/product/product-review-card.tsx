// src/components/product/product-review-card.tsx

'use client';

import { clsx } from 'clsx';
import { Icon } from '@/components/ui/icon/icon';
import { Heading } from '@/components/ui/heading/heading';
import { Button } from '@/components/ui/button/button';

interface ProductReviewCardProps {
    author: string;
    date: string;
    rating: number;
    comment: string;
    isVerified?: boolean;
    className?: string;
}

/**
 * Enterprise Product Review Card for Bonmart.
 * Optimized for readability, theme consistency, and accessibility.
 */
export function ProductReviewCard({
    author,
    date,
    rating,
    comment,
    isVerified = false,
    className,
}: ProductReviewCardProps) {
    return (
        <article
            className={clsx(
                'flex flex-col gap-4 rounded-2xl border border-(--toggle-bg) p-5',
                'bg-(--surface-raised) transition-all duration-(--duration-long) ease-(--transition-ease-in-out)',
                'hover:shadow-sm',
                className
            )}
        >
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <Heading level={6} weight="bold" className="text-base">
                            {author}
                        </Heading>
                        {isVerified && (
                            <div
                                className="flex items-center gap-1 text-(--brand-color)"
                                title="Verified Purchase"
                            >
                                <Icon name="check" size={14} className="rounded-full bg-(--brand-color)/10 p-0.5" />
                                <span className="text-[10px] font-bold uppercase tracking-tight">Verified</span>
                            </div>
                        )}
                    </div>
                    <time className="text-xs text-(--neutral-color) opacity-70" dateTime={date}>
                        {date}
                    </time>
                </div>

                {/* Dynamic Star Rating */}
                <div
                    className="flex items-center gap-0.5"
                    aria-label={`Rated ${rating} out of 5 stars`}
                >
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Icon
                            key={index}
                            name="star"
                            size={16}
                            className={clsx(
                                index < rating ? 'text-(--warning) fill-(--warning)' : 'text-(--toggle-bg)'
                            )}
                        />
                    ))}
                </div>
            </div>

            <p className="text-sm leading-relaxed text-(--neutral-color)">
                {comment}
            </p>

            {/* Action Group: Leveraging Button component for standardized micro-interactions */}
            <div className="mt-2 flex items-center gap-2 border-t border-(--toggle-bg) pt-4">
                <Button
                    variant="ghost"
                    size="sm"
                    icon="plus"
                    className="text-xs text-(--neutral-color) hover:text-(--brand-color) !px-2"
                >
                    Helpful
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-(--neutral-color) hover:text-(--error) !px-2"
                >
                    Report
                </Button>
            </div>
        </article>
    );
}
