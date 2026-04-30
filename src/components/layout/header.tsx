// src/components/layout/header.tsx

import { FC, Suspense } from 'react';
import { Brand } from '@/components/branding/brand';
import { UtilityNav } from '@/components/navigation/utility-nav';
import { MenuToggle } from '@/components/navigation/menu-toggle';
import { DesktopNav } from '@/components/navigation/desktop-nav';
import { SearchForm } from '@/components/search/search-form';

/**
 * Enterprise Header Component.
 * 
 * Behavior:
 * - Optimized as a Server Component for reduced bundle size and better SEO.
 * - Structure remains consistent while animation is handled by a parent container.
 * - Performance: HTML is streamed immediately to the browser.
 */
export const Header: FC = () => {
    return (
        <header
            className="bg-(--background) border-b border-b-(--footer-border) backdrop-blur-md bg-opacity-95"
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
