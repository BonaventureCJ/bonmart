// src/app/loading.tsx

import PageContainer from '@/components/layout/page-container';
import { Icon } from '@/components/ui/icon/icon';
import { Brand } from '@/components/branding/brand';

/**
 * Global Loading Component
 * Standardized transition state using the central Brand identity.
 */
export default function Loading() {
  return (
    <PageContainer>
      <section 
        className="flex min-h-[60vh] flex-col items-center justify-center text-center"
        aria-busy="true"
        aria-live="polite"
      >
        <div className="flex flex-col items-center gap-6">
          {/* Brand-themed loader with optimized motion */}
          <div className="relative flex items-center justify-center">
            <Icon 
              name="loader" 
              size={56} 
              className="animate-spin text-(--brand-color)" 
              aria-hidden="true"
            />
            {/* Pulsing halo for enterprise visual depth */}
            <div className="absolute h-14 w-14 animate-pulse rounded-full bg-(--brand-color)/10" />
          </div>

          <div className="flex flex-col items-center gap-2">
            {/* Using the centralized Brand component (Non-responsive to ensure it shows on mobile) */}
            <Brand logoSize="sm" className="pointer-events-none" />
            
            <p className="text-sm font-medium tracking-tight text-(--neutral-color) opacity-70">
              Cultivating your experience...
            </p>
          </div>
        </div>

        {/* Hidden but accessible status for screen readers */}
        <span className="sr-only">BonMart is loading, please wait...</span>
      </section>
    </PageContainer>
  );
}
