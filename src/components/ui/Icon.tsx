// src/components/ui/Icon.tsx
import { forwardRef } from "react";
import type { LucideProps } from "lucide-react";
import { clsx } from "clsx";
import { appIcons, type IconName, isValidIconName } from "./icons";

// Create a combined props type that ensures 'ref' is handled correctly by forwardRef.
export interface IconProps extends LucideProps {
    name: IconName;
    label?: string;
    className?: string;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
    ({ name, label, className, ...props }, ref) => {
        // Error boundary for missing icons
        if (process.env.NODE_ENV !== 'production') {
            if (!isValidIconName(name)) {
                console.error(
                    `Icon "${name}" not found in appIcons. Available icons: ${Object.keys(appIcons).join(', ')}`
                );
                return null;
            }
        }

        const LucideIcon = appIcons[name];

        return (
            <LucideIcon
                ref={ref}
                className={clsx(
                    "inline-block w-[1em] h-[1em] shrink-0",
                    className
                )}
                aria-hidden={label ? undefined : true}
                aria-label={label}
                role={label ? "img" : "none"}
                // `focusable="false"` is redundant if `aria-hidden` is present but IS kept for older browser support.
                focusable="false"
                {...props}
            />
        );
    }
);

Icon.displayName = "Icon";

// Re-export the IconName type for use in other components
export type { IconName };
