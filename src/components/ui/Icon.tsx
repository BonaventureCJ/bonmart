// src/components/ui/Icon.tsx
import { forwardRef } from "react";
import type { LucideProps } from "lucide-react";
import { clsx } from "clsx";
import { appIcons, type IconName, isValidIconName } from "./icons";

export interface IconProps extends LucideProps {
    name: IconName;
    label?: string;
    className?: string;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
    ({ name, label, className, ...props }, ref) => {
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
                    "inline-block shrink-0",
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

export type { IconName };
