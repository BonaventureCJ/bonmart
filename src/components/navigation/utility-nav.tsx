// src/components/navigation/utility-nav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui/icon/icon';
import { utilityNavLinks } from './links';

export const UtilityNav = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Utility navigation">
      <ul className="flex items-center space-x-1">
        {utilityNavLinks.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.id}>
              <Link
                href={item.href}
                className={clsx(
                  'group flex items-center justify-center rounded-full p-2',
                  'focus-ring',
                  'transition-colors duration-100',
                  'hover:bg-(--toggle-hover-bg)',
                  { 'bg-(--toggle-bg-active)': isActive }
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon
                  name={item.iconName}
                  label={item.label}
                  className={clsx(
                    'h-6 w-6',
                    isActive ? 'text-(--brand-color)' : 'text-(--neutral-color)',
                    'group-hover:text-(--icon-hover-color)',
                    'transition-colors duration-100'
                  )}
                />
                <span className="sr-only">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
