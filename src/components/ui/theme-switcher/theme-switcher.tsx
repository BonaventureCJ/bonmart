// src/components/ui/theme-switcher/theme-switcher.tsx

'use client';

import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTheme, type Theme } from '@/features/theme/theme-slice';
import { useState, useEffect, useRef } from 'react';
import { ThemeButton } from './theme-button';
import type React from 'react';
import type { IconName } from '@/components/ui/icon/icon';

const THEMES: Theme[] = ['system', 'light', 'dark'];

const themeLabels: Record<Theme, string> = {
    light: 'Light Theme',
    dark: 'Dark Theme',
    system: 'System Theme',
};

const themeIcons: Record<Theme, IconName> = {
    light: 'sun',
    dark: 'moon',
    system: 'monitor',
};

/**
 * ThemeSwitcher Component
 * 
 * NOTE: The skeleton state uses native elements to ensure minimal hydration 
 * footprint and prevent layout shifts. Interaction logic is managed via 
 * a radio group pattern for WCAG compliance.
 */
export const ThemeSwitcher = () => {
    const dispatch = useAppDispatch();
    const activeTheme = useAppSelector((state) => state.theme.theme);
    const [mounted, setMounted] = useState(false);
    const buttonRefs = useRef<Record<Theme, HTMLButtonElement | null>>(
        THEMES.reduce(
            (acc, theme) => ({ ...acc, [theme]: null }),
            {} as Record<Theme, HTMLButtonElement | null>
        )
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleThemeChange = (theme: Theme) => {
        dispatch(setTheme(theme));
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const themeIndex = THEMES.indexOf(activeTheme);
        let newIndex = themeIndex;

        switch (event.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                newIndex = (themeIndex + 1) % THEMES.length;
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                newIndex = (themeIndex - 1 + THEMES.length) % THEMES.length;
                break;
            case 'Home':
                newIndex = 0;
                break;
            case 'End':
                newIndex = THEMES.length - 1;
                break;
            default:
                return;
        }

        event.preventDefault();
        const newTheme = THEMES[newIndex];
        handleThemeChange(newTheme);

        const newButton = buttonRefs.current[newTheme];
        if (newButton) {
            newButton.focus();
        }
    };

    // Shared container classes
    const containerClasses = clsx(
        'flex rounded-full p-1',
        'bg-(--toggle-container-bg)'
    );

    if (!mounted) {
        return (
            <div className={containerClasses} role="presentation">
                {THEMES.map((theme) => (
                    <div
                        key={theme}
                        className="size-8 rounded-full bg-transparent"
                        aria-hidden="true"
                    />
                ))}
            </div>
        );
    }

    return (
        <div
            className={containerClasses}
            role="radiogroup"
            aria-label="Theme Selection"
            aria-describedby="theme-switcher-desc"
            onKeyDown={handleKeyDown}
        >
            <span id="theme-switcher-desc" className="sr-only">
                Switch between light, dark, and system themes.
            </span>
            {THEMES.map((theme) => {
                const isSelected = activeTheme === theme;
                return (
                    <ThemeButton
                        key={theme}
                        ref={(el) => {
                            buttonRefs.current[theme] = el;
                        }}
                        theme={theme}
                        isSelected={isSelected}
                        iconName={themeIcons[theme]}
                        label={themeLabels[theme]}
                        onClick={() => handleThemeChange(theme)}
                    />
                );
            })}
        </div>
    );
};
