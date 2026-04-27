// src/components/layout/header.tsx

import { FC, Suspense } from 'react';
import clsx from 'clsx';
import { Brand } from '@/components/branding/brand';
import { UtilityNav } from '@/components/navigation/utility-nav';
import { MenuToggle } from '@/components/navigation/menu-toggle';
import { DesktopNav } from '@/components/navigation/desktop-nav';
import { SearchForm } from '@/components/search/search-form';

export const Header: FC = () => {
    return (
        <header
            className={clsx(
                'sticky top-0 z-60 w-full',
                'bg-(--background)',
                'border-b border-b-(--footer-border)'
            )}
        >
            <div className="mx-auto flex w-full max-w-7xl flex-col px-2 md:px-6">

                {/* 1. Main Row: Logo, Search (Desktop), and Actions */}
                <div className="flex h-16 items-center justify-between gap-4">

                    {/* Left Section */}
                    <div className="flex items-center space-x-1 shrink-0">
                        <MenuToggle />
                        <Brand responsive={true} />
                    </div>

                    {/* Middle: Search Form (Desktop) wrapped in Suspense */}
                    <div className="hidden flex-1 justify-center lg:flex">
                        <Suspense fallback={<div className="h-10 w-full max-w-md animate-pulse rounded-full bg-(--surface-muted)" />}>
                            <SearchForm className="max-w-md xl:max-w-lg" />
                        </Suspense>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-2 shrink-0">
                        <div className="hidden md:block">
                            <DesktopNav />
                        </div>
                        <UtilityNav />
                    </div>
                </div>

                {/* 2. Secondary Row: Search Form (Mobile) wrapped in Suspense */}
                <div className="pb-3 lg:hidden">
                    <div className="w-full px-1">
                        <Suspense fallback={<div className="h-10 w-full animate-pulse rounded-full bg-(--surface-muted)" />}>
                            <SearchForm className="max-w-full" />
                        </Suspense>
                    </div>
                </div>
            </div>
        </header>
    );
};
