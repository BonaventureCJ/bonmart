// src/components/ui/heading/heading.tsx

import * as React from 'react';
import { clsx } from 'clsx';
import { Icon, type IconName } from '@/components/ui/icon/icon';

/**
 * Interface for Heading props.
 * Using interfaces allows for potential declaration merging in larger modules.
 */
export interface HeadingProps {
    children: React.ReactNode;
    /** Semantic level (h1-h6) which also determines default styling. */
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    /** Optional icon to lead the heading text. */
    icon?: IconName;
    /** Accessibility label for the icon if it conveys unique meaning. */
    iconLabel?: string;
    className?: string;
    /** Horizontal alignment of the heading text. */
    align?: 'left' | 'center' | 'right';
    /** Override the underlying HTML element (e.g., use <div> for visual headers). */
    as?: keyof React.JSX.IntrinsicElements;
    id?: string;
    /** Font weight override. Defaults are context-aware based on level. */
    weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
}

/**
 * Enterprise Typography Scale
 * Uses fluid sizing (via md/lg breakpoints) and semantic text-foreground.
 */
const HEADING_LEVEL_CLASSES = {
    1: 'text-2xl md:text-3xl lg:text-4xl',
    2: 'text-xl md:text-2xl lg:text-3xl',
    3: 'text-lg md:text-xl lg:text-2xl',
    4: 'text-base md:text-lg lg:text-xl',
    5: 'text-sm md:text-base lg:text-lg',
    6: 'text-xs md:text-sm lg:text-base',
} as const;

const WEIGHT_CLASSES = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
} as const;

const ALIGN_CLASSES = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
} as const;

export const Heading = React.memo(function Heading({
    children,
    level = 1,
    icon,
    iconLabel,
    align = 'left',
    weight,
    className,
    as,
    id,
}: HeadingProps) {
    // Validation for development
    if (process.env.NODE_ENV !== 'production' && (level < 1 || level > 6)) {
        console.error(`[Bonmart UI]: Invalid Heading level "${level}". Falling back to 1.`);
    }

    const safeLevel = Math.min(Math.max(level, 1), 6) as keyof typeof HEADING_LEVEL_CLASSES;

    // Resolve the HTML tag: default to h1-h6, but allow override
    const semanticTag = `h${safeLevel}` as const;
    const Tag = (as ?? semanticTag) as keyof React.JSX.IntrinsicElements;

    // ARIA: If we override the tag (e.g. using a <div>), we must provide the heading role
    const isOverridden = as && as !== semanticTag;

    // Intelligent Weight Defaults: Heavier for larger headings
    const defaultWeight = safeLevel <= 2 ? 'bold' : safeLevel <= 4 ? 'semibold' : 'medium';
    const effectiveWeight = weight || defaultWeight;

    const classes = clsx(
        // Base Styles: Using CSS variable from globals.css for text color
        'text-(--foreground) leading-tight tracking-tight font-(--font-family-sans)',
        'transition-colors duration-(--duration-long) ease-(--transition-ease-in-out)',
        HEADING_LEVEL_CLASSES[safeLevel],
        WEIGHT_CLASSES[effectiveWeight],
        ALIGN_CLASSES[align],
        // Layout logic for icons
        icon && 'flex items-center gap-3',
        className
    );

    return (
        <Tag
            id={id}
            className={classes}
            {...(isOverridden ? { role: 'heading', 'aria-level': safeLevel } : {})}
        >
            {icon && (
                <Icon
                    name={icon}
                    label={iconLabel}
                    className="shrink-0 text-(--brand-color)"
                    size="1.1em" // Relative sizing ensures icon matches text scale
                />
            )}
            {children}
        </Tag>
    );
});

Heading.displayName = 'Heading';
