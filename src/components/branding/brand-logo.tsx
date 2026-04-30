// src/components/branding/brand-logo.tsx

import type { FC } from 'react';
import BonMartLogo from '@/assets/icons/bonmart-logo.svg';
import clsx from 'clsx';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'size-6',
  md: 'size-10',
  lg: 'size-12',
};

/**
 * BrandLogo Component
 * Renders the primary BonMart e-commerce identity logo.
 * Uses SVGR for React component transformation and maintains
 * brand color consistency via CSS variables.
 */
export const BrandLogo: FC<BrandLogoProps> = ({
  size = 'md',
  className,
}: BrandLogoProps) => {
  return (
    <BonMartLogo
      className={clsx('text-(--brand-color)', sizeClasses[size], className)}
      aria-label="BonMart logo"
    />
  );
};
