// src/components/navigation/utility-nav.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { Icon, type IconName } from '@/components/ui/icon/icon';

// Define the data structure for utility navigation items.
type UtilityNavItem = {
  id: number;
  label: string;
  iconName: IconName; // Correctly typed from icons.ts
  href: string;
};

const utilityNavItems: UtilityNavItem[] = [
  {
    id: 1,
    label: 'Search',
    iconName: 'search',
    href: '/search',
  },
  {
    id: 2,
    label: 'Account',
    iconName: 'user',
    href: '/account',
  },
  {
    id: 3,
    label: 'Wishlist',
    iconName: 'heart',
    href: '/wishlist',
  },
  {
    id: 4,
    label: 'Cart',
    iconName: 'cart',
    href: '/cart',
  },
];

export const UtilityNav = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Utility navigation">
      <ul className="flex items-center space-x-1">
        {utilityNavItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.id}>
              <Link
                href={item.href}
                className={clsx(
                  'flex items-center justify-center rounded-full p-2',
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
                  className="h-6 w-6 text-(--neutral-color)"
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
