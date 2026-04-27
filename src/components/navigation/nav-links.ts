// src/components/navigation/nav-links.ts

import { type IconName } from '@/components/ui/icon/icon';

export interface NavItem {
  id: number;
  label: string;
  href: string;
}

export interface UtilityNavItem extends NavItem {
  iconName: IconName;
}

export const mainNavLinks: NavItem[] = [
  { id: 1, label: 'Products', href: '/products' },
  { id: 2, label: 'About', href: '/about' },
  { id: 3, label: 'Services', href: '/services' },
  { id: 4, label: 'Contact', href: '/contact' },
];

export const utilityNavLinks: UtilityNavItem[] = [
  // { id: 4, label: 'Search', iconName: 'search', href: '/search' },
  { id: 1, label: 'Account', iconName: 'user', href: '/account' },
  { id: 2, label: 'Wishlist', iconName: 'heart', href: '/wishlist' },
  { id: 3, label: 'Cart', iconName: 'cart', href: '/cart' },
];
