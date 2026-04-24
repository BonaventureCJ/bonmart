// src/components/ui/icon/icon.tsx

import { forwardRef } from "react";
import type { LucideProps } from "lucide-react";
import { clsx } from "clsx";
import { appIcons, type IconName, isValidIconName } from "./icons";

export type { IconName };

type IconVariant = "primary" | "success" | "neutral" | "error" | "warning" | "on-image" | "inherit";

export interface IconProps extends Omit<LucideProps, 'ref'> {
    name: IconName;
    label?: string;
    variant?: IconVariant;
    size?: number | string;
    className?: string;
    filled?: boolean; // Toggles fill-current
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
    ({
        name,
        label,
        variant = "inherit",
        size = 20,
        className,
        filled = false,
        ...props
    }, ref) => {

        if (process.env.NODE_ENV !== 'production' && !isValidIconName(name)) {
            console.error(`[Bonmart UI]: Icon "${name}" does not exist.`);
            return null;
        }

        const LucideIcon = appIcons[name];

        const variantClasses: Record<IconVariant, string> = {
            primary: "text-(--brand-color)",
            success: "text-(--brand-color)",
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
                    filled ? "fill-current" : "fill-none", // Uses current text color for fill
                    className
                )}
                aria-hidden={label ? undefined : true}
                aria-label={label}
                role={label ? "img" : "none"}
                focusable="false"
                {...props}
            />
        );
    }
);

Icon.displayName = "Icon";


