// src/components/navigation/menu-toggle.tsx

'use client';

import { FC } from 'react';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui/icon/icon';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleMobileMenu } from '@/features/navigation/navigation-slice';

/**
 * MenuToggle Component
 * 
 * NOTE: This component intentionally uses a native <button> element instead of the 
 * reusable <Button /> component. This is due to specific UI/UX requirements for 
 * the mobile navigation state management and to prevent layout shifts or 
 * conflicting variant styles during menu transitions.
 */
export const MenuToggle: FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.navigation.isMobileMenuOpen);

  const handleToggle = () => {
    dispatch(toggleMobileMenu());
  };

  return (
    <div className="md:hidden">
      <button
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        type="button"
        className={clsx(
          'flex items-center justify-center rounded-full p-2',
          'focus-ring',
          'transition-colors duration-(--duration-long) ease-(--transition-ease-in-out)',
          'cursor-pointer',
          {
            'bg-(--toggle-bg-active) text-(--brand-color)': isOpen,
            'text-(--neutral-color) hover:bg-(--toggle-hover-bg) hover:text-(--brand-color)': !isOpen,
          },
        )}
      >
        <Icon
          name={isOpen ? 'close' : 'menu'}
          label={isOpen ? 'Close menu' : 'Open menu'}
          className="h-6 w-6"
        />
        <span className="sr-only">{isOpen ? 'Close mobile menu' : 'Open mobile menu'}</span>
      </button>
    </div>
  );
};
