// src/components/layout/layout-wrapper.tsx

'use client';

import type { FC, ReactNode } from 'react';
import { clsx } from 'clsx';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { MobileNav } from '@/components/navigation/mobile-nav';
import { closeMobileMenu } from '@/features/navigation/navigation-slice';
import { useMobileMenuHeight } from '@/hooks/use-mobile-menu-height';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

type LayoutWrapperProps = {
    children: ReactNode;
};

/**
 * Enterprise Layout Wrapper.
 * 
 * Architecture:
 * - Uses CSS Grid (auto_1fr_auto) to manage header/content/footer flow without pt offsets.
 * - Implements fluid vertical and horizontal padding for a premium UI feel.
 * - Ensures semantic integrity and proper overlay management.
 */
export const LayoutWrapper: FC<LayoutWrapperProps> = ({ children }) => {
    const isMobileMenuOpen = useAppSelector(
        (state) => state.navigation.isMobileMenuOpen,
    );
    const dispatch = useAppDispatch();

    useMobileMenuHeight();

    const handleOverlayClick = () => {
        dispatch(closeMobileMenu());
    };

    return (
        <>
            <Header />

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="bg-(--overlay-bg) fixed inset-0 z-40 transition-opacity duration-300 md:hidden"
                    aria-hidden="true"
                    onClick={handleOverlayClick}
                />
            )}

            <div
                className={clsx(
                    'grid min-h-screen grid-rows-[auto_1fr_auto]',
                    {
                        'pointer-events-none md:pointer-events-auto': isMobileMenuOpen,
                    },
                )}
                aria-hidden={isMobileMenuOpen}
            >
                {/* 
                  1. Semantic Main: No pt offset needed as it's the second row in the grid.
                  2. Padding: Fluid py (vertical) and px (horizontal) for premium spacing.
                */}
                <main
                    className={clsx(
                        "flex w-full flex-col overflow-x-hidden",
                        "px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12"
                    )}
                >
                    <div className="mx-auto w-full max-w-7xl">
                        {children}
                    </div>
                </main>

                <Footer />
            </div>

            <MobileNav />
        </>
    );
};
