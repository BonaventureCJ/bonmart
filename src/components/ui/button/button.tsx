// src/components/ui/button/button.tsx
'use client';

import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode, ElementType, ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { Icon, type IconName } from "../icon/icon";
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

// Define the correct ref type for the polymorphic component.
type PolymorphicRef<T extends ElementType> = React.ComponentPropsWithRef<T>['ref'];

// Props for a button (renders as <button>)
type ButtonAsButton = CommonProps & {
    href?: undefined;
    as?: 'button';
} & ButtonHTMLAttributes<HTMLButtonElement>;

// Props for a link (renders as <a> or Next.js <Link>)
type ButtonAsLink<T extends ElementType = typeof Link> = CommonProps & {
    href: string;
    as?: T;
} & ComponentPropsWithoutRef<T>;

// Combined props type with `ElementType` generic
type ButtonProps<T extends ElementType> = ButtonAsButton | ButtonAsLink<T>;

// Type the component using an intersection of the props and ref types.
// This is the correct pattern for polymorphic components with forwardRef.
type ButtonComponentType = <T extends ElementType = 'button'>(
    props: ButtonProps<T> & { ref?: PolymorphicRef<T> }
) => React.ReactElement | null;


const ButtonComponent = forwardRef(
    <T extends ElementType>(
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
        }: ButtonProps<T>,
        ref: PolymorphicRef<T>
    ) => {
        if (process.env.NODE_ENV !== 'production') {
            if (!children && !ariaLabel) {
                console.warn(
                    'Button: For an accessible icon-only button, you must provide an `ariaLabel` prop.'
                );
            }
        }

        const isDisabled = disabled || loading;

        const baseStyles = clsx(
            "inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap select-none",
            !disableFocusRing && "focus-ring",
            isDisabled && "disabled:cursor-not-allowed"
        );

        const variantStyles = {
            primary:
                "bg-brand-color text-white hover:bg-brand-color/90 disabled:bg-brand-color/40 disabled:text-white/60",
            secondary:
                "bg-toggle-bg text-foreground hover:bg-toggle-hover-bg disabled:bg-toggle-bg/50 disabled:text-foreground/40",
            ghost:
                "bg-transparent text-foreground hover:bg-toggle-hover-bg disabled:text-foreground/40",
            danger:
                "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-700/60 disabled:text-white/60",
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
            (props as ButtonAsLink<T>).href && isDisabled ? 'pointer-events-none' : '',
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

        if ("href" in props) {
            const { href, as, ...linkProps } = props as ButtonAsLink<T>;
            const LinkComponent = as || Link;
            return (
                <LinkComponent
                    href={href}
                    className={combinedStyles}
                    aria-label={children ? undefined : ariaLabel}
                    aria-disabled={isDisabled}
                    tabIndex={isDisabled ? -1 : undefined}
                    {...linkProps}
                    ref={ref}
                >
                    {content}
                </LinkComponent>
            );
        }

        const { type = 'button', ...buttonProps } = props as ButtonAsButton;

        return (
            <button
                ref={ref}
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

ButtonComponent.displayName = "Button";

export const Button = ButtonComponent as ButtonComponentType;
