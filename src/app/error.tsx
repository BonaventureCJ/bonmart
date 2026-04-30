// src/app/error.tsx

'use client';

import { useEffect, useTransition } from 'react'; // Added useTransition
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading/heading';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon/icon';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        // Enterprise Logging (Sentry/LogRocket/Datadog)
        console.error('Bonmart System Error:', error);
    }, [error]);

    const handleReset = () => {
        startTransition(() => {
            reset();
        });
    };

    return (
        <PageContainer>
            <section
                className="page-section flex min-h-[60vh] flex-col items-center justify-center px-4 text-center"
                aria-labelledby="error-heading"
            >
                {/* 
                   Using your @theme variables. 
                   Note: ensure animate-pulse is used sparingly for WCAG (prefers-reduced-motion) 
                */}
                <div className="mb-8 rounded-full bg-(--error-muted) p-6 motion-safe:animate-pulse">
                    <Icon
                        name="alertCircle"
                        size={64}
                        className="text-(--error)"
                        aria-hidden="true"
                    />
                </div>

                <header className="max-w-2xl space-y-4">
                    <Heading level={1} weight="bold" id="error-heading">
                        Unexpected System Interruption
                    </Heading>

                    <p className="text-lg text-(--neutral-color) leading-relaxed text-balance">
                        We apologize for the inconvenience. Our systems encountered a
                        temporary hurdle while processing your sustainable shopping request.
                    </p>

                    {error.digest && (
                        <p className="font-mono text-[10px] tracking-tighter uppercase opacity-40 text-(--neutral-color)">
                            Error Reference: <span className="select-all">{error.digest}</span>
                        </p>
                    )}
                </header>

                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleReset}
                        icon={isPending ? "loader" : "refresh"} // Context-aware icon
                        iconPlacement="left"
                        disabled={isPending}
                    >
                        {isPending ? 'Attempting Recovery...' : 'Try Again'}
                    </Button>

                    <Button
                        href="/"
                        variant="secondary"
                        size="lg"
                        icon="home"
                    >
                        Return Home
                    </Button>
                </div>

                <p className="mt-8 text-xs italic opacity-60 text-(--neutral-color)">
                    Our environmental specialists have been notified of this disruption.
                </p>
            </section>
        </PageContainer>
    );
}
