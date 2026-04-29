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
 * - Uses CSS Grid (auto_1fr_auto) for sticky footer management.
 * - Implements standardized vertical rhythm via the page-section utility.
 * - Handles mobile navigation state and accessibility overlays.
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

            {/* Mobile Overlay: Theme-aware via globals.css variable */}
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
                  Semantic Main:
                  - page-section: Applies standardized py based on enterprise tokens.
                  - px: Responsive horizontal gutters.
                */}
                <main
                    className={clsx(
                        "flex w-full flex-col overflow-x-hidden",
                        "page-section px-4 sm:px-6 lg:px-8"
                    )}
                >
                    {children}
                </main>

                <Footer />
            </div>

            <MobileNav />
        </>
    );
};
