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
                  'relative py-2 font-medium',
                  'transition-colors duration-long focus-ring',
                  'after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-brand after:transition-transform after:duration-long after:content-[""]',
                  'hover:text-brand hover:after:scale-x-100',
                  {
                    'text-brand after:scale-x-100': isActive,
                    'text-neutral': !isActive,
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
  );
};
