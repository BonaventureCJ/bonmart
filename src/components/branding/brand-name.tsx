// src/components/branding/brand-name.tsx
import type { FC } from 'react';
import clsx from 'clsx';

interface BrandNameProps {
  className?: string;
}

// Server Component
export const BrandName: FC<BrandNameProps> = ({ className }: BrandNameProps) => {
  return (
    <p
      className={clsx(
        'text-xl font-bold tracking-tight',
        'transition-colors duration-long',
        className,
      )}
    >
      <span className="text-brand">Bon</span>
      <span className="text-neutral">Mart</span>
    </p>
  );
};
