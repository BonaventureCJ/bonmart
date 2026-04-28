// src/components/ui/theme-switcher/theme-button.tsx

import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Icon, type IconName } from '@/components/ui/icon/icon';
import type { Theme } from '@/features/theme/theme-slice';

type ThemeButtonProps = {
    theme: Theme;
    isSelected: boolean;
    iconName: IconName;
    label: string;
    onClick: () => void;
    className?: string;
};

/**
 * ThemeButton Component
 * 
 * NOTE: This uses a native <button> instead of <Button /> because it implements 
 * a "Radio Group" pattern (WAI-ARIA). The specific selection rings and 
 * tab-index management are specialized for the theme switcher UX.
 */
export const ThemeButton = forwardRef<HTMLButtonElement, ThemeButtonProps>(
    ({ theme, isSelected, iconName, label, onClick, className, ...rest }, ref) => {
        return (
            <button
                ref={ref}
                type="button"
                onClick={onClick}
                className={clsx(
                    'relative z-0 flex size-8 items-center justify-center rounded-full transition-colors',
                    'hover:bg-(--toggle-hover-bg)',
                    'focus-ring',
                    'cursor-pointer',
                    isSelected
                        ? 'bg-(--toggle-bg-active) text-(--brand-color) ring-[0.89px] ring-(--brand-color) ring-offset-[0.5px] ring-offset-(--ring-offset-color)'
                        : 'text-(--neutral-color)',
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
