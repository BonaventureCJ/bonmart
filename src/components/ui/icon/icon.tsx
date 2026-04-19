// src/components/ui/icon/icon.tsx
import { forwardRef } from "react";
import type { LucideProps } from "lucide-react";
import { clsx } from "clsx";
import { appIcons, type IconName, isValidIconName } from "./icons";

/**
 * Enterprise Icon Component for Bonmart.
 * Uses semantic color tokens from globals.css for theme-aware styling.
 */
export interface IconProps extends Omit<LucideProps, 'ref'> {
    name: IconName;
    /** Accessible label for screen readers. If provided, role becomes "img". */
    label?: string;
    /** Semantic color variants mapped to globals.css variables */
    variant?: "primary" | "neutral" | "error" | "warning" | "on-image" | "inherit";
    /** Standardized size constraints */
    size?: number | string;
    className?: string;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
    ({
        name,
        label,
        variant = "inherit",
        size = 20,
        className,
        ...props
    }, ref) => {

        // Development warning for missing icons
        if (process.env.NODE_ENV !== 'production' && !isValidIconName(name)) {
            console.error(`[Bonmart UI]: Icon "${name}" does not exist.`);
            return null;
        }

        const LucideIcon = appIcons[name];

        // Map variants to Tailwind v4 semantic variables
        const variantClasses = {
            primary: "text-(--brand-color)",
            neutral: "text-(--neutral-color)",
            error: "text-(--error)",
            warning: "text-(--warning)",
            "on-image": "text-(--text-on-image)",
            inherit: "",
        };

        return (
            <LucideIcon
                ref={ref}
                size={size}
                className={clsx(
                    "inline-block shrink-0 transition-colors duration-(--duration-long) ease-(--transition-ease-in-out)",
                    variantClasses[variant],
                    className
                )}
                // Accessibility: If no label, hide from screen readers
                aria-hidden={label ? undefined : true}
                aria-label={label}
                role={label ? "img" : "none"}
                // Prevent focus on icons themselves for better keyboard navigation
                focusable="false"
                {...props}
            />
        );
    }
);

Icon.displayName = "Icon";
