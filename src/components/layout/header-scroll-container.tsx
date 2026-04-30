// src/components/layout/header-scroll-container.tsx

'use client';

import { FC, ReactNode } from 'react';
import { clsx } from 'clsx';
import { useScrollDirection } from '@/hooks/use-scroll-direction';

interface HeaderScrollContainerProps {
    children: ReactNode;
    isMobile: boolean;
}

/**
 * Client-side animation wrapper for the Server Component Header.
 * Handles translation logic based on scroll direction.
 */
export const HeaderScrollContainer: FC<HeaderScrollContainerProps> = ({
    children,
    isMobile,
}) => {
    // Hook activates scroll tracking logic only if on a mobile device
    const scrollDirection = useScrollDirection(isMobile);

    // Logic: Only hide if we are on mobile AND the user is scrolling down
    const isHidden = isMobile && scrollDirection === 'down';

    return (
        <div
            className={clsx(
                'fixed inset-x-0 top-0 z-60 w-full transition-transform duration-300 ease-(--transition-ease-in-out)',
                isHidden ? '-translate-y-full' : 'translate-y-0'
            )}
        >
            {children}
        </div>
    );
};
