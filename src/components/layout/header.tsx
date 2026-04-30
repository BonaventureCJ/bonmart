// src/components/layout/header.tsx

'use client';

import { FC, Suspense } from 'react';
import { clsx } from 'clsx';
import { Brand } from '@/components/branding/brand';
import { UtilityNav } from '@/components/navigation/utility-nav';
import { MenuToggle } from '@/components/navigation/menu-toggle';
import { DesktopNav } from '@/components/navigation/desktop-nav';
import { SearchForm } from '@/components/search/search-form';
import { useScrollDirection } from '@/hooks/use-scroll-direction';

interface HeaderProps {
    isMobile?: boolean;
}

/**
 * Enterprise Header Component.
 * 
 * Behavior:
 * - Mobile: Slides up when scrolling down, slides down when scrolling up.
 * - Desktop: Remains fixed at the top for persistent navigation.
 * - Performance: Uses CSS hardware acceleration (translate-y) for 60fps transitions.
 */
export const Header: FC<HeaderProps> = ({ isMobile = false }) => {
    // Hook activates scroll tracking logic only if on a mobile device
    const scrollDirection = useScrollDirection(isMobile);

    // Logic: Only hide if we are on mobile AND the user is scrolling down
    const isHidden = isMobile && scrollDirection === 'down';

    return (
        <header
            className={clsx(
                // Core Layout & Transition
                'fixed inset-x-0 top-0 z-60 w-full transition-transform duration-300 ease-(--transition-ease-in-out)',
                // Theming & Border
                'bg-(--background) border-b border-b-(--footer-border) backdrop-blur-md bg-opacity-95',
                // Dynamic Visibility
                isHidden ? '-translate-y-full' : 'translate-y-0'
            )}
        >
            <div className="mx-auto flex w-full max-w-7xl flex-col px-2 md:px-6">

                {/* 1. Main Row: Logo, Search (Desktop), and Actions */}
                <div className="flex h-16 items-center justify-between gap-4">

                    {/* Left Section: Branding and Mobile Trigger */}
                    <div className="flex shrink-0 items-center space-x-1">
                        <MenuToggle />
                        <Brand responsive={true} />
                    </div>

                    {/* Middle: Search Form (Desktop only) wrapped in Suspense for Next.js 15+ stability */}
                    <div className="hidden flex-1 justify-center lg:flex">
                        <Suspense
                            fallback={
                                <div className="h-10 w-full max-w-md animate-pulse rounded-full bg-(--surface-muted)" />
                            }
                        >
                            <SearchForm className="max-w-md xl:max-w-lg" />
                        </Suspense>
                    </div>

                    {/* Right Section: Navigation & Cart/User Utilities */}
                    <div className="flex shrink-0 items-center space-x-2">
                        <div className="hidden md:block">
                            <DesktopNav />
                        </div>
                        <UtilityNav />
                    </div>
                </div>

                {/* 2. Secondary Row: Search Form (Mobile only) */}
                <div className="pb-3 lg:hidden">
                    <div className="w-full px-1">
                        <Suspense
                            fallback={
                                <div className="h-10 w-full animate-pulse rounded-full bg-(--surface-muted)" />
                            }
                        >
                            <SearchForm className="max-w-full" />
                        </Suspense>
                    </div>
                </div>

            </div>
        </header>
    );
};
