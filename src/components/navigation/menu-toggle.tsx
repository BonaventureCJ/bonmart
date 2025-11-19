// src/components/navigation/menu-toggle.tsx
'use client';

import { FC } from 'react';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui/icon/icon';
import { useMobileNav } from './mobile-nav-context';

export const MenuToggle: FC = () => {
  const { isOpen, toggle } = useMobileNav();

  return (
    <div className="md:hidden">
      <button
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        type="button"
        className={clsx(
          'flex items-center justify-center rounded-full p-1',
          'focus-ring',
          'transition-colors duration-long',
          'hover:bg-toggle-bg',
          'cursor-pointer'
        )}
      >
        <Icon
          name={isOpen ? 'close' : 'menu'}
          label={isOpen ? 'Close menu' : 'Open menu'}
          className="h-6 w-6 text-neutral"
        />
        <span className="sr-only">{isOpen ? 'Close mobile menu' : 'Open mobile menu'}</span>
      </button>
    </div>
  );
};

