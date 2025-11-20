// src/components/navigation/mobile-nav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { mainNavLinks } from './links';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { closeMobileMenu } from '@/features/navigation/navigation-slice';

export const MobileNav = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.navigation.isMobileMenuOpen);
  const pathname = usePathname();

  // Close the menu if the route changes
  const handleLinkClick = () => {
    dispatch(closeMobileMenu());
  };

  return (
    <div
      className={clsx(
        'fixed inset-0 z-40 transform bg-background transition-transform duration-300 md:hidden',
        {
          'translate-x-0': isOpen,
          'translate-x-full': !isOpen,
        },
      )}
      role="dialog"
      aria-modal={isOpen}
      id="mobile-menu"
    >
      <div className="flex h-full flex-col p-4 pt-16">
        <nav aria-label="Main mobile navigation">
          <ul className="flex flex-col space-y-4">
            {mainNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    onClick={handleLinkClick}
                    className={clsx(
                      'block py-2 text-2xl font-bold transition-colors duration-long focus-ring',
                      'hover:text-brand-color',
                      {
                        'text-brand-color': isActive,
                        'text-foreground': !isActive,
                      },
                    )}
                    aria-current={isActive ? 'page' : undefined}
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


