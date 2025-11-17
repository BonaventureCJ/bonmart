// src/components/branding/brand.tsx
'use client';

import type { FC } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { BrandLogo } from './brand-logo';
import { BrandName } from './brand-name';

interface BrandProps {
  className?: string;
  logoSize?: 'sm' | 'md' | 'lg';
  showName?: boolean;
}

// Client Component to enable the <Link> component
export const Brand: FC<BrandProps> = ({
  className,
  logoSize = 'md',
  showName = true,
}: BrandProps) => {
  return (
    <Link
      href="/"
      className={clsx(
        'group flex items-center gap-2',
        'focus-ring',
        className,
      )}
      aria-label="Bonmart homepage"
    >
      <BrandLogo size={logoSize} />
      {showName && (
        <BrandName className="transition-colors duration-long group-hover:text-brand" />
      )}
    </Link>
  );
};
