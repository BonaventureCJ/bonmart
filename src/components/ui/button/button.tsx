// src/components/ui/button/button.tsx

'use client';

import { forwardRef, type ReactElement } from 'react';
import type { ButtonHTMLAttributes, ReactNode, ElementType, ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { Icon, type IconName } from '@/components/ui/icon/icon';

/**
 * Interface for the base configuration.
 * Interfaces are preferred for static objects to allow declaration merging.
 */
export interface ButtonBaseProps {
    children?: ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    icon?: IconName;
    iconPlacement?: 'left' | 'right';
    ariaLabel?: string;
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    disableFocusRing?: boolean;
}

/**
 * Interface for the button-specific props.
 */
interface ButtonAsButtonProps extends ButtonBaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
    href?: undefined;
    as?: 'button';
}

/**
 * Use a Type Alias for the Link props.
 * Interfaces CANNOT extend generic types like ComponentPropsWithoutRef<T>.
 */
type ButtonAsLinkProps<T extends ElementType = typeof Link> = ButtonBaseProps &
    ComponentPropsWithoutRef<T> & {
        href: string;
        as?: T;
    };

/**
 * Union type for polymorphism.
 */
export type ButtonProps<T extends ElementType> = ButtonAsButtonProps | ButtonAsLinkProps<T>;

type PolymorphicRef<T extends ElementType> = ComponentPropsWithoutRef<T>['ref'];

/**
 * Type for the final component export to handle generic polymorphism correctly.
 */
type ButtonComponent = <T extends ElementType = 'button'>(
    props: ButtonProps<T> & { ref?: PolymorphicRef<T> }
) => ReactElement | null;

const ButtonInternal = forwardRef(
    <T extends ElementType>(
        {
            children,
            variant = 'primary',
            size = 'md',
            icon,
            iconPlacement = 'left',
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
        const isDisabled = disabled || loading;

        // 1. Base Styles using global tokens from globals.css
        const baseStyles = clsx(
            'inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap select-none shrink-0',
            'transition-all duration-(--duration-long) ease-(--transition-ease-in-out)',
            'cursor-pointer disabled:cursor-not-allowed',
            !disableFocusRing && 'focus-ring',
            fullWidth && 'w-full'
        );

        // 2. Variant Styles using Tailwind v4 variable shorthands & semantic tokens
        const variantStyles = {
            primary: clsx(
                'bg-(--brand-color) text-(--text-on-image) hover:opacity-90',
                'disabled:bg-(--brand-color)/40 disabled:text-(--text-on-image)/60'
            ),
            secondary: clsx(
                'bg-(--toggle-bg) text-(--foreground) hover:bg-(--toggle-hover-bg)',
                'disabled:bg-(--toggle-bg)/50 disabled:text-(--neutral-color)/40'
            ),
            ghost: clsx(
                'bg-transparent text-(--foreground) hover:bg-(--toggle-hover-bg)',
                'disabled:text-(--neutral-color)/40'
            ),
            danger: clsx(
                'bg-(--error) text-(--text-on-image) hover:opacity-90',
                'disabled:bg-(--error)/40 disabled:text-(--text-on-image)/60'
            ),
        };

        // 3. Size Styles
        const sizeStyles = {
            sm: 'px-3 py-1.5 text-sm gap-1.5',
            md: 'px-4 py-2 text-base gap-2',
            lg: 'px-6 py-3 text-lg gap-3',
        };

        const combinedStyles = clsx(
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            iconPlacement === 'right' && children && 'flex-row-reverse',
            'href' in props && isDisabled && 'pointer-events-none opacity-50',
            className
        );

        const content = (
            <>
                {loading ? (
                    <Icon name="loader" className="animate-spin" size="1.1em" label="Loading" />
                ) : (
                    icon && <Icon name={icon} size="1.1em" aria-hidden="true" />
                )}
                {children && <span>{children}</span>}
            </>
        );

        // 4. Polymorphic Rendering Logic
        if ('href' in props) {
            const { href, as, ...linkProps } = props as ButtonAsLinkProps<T>;
            const LinkComponent = as || Link;
            return (
                <LinkComponent
                    {...(linkProps as any)}
                    ref={ref}
                    href={href}
                    className={combinedStyles}
                    aria-label={ariaLabel}
                    aria-disabled={isDisabled}
                    tabIndex={isDisabled ? -1 : undefined}
                >
                    {content}
                </LinkComponent>
            );
        }

        const { type = 'button', ...buttonProps } = props as ButtonAsButtonProps;
        return (
            <button
                {...(buttonProps as any)}
                ref={ref as any}
                type={type}
                disabled={isDisabled}
                className={combinedStyles}
                aria-label={ariaLabel}
                aria-busy={loading}
            >
                {content}
            </button>
        );
    }
);

(ButtonInternal as any).displayName = 'Button';

export const Button = ButtonInternal as ButtonComponent;


