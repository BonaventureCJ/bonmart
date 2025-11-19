// src/components/layout/header.tsx
import type { FC } from 'react';
import clsx from 'clsx';
import { Brand } from '@/components/branding/brand';
import { UtilityNav } from '@/components/navigation/utility-nav'; // Corrected import path based on best practices

export const Header: FC = () => {
    return (
        <header
            className={clsx(
                'sticky top-0 z-50 w-full',
                'bg-background/80 backdrop-blur-md',
                'border-b border-b-footer',
            )}
        >
            <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
                <Brand />
                <UtilityNav /> {/* Render the component */}
            </div>
        </header>
    );
};
