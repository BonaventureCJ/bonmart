// src/components/ui/ThemeSwitcher/ThemeButton.tsx
'use client';

import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Icon, type IconName } from '@/components/ui/Icon';
import type { Theme } from '@/store/themeSlice';

type ThemeButtonProps = {
    theme: Theme;
    isSelected: boolean;
    iconName: IconName;
    label: string;
    onClick: () => void;
    className?: string;
};

export const ThemeButton = forwardRef<HTMLButtonElement, ThemeButtonProps>(
    ({ theme, isSelected, iconName, label, onClick, className, ...rest }, ref) => {
        return (
            <button
                ref={ref}
                type="button"
                onClick={onClick}
                className={clsx(
                    'relative z-0 flex size-8 items-center justify-center rounded-full sync-transition',
                    'hover:bg-[var(--color-toggle-hover-light)] dark:hover:bg-[var(--color-toggle-hover-dark)]',
                    'focus:focus-ring',
                    isSelected && 'text-brand',
                    !isSelected && 'text-neutral-color',
                    className
                )}
                role="radio"
                aria-checked={isSelected}
                aria-label={label}
                data-theme={theme}
                tabIndex={isSelected ? 0 : -1}
                {...rest}
            >
                <Icon
                    name={iconName}
                    className="size-5"
                    aria-hidden="true"
                />
            </button>
        );
    }
);

ThemeButton.displayName = 'ThemeButton';
