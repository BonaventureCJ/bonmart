// src/components/layout/layout-wrapper.tsx
'use client';

import type { FC, ReactNode } from 'react';
import { useAppSelector } from '@/store/hooks';
import { MobileNav } from '@/components/navigation/mobile-nav';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { clsx } from 'clsx';
import { closeMobileMenu } from '@/features/navigation/navigation-slice';
import { useAppDispatch } from '@/store/hooks';
import { useMobileMenuHeight } from '@/hooks/use-mobile-menu-height';

type LayoutWrapperProps = {
    children: ReactNode;
};

/**
 * A client component that wraps the main content and handles mobile navigation state.
 * @param {LayoutWrapperProps} props The component props.
 * @returns {JSX.Element} The LayoutWrapper component.
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
            {isMobileMenuOpen && (
                <div
                    className={clsx(
                        'fixed inset-0 z-40 md:hidden',
                        'bg-(--overlay-bg) transition-opacity duration-300',
                    )}
                    aria-hidden="true"
                    onClick={handleOverlayClick}
                />
            )}
            <div
                className={clsx(
                    'grid min-h-screen grid-rows-[auto_1fr_auto]',
                    {
                        'pointer-events-none md:pointer-events-auto':
                            isMobileMenuOpen,
                    },
                )}
                aria-hidden={isMobileMenuOpen}
            >
                <main className="flex w-full items-center justify-center p-4 sm:p-8">
                    {children}
                </main>
                <Footer />
            </div>
            <MobileNav />
        </>
    );
};
