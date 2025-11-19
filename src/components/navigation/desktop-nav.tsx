// src/components/navigation/desktop-nav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { mainNavLinks } from './links';

export const DesktopNav = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden md:block" aria-label="Main desktop navigation">
      <ul className="flex items-center space-x-6">
        {mainNavLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.id}>
              <Link
                href={link.href}
                className={clsx(
                  'relative py-2 font-medium text-neutral',
                  'transition-colors duration-long focus-ring',
                  'hover:text-foreground',
                  {
                    'text-foreground': isActive,
                  },
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-brand-color"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

