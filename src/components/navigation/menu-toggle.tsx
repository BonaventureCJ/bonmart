// src/components/navigation/menu-toggle.tsx
'use client';

import { FC } from 'react';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui/icon/icon';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleMobileMenu } from '@/features/navigation/navigation-slice';

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
          'transition-colors duration-100',
          'hover:bg-(--toggle-hover-bg)',
          {
            'bg-(--toggle-bg-active)': isOpen,
          },
        )}
      >
        <Icon
          name={isOpen ? 'close' : 'menu'}
          label={isOpen ? 'Close menu' : 'Open menu'}
          className={clsx('h-6 w-6', {
            'text-(--brand-color)': isOpen,
            'text-(--neutral-color)': !isOpen,
          })}
        />
        <span className="sr-only">{isOpen ? 'Close mobile menu' : 'Open mobile menu'}</span>
      </button>
    </div>
  );
};
