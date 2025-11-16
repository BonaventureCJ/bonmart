// src/components/ui/Button.tsx
'use client';

import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { Icon, type IconName } from "./Icon";

export interface ButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
    children?: ReactNode;
    variant?: "primary" | "secondary" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    icon?: IconName;
    iconPlacement?: "left" | "right";
    ariaLabel?: string;
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
    // Next.js Link compatibility
    href?: string;
    as?: React.ElementType;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = "primary",
            size = "md",
            icon,
            iconPlacement = "left",
            loading = false,
            disabled = false,
            ariaLabel,
            type = "button",
            fullWidth = false,
            href,
            as,
            className,
            ...props
        },
        ref
    ) => {
        // Accessibility check for icon-only buttons
        if (process.env.NODE_ENV !== 'production') {
            if (!children && !ariaLabel) {
                console.warn(
                    'Button: For an accessible icon-only button, you must provide an `ariaLabel` prop.'
                );
            }
        }

        const isDisabled = disabled || loading;

        const baseStyles =
            "inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer whitespace-nowrap select-none disabled:cursor-not-allowed";

        const variantStyles = {
            primary:
                "bg-brand-color text-white hover:bg-brand-color/90 focus:ring-brand-color disabled:bg-brand-color/40 disabled:text-white/60",
            secondary:
                "bg-toggle-bg text-foreground hover:bg-toggle-hover-bg focus:ring-brand-color disabled:bg-toggle-bg/50 disabled:text-foreground/40",
            ghost:
                "bg-transparent text-foreground hover:bg-toggle-hover-bg focus:ring-brand-color disabled:text-foreground/40",
            danger:
                "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-400 disabled:text-white/60",
        };

        const sizeStyles = {
            sm: "px-3 py-1.5 text-sm gap-1.5",
            md: "px-4 py-2 text-base gap-2",
            lg: "px-6 py-3 text-lg gap-3",
        };

        const combinedStyles = clsx(
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            iconPlacement === "right" && children && "flex-row-reverse",
            fullWidth && "w-full",
            className
        );

        // Render as Link if href is provided
        if (href && !isDisabled) {
            const LinkComponent = as || Link;
            return (
                <LinkComponent
                    href={href}
                    className={combinedStyles}
                    aria-label={children ? undefined : ariaLabel}
                    aria-disabled={isDisabled}
                    {...props}
                >
                    {loading && (
                        <Icon
                            name="loader"
                            className="animate-spin"
                            label="Loading"
                        />
                    )}
                    {!loading && icon && (
                        <Icon name={icon} className="w-[1em] h-[1em]" />
                    )}
                    {children}
                </LinkComponent>
            );
        }

        // Standard button render
        return (
            <button
                ref={ref}
                className={combinedStyles}
                disabled={isDisabled}
                aria-disabled={isDisabled}
                aria-busy={loading || undefined}
                aria-label={children ? undefined : ariaLabel}
                type={type}
                {...props}
            >
                {/* Loading spinner */}
                {loading && (
                    <Icon
                        name="loader"
                        className="animate-spin"
                        label="Loading"
                    />
                )}

                {/* Icon when not loading */}
                {!loading && icon && (
                    <Icon name={icon} className="w-[1em] h-[1em]" />
                )}

                {/* Text content */}
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";