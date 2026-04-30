// src/components/branding/bonacj-icon.tsx

import type { FC } from 'react';
import BonaCJLogo from '@/assets/icons/bonacj-logo.svg';
import { clsx } from 'clsx';

interface BonaCJIconProps {
    size?: 'xs' | 'sm' | 'md';
    className?: string;
}

const sizeClasses = {
    xs: 'size-5',
    sm: 'size-6',
    md: 'size-8',
};

/**
 * BonaCJIcon Component
 * Renders the developer's personal brand icon.
 * Uses SVGR for React component transformation.
 */
export const BonaCJIcon: FC<BonaCJIconProps> = ({
    size = 'xs',
    className,
}: BonaCJIconProps) => {
    return (
        <BonaCJLogo
            className={clsx(
                'transition-colors duration-(--duration-long) shrink-0',
                sizeClasses[size],
                className
            )}
            role="img"
            aria-hidden="true"
        />
    );
};
