// src/components/layout/header.tsx
import type { FC } from 'react';
import clsx from 'clsx';
import { Brand } from '@/components/branding/brand';
import { UtilityNav } from '@/components/navigation/utility-nav';
import { MenuToggle } from '@/components/navigation/menu-toggle';
import { DesktopNav } from '@/components/navigation/desktop-nav';

export const Header: FC = () => {
    return (
        <header
            className={clsx(
                'sticky top-0 z-[60] w-full', // Increased z-index to a higher value
                'bg-background',
                'border-b border-b-footer',
            )}
        >
            <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-2 md:px-6">
                <div className="flex items-center space-x-1">
                    <MenuToggle />
                    <Brand />
                </div>
                <div className="flex items-center space-x-2">
                    <DesktopNav />
                    <UtilityNav />
                </div>
            </div>
        </header>
    );
};
