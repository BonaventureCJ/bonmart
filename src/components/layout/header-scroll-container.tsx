// src/components/layout/header-scroll-container.tsx

'use client';

import { forwardRef, ReactNode } from 'react';
import { clsx } from 'clsx';
import { useScrollDirection } from '@/hooks/use-scroll-direction';

interface HeaderScrollContainerProps {
    children: ReactNode;
    isMobile: boolean;
}

/**
 * Client-side animation wrapper for the Server Component Header.
 * Handles translation logic based on scroll direction.
 * Forwards Ref to measure total dynamic height.
 */
export const HeaderScrollContainer = forwardRef<HTMLDivElement, HeaderScrollContainerProps>(
    ({ children, isMobile }, ref) => {
        // Hook activates scroll tracking logic only if on a mobile device
        const scrollDirection = useScrollDirection(isMobile);

        // Logic: Only hide if we are on mobile AND the user is scrolling down
        const isHidden = isMobile && scrollDirection === 'down';

        return (
            <div
                ref={ref}
                className={clsx(
                    'fixed inset-x-0 top-0 z-60 w-full transition-transform duration-300 ease-(--transition-ease-in-out)',
                    isHidden ? '-translate-y-full' : 'translate-y-0'
                )}
            >
                {children}
            </div>
        );
    }
);

HeaderScrollContainer.displayName = 'HeaderScrollContainer';
