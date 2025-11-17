// src/components/ui/heading/heading.tsx
import * as React from "react";
import { clsx } from "clsx";
import { Icon, type IconName } from "../icon/icon";

export interface HeadingProps {
    children: React.ReactNode;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    icon?: IconName;
    iconLabel?: string;
    className?: string;
    align?: "left" | "center" | "right";
    as?: keyof React.JSX.IntrinsicElements;
    id?: string;
    weight?: "light" | "normal" | "medium" | "semibold" | "bold";
}

const HEADING_STYLES: Record<number, string> = {
    1: "text-2xl md:text-3xl lg:text-4xl",
    2: "text-xl md:text-2xl lg:text-3xl",
    3: "text-lg md:text-xl lg:text-2xl",
    4: "text-base md:text-lg lg:text-xl",
    5: "text-sm md:text-base lg:text-lg",
    6: "text-xs md:text-sm lg:text-base",
};

const WEIGHT_STYLES = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
};

const ALIGNMENT: Record<string, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
};

export const Heading = React.memo(function Heading({
    children,
    level = 1,
    icon,
    iconLabel,
    align = "left",
    weight,
    className,
    as,
    id,
}: HeadingProps) {
    if (process.env.NODE_ENV !== 'production' && (level < 1 || level > 6)) {
        console.error(`Heading: invalid "level" value ${level}. Must be 1–6.`);
        // Fallback to level 1 for production to prevent a crash
        level = 1;
    }

    const semanticTag = `h${level}`;
    const Tag = (as ?? semanticTag) as keyof React.JSX.IntrinsicElements;

    const isNonSemanticTag = as && as !== semanticTag;

    const defaultWeight = level <= 2 ? "bold" : level <= 4 ? "semibold" : "medium";

    const classes = clsx(
        "leading-tight tracking-tight",
        icon && "flex items-center gap-2",
        HEADING_STYLES[level],
        WEIGHT_STYLES[weight || defaultWeight],
        ALIGNMENT[align],
        className
    );

    return (
        <Tag
            id={id}
            className={classes}
            {...(isNonSemanticTag
                ? { role: "heading", "aria-level": level }
                : undefined)}
        >
            {icon && (
                <Icon
                    name={icon}
                    label={iconLabel}
                    className="shrink-0 w-[1em] h-[1em]"
                />
            )}
            {children}
        </Tag>
    );
});

Heading.displayName = "Heading";
