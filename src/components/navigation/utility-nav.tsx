// src/components/navigation/utility-nav.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui/icon/icon';
import { useAppSelector } from '@/store/hooks';
import { selectCartTotalQuantity } from '@/features/cart/cart-selectors';
import { selectWishlistCount } from '@/features/wishlist/wishlist-selectors';
import { utilityNavLinks } from './nav-links';

export const UtilityNav = () => {
  const pathname = usePathname();

  // Memoized Selectors
  const cartCount = useAppSelector(selectCartTotalQuantity);
  const wishlistCount = useAppSelector(selectWishlistCount);

  return (
    <nav aria-label="Utility navigation">
      <ul className="flex items-center space-x-1">
        {utilityNavLinks.map((item) => {
          const isActive = pathname === item.href;
          const isCart = item.iconName === 'cart';
          const isWishlist = item.iconName === 'heart';

          // Determine the appropriate count for the badge
          const count = isCart ? cartCount : isWishlist ? wishlistCount : 0;
          const hasBadge = count > 0;

          return (
            <li key={item.id} className="relative">
              <Link
                href={item.href}
                className={clsx(
                  'group flex items-center justify-center rounded-full p-2',
                  'focus-ring',
                  'transition-colors duration-(--duration-long) ease-(--transition-ease-in-out)',
                  'hover:bg-(--toggle-hover-bg)',
                  { 'bg-(--toggle-bg-active)': isActive }
                )}
                aria-current={isActive ? 'page' : undefined}
                aria-label={hasBadge ? `${item.label}, ${count} items` : item.label}
              >
                <Icon
                  name={item.iconName}
                  label={item.label}
                  className={clsx(
                    'h-6 w-6 transition-colors duration-(--duration-long)',
                    isActive ? 'text-(--brand-color)' : 'text-(--neutral-color)',
                    'group-hover:text-(--icon-hover-color)'
                  )}
                />

                {/* Dynamic Notification Badge for Cart and Wishlist */}
                {hasBadge && (
                  <span
                    className={clsx(
                      "absolute top-1 right-1 flex h-4.5 min-w-[1.125rem] items-center justify-center rounded-full px-1",
                      "bg-(--brand-color) text-(--text-on-brand) text-[9px] font-bold tabular-nums ring-2 ring-(--background)",
                      "animate-in zoom-in duration-300"
                    )}
                    aria-hidden="true"
                  >
                    {count > 99 ? '99+' : count}
                  </span>
                )}

                <span className="sr-only">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
