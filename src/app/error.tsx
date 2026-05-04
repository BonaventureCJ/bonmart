// src/app/error.tsx

'use client';

import { useEffect, useTransition } from 'react';
import * as Sentry from "@sentry/nextjs";
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading/heading';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon/icon';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

/**
 * Enterprise Error Boundary for Bonmart
 * Logic: Captured by Sentry (All envs), Console Logged (Dev only)
 * Principles: Semantic HTML, WCAG Accessibilty, SRP
 */
export default function Error({ error, reset }: ErrorProps) {
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        // Log to Sentry for enterprise-grade observability
        Sentry.captureException(error, {
            extra: { digest: error.digest },
        });
        
        // Clean console for production: only log in development mode
        if (process.env.NODE_ENV === 'development') {
            console.error('Bonmart System Error [DEV]:', error);
        }
    }, [error]);

    return (
        <PageContainer>
            <section
                className="flex min-h-[65vh] flex-col items-center justify-center text-center page-section"
                aria-labelledby="error-heading"
                role="alert"
            >
                {/* Visual Feedback using Tailwind 4 Variables */}
                <div className="mb-8 rounded-full bg-(--error-muted) p-6 motion-safe:animate-pulse">
                    <Icon 
                        name="alertCircle" 
                        size={64} 
                        className="text-(--error)" 
                        aria-hidden="true" 
                    />
                </div>

                <div className="max-w-2xl space-y-4">
                    <Heading level={1} weight="bold" id="error-heading">
                        Unexpected System Interruption
                    </Heading>

                    <p className="text-lg text-(--neutral-color) leading-relaxed text-balance">
                        We apologize for the inconvenience. Our systems encountered a
                        temporary hurdle while processing your sustainable shopping request.
                    </p>

                    {error.digest && (
                        <p className="font-mono text-[10px] uppercase opacity-40 text-(--neutral-color) tracking-tighter">
                            Error Reference: <span className="select-all">{error.digest}</span>
                        </p>
                    )}
                </div>

                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => startTransition(() => reset())}
                        icon={isPending ? 'loader' : 'refresh'}
                        loading={isPending}
                        className="focus-ring"
                    >
                        {isPending ? 'Attempting Recovery...' : 'Try Again'}
                    </Button>

                    <Button 
                        href="/" 
                        variant="secondary" 
                        size="lg" 
                        icon="home"
                        className="focus-ring"
                    >
                        Return Home
                    </Button>
                </div>
            </section>
        </PageContainer>
    );
}
