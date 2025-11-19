// src/components/navigation/links.ts

export type NavItem = {
  id: number;
  label: string;
  href: string;
};

// Main navigation links for products, about, services, and contact.
export const mainNavLinks: NavItem[] = [
  { id: 1, label: 'Products', href: '/products' },
  { id: 2, label: 'About', href: '/about' },
  { id: 3, label: 'Services', href: '/services' },
  { id: 4, label: 'Contact', href: '/contact' },
];
