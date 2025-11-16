// src/components/ui/Button.tsx
'use client';

import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode, ElementType } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { Icon, type IconName } from "./Icon";
import type React from "react";

type CommonProps = {
    children?: ReactNode;
    variant?: "primary" | "secondary" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    icon?: IconName;
    iconPlacement?: "left" | "right";
    ariaLabel?: string;
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    disableFocusRing?: boolean;
};

type ButtonAsButton = CommonProps & {
    href?: undefined;
    as?: 'button';
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsLink<T extends ElementType = typeof Link> = CommonProps & {
    href: string;
    as?: T;
} & React.ComponentPropsWithoutRef<T>;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

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
            fullWidth = false,
            disableFocusRing = false,
            className,
            ...props
        },
        ref
    ) => {
        if (process.env.NODE_ENV !== 'production') {
            if (!children && !ariaLabel) {
                console.warn(
                    'Button: For an accessible icon-only button, you must provide an `ariaLabel` prop.'
                );
            }
        }

        const isDisabled = disabled || loading;

        const baseStyles =
            clsx(
                "inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap select-none",
                !disableFocusRing && "focus-ring",
                "disabled:cursor-not-allowed"
            );

        const variantStyles = {
            primary:
                "bg-brand-color text-white hover:bg-brand-color/90 disabled:bg-brand-color/40 disabled:text-white/60",
            secondary:
                "bg-toggle-bg text-foreground hover:bg-toggle-hover-bg disabled:bg-toggle-bg/50 disabled:text-foreground/40",
            ghost:
                "bg-transparent text-foreground hover:bg-toggle-hover-bg disabled:text-foreground/40",
            danger:
                "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400 disabled:text-white/60",
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
            isDisabled && (props as ButtonAsLink).href ? 'pointer-events-none' : '',
            className
        );

        const content = (
            <>
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
            </>
        );

        if (props.href) {
            const { href, as, ...linkProps } = props as ButtonAsLink;
            const LinkComponent = as || Link;
            return (
                <LinkComponent
                    href={href}
                    className={combinedStyles}
                    aria-label={children ? undefined : ariaLabel}
                    aria-disabled={isDisabled}
                    tabIndex={isDisabled ? -1 : undefined}
                    {...linkProps}
                >
                    {content}
                </LinkComponent>
            );
        }

        const { type = 'button', ...buttonProps } = props as ButtonAsButton;

        return (
            <button
                ref={ref as React.ForwardedRef<HTMLButtonElement>}
                className={combinedStyles}
                disabled={isDisabled}
                aria-disabled={isDisabled}
                aria-busy={loading || undefined}
                aria-label={children ? undefined : ariaLabel}
                type={type}
                {...buttonProps}
            >
                {content}
            </button>
        );
    }
);

Button.displayName = "Button";
