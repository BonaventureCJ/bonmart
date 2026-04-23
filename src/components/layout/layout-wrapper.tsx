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
 * A client component that wraps the main content and handles layout structure.
 * Implements a sticky footer pattern using CSS Grid and proper content alignment.
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
                <main
                    className="pt-(--header-height) flex w-full flex-col px-4 pb-16 md:px-6 lg:px-8"
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
