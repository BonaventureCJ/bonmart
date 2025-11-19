// src/components/navigation/menu-toggle.tsx
'use client';

import { FC, useState } from 'react';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui/icon/icon';

export const MenuToggle: FC = () => {
  // Local state to track whether the menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the state
  const handleToggle = () => {
    setIsOpen(!isOpen);
    // You can optionally add logic here to prevent body scrolling
    // when the menu is open, by modifying the body class.
  };

  return (
    <div className="md:hidden"> {/* Mobile-first: only visible on smaller screens */}
      <button
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        type="button"
        className={clsx(
          'flex items-center justify-center rounded-full p-2',
          'bg-toggle-bg focus-ring',
          'transition-colors duration-long',
          'hover:bg-toggle-hover-bg'
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
