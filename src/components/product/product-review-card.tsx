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
                'bg-(--surface-raised) ease-(--transition-ease-in-out)',
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
                                role="note"
                            >
                                <Icon name="leaf" size={14} className="rounded-full bg-(--brand-color)/10 p-0.5" />
                                <span className="text-[10px] font-bold uppercase tracking-tight">Verified</span>
                            </div>
                        )}
                    </div>
                    <time className="text-xs text-(--neutral-color) opacity-70" dateTime={date}>
                        {date}
                    </time>
                </div>
                <div
                    className="flex items-center gap-0.5"
                    role="img"
                    aria-label={`Rated ${rating} out of 5 stars`}
                >
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Icon
                            key={index}
                            name="star"
                            size={16}
                            className={clsx(
                                index < rating ? 'text-(--warning) fill-current' : 'text-(--toggle-bg)'
                            )}
                        />
                    ))}
                </div>
            </div>

            <p className="text-sm leading-relaxed text-(--neutral-color)">
                {comment}
            </p>

            {/* Action Group */}
            <div className="mt-2 flex items-center gap-2 border-t border-(--toggle-bg) pt-4">
                <Button
                    variant="ghost"
                    size="sm"
                    icon="plus"
                    className="!px-2 text-xs text-(--neutral-color) hover:text-(--brand-color)"
                    ariaLabel="Mark this review as helpful"
                >
                    Helpful
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="!px-2 text-xs text-(--neutral-color) hover:text-(--error)"
                    ariaLabel="Report this review"
                >
                    Report
                </Button>
            </div>
        </article>
    );
}
