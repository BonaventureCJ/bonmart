// src/components/product/product-review-card.tsx

'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';
import { Button } from '@/components/ui/button/button';

interface ProductReviewCardProps {
    author: string;
    rating: number;
    date: string;
    content: string;
    isVerified?: boolean;
    helpfulCount?: number;
    className?: string;
}

/**
 * ProductReviewCard Component
 * 
 * Specifically designed for product-level social proof.
 * Features:
 * - Schema.org Structured Data (Review) for SEO rich snippets.
 * - Verified buyer badge using brand-primary colors.
 * - Design-system-compliant "Helpful" voting mechanism.
 */
export const ProductReviewCard = React.memo(function ProductReviewCard({
    author,
    rating,
    date,
    content,
    isVerified = false,
    helpfulCount = 0,
    className,
}: ProductReviewCardProps) {
    // Local state for the "Helpful" toggle to provide immediate feedback
    const [hasVoted, setHasVoted] = React.useState(false);

    return (
        <article
            className={clsx(
                'flex flex-col gap-4 rounded-2xl border border-toggle-bg bg-background p-5 transition-shadow hover:shadow-sm sm:p-6',
                className
            )}
            itemProp="review"
            itemScope
            itemType="https://schema.org"
        >
            {/* 1. Review Header: Stars & Date */}
            <header className="flex flex-wrap items-center justify-between gap-2">
                <div
                    className="flex items-center gap-0.5"
                    aria-label={`Rated ${rating} out of 5 stars`}
                    itemProp="reviewRating"
                    itemScope
                    itemType="https://schema.org"
                >
                    <meta itemProp="ratingValue" content={rating.toString()} />
                    <meta itemProp="bestRating" content="5" />
                    {[...Array(5)].map((_, i) => (
                        <Icon
                            key={i}
                            name="star"
                            className={clsx(
                                'h-4 w-4',
                                // Using semantic warning token and surface-muted for empty stars
                                i < rating ? 'fill-warning text-warning' : 'text-surface-muted'
                            )}
                        />
                    ))}
                </div>
                <time
                    dateTime={date}
                    className="text-xs font-medium text-neutral-color"
                    itemProp="datePublished"
                >
                    {date}
                </time>
            </header>

            {/* 2. Author Info */}
            <div className="flex items-center gap-2">
                <span className="font-bold text-foreground" itemProp="author" itemScope itemType="https://schema.org">
                    <span itemProp="name">{author}</span>
                </span>
                {isVerified && (
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-tight text-brand-color">
                        <Icon name="check" className="h-3 w-3" />
                        Verified Buyer
                    </span>
                )}
            </div>

            {/* 3. Review Content */}
            <div className="text-sm leading-relaxed text-neutral-color md:text-base">
                <p itemProp="reviewBody">{content}</p>
            </div>

            {/* 4. Footer: Feedback Actions */}
            <footer className="mt-2 flex items-center justify-between border-t border-toggle-bg pt-4">
                <div className="flex items-center gap-4">
                    <span className="text-xs font-medium text-neutral-color">
                        Was this helpful?
                    </span>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            icon="plus"
                            onClick={() => setHasVoted(!hasVoted)}
                            className={clsx(
                                'h-8 px-3 text-xs transition-all',
                                // Using semantic brand-color and opacity shorthand
                                hasVoted ? 'bg-brand-color/10 text-brand-color' : 'text-neutral-color'
                            )}
                            ariaLabel="Mark as helpful"
                        >
                            {hasVoted ? helpfulCount + 1 : helpfulCount}
                        </Button>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-neutral-color hover:text-foreground"
                >
                    Report
                </Button>
            </footer>
        </article>
    );
});

ProductReviewCard.displayName = 'ProductReviewCard';
