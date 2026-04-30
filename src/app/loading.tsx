// src/app/loading.tsx

import PageContainer from '@/components/layout/page-container';
import { Icon } from '@/components/ui/icon/icon';
import { Brand } from '@/components/branding/brand';
import { Heading } from '@/components/ui/heading/heading';

/**
 * Global Loading Component
 * Integrated with PageContainer for alignment and Heading for semantic hierarchy.
 */
export default function Loading() {
    return (
        <PageContainer>
            <section
                className="flex min-h-[65vh] flex-col items-center justify-center text-center"
                aria-busy="true"
                aria-live="polite"
            >
                <div className="flex flex-col items-center gap-6">
                    <div className="relative flex items-center justify-center">
                        <Icon
                            name="loader"
                            size={56}
                            className="text-(--brand-color) animate-spin"
                            aria-hidden="true"
                        />
                        <div className="absolute h-14 w-14 rounded-full bg-(--brand-color)/10 animate-pulse" />
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <Brand logoSize="sm" className="pointer-events-none" />

                        <Heading
                            level={4}
                            weight="medium"
                            className="text-(--neutral-color) opacity-70"
                        >
                            Cultivating your experience...
                        </Heading>
                    </div>
                </div>

                <span className="sr-only">BonMart is loading, please wait...</span>
            </section>
        </PageContainer>
    );
}
