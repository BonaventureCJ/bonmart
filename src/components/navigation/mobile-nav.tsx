// src/components/navigation/mobile-nav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import clsx from 'clsx';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { closeMobileMenu } from '@/features/navigation/navigation-slice';
import { mainNavLinks } from './links';

/**
 * Mobile navigation component that displays a 3/4 width, slide-in menu on small devices.
 * @returns {JSX.Element} The MobileNav component.
 */
export const MobileNav = () => {
  const dispatch = useAppDispatch();
  const isMobileMenuOpen = useAppSelector(
    (state) => state.navigation.isMobileMenuOpen,
  );
  const pathname = usePathname();

  // Close the menu if the route changes
  useEffect(() => {
    dispatch(closeMobileMenu());
  }, [pathname, dispatch]);

  const handleLinkClick = () => {
    dispatch(closeMobileMenu());
  };

  return (
    <div
      className={clsx(
        'fixed left-0 z-50 w-3/4 transform transition-transform duration-300 md:hidden',
        'bg-background',
        'top-16 overflow-y-auto',
        'h-[calc(var(--vh)-4rem)]',
        {
          'translate-x-0': isMobileMenuOpen,
          '-translate-x-full': !isMobileMenuOpen,
        },
      )}
      role="dialog"
      aria-modal={isMobileMenuOpen}
      id="mobile-menu"
      tabIndex={isMobileMenuOpen ? 0 : -1}
    >
      <div className="flex h-full flex-col px-4 pb-4 pt-4">
        <nav aria-label="Main mobile navigation">
          <ul className="flex flex-col space-y-2">
            {mainNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    onClick={handleLinkClick}
                    className={clsx(
                      'block rounded-md px-2 py-3 text-2xl font-bold transition-colors duration-long',
                      'focus-ring',
                      'hover:text-brand',
                      {
                        'text-brand': isActive,
                        'text-foreground': !isActive,
                      },
                    )}
                    aria-current={
                      isActive ? 'page' : undefined
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};
