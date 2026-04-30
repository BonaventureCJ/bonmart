// src/components/layout/layout-wrapper.tsx

'use client';

import { useState, useEffect, type FC, type ReactNode } from 'react';
import { clsx } from 'clsx';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { MobileNav } from '@/components/navigation/mobile-nav';
import { closeMobileMenu } from '@/features/navigation/navigation-slice';
import { useMobileMenuHeight } from '@/hooks/use-mobile-menu-height';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeaderScrollContainer } from '@/components/layout/header-scroll-container';

type LayoutWrapperProps = {
    children: ReactNode;
};

export const LayoutWrapper: FC<LayoutWrapperProps> = ({ children }) => {
    const isMobileMenuOpen = useAppSelector((state) => state.navigation.isMobileMenuOpen);
    const dispatch = useAppDispatch();

    // Enterprise Pattern: Detect mobile via matchMedia to align with Tailwind breakpoints
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1023px)'); // Matches Tailwind's lg breakpoint
        setIsMobile(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    useMobileMenuHeight();

    const handleOverlayClick = () => {
        dispatch(closeMobileMenu());
    };

    return (
        <>
            {/* 
                Wrap Header in the Scroll Container. 
                Header remains a Server Component passed as a child. 
            */}
            <HeaderScrollContainer isMobile={isMobile}>
                <Header />
            </HeaderScrollContainer>

            {isMobileMenuOpen && (
                <div
                    className="bg-(--overlay-bg) fixed inset-0 z-40 transition-opacity duration-300 md:hidden"
                    aria-hidden="true"
                    onClick={handleOverlayClick}
                />
            )}

            <div
                className={clsx(
                    'grid min-h-screen grid-rows-[1fr_auto]',
                    'pt-(--header-height)', // Standard offset
                    { 'pointer-events-none md:pointer-events-auto': isMobileMenuOpen }
                )}
                aria-hidden={isMobileMenuOpen}
            >
                <main className="page-section flex w-full flex-col overflow-x-hidden px-4 sm:px-6 lg:px-8">
                    {children}
                </main>
                <Footer />
            </div>

            <MobileNav />
        </>
    );
};
