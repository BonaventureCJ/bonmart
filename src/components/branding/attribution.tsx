// src/components/branding/attribution.tsx

import type { FC } from 'react';
import { clsx } from 'clsx';
import { BonaCJIcon } from '@/components/branding/bonacj-icon';

interface AttributionProps {
    className?: string;
}

/**
 * Attribution Component
 * A reusable branding element for developer credit.
 * Placed in branding to centralize author identity assets.
 */
export const Attribution: FC<AttributionProps> = ({ className }) => {
    return (
        <div
            className={clsx(
                'flex items-center gap-2 text-sm text-(--neutral-color)',
                className
            )}
        >
            <span className="select-none">Built by:</span>
            <a
                href="https://bonaventurecj.github.io/portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring group flex items-center gap-1.5 font-medium transition-colors hover:text-(--brand-color) rounded-sm"
                aria-label="Visit Bonaventure CJ's portfolio (opens in a new tab)"
            >
                <BonaCJIcon
                    size="xs"
                    className="text-(--neutral-color) transition-transform duration-(--duration-long) group-hover:scale-110 group-hover:text-(--brand-color)"
                />
                <span className="underline-offset-4 group-hover:underline">BonaventureCJ</span>
            </a>
        </div>
    );
};

