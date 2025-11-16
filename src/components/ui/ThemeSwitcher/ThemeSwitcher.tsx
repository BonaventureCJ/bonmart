'use client';

import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTheme, type Theme } from '@/store/themeSlice';
import { useState, useEffect, useRef } from 'react';
import { ThemeButton } from './ThemeButton';
import type React from 'react';

const THEMES: Theme[] = ['system', 'light', 'dark'];

// Accessible labels for each theme option.
const themeLabels: Record<Theme, string> = {
    light: 'Light Theme',
    dark: 'Dark Theme',
    system: 'System Theme',
};

// Use the IconName type for the icon names.
const themeIcons: Record<Theme, string> = {
    light: 'sun',
    dark: 'moon',
    system: 'monitor',
};

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
            case ' ': // Spacebar
            case 'Enter':
                handleThemeChange(activeTheme);
                return;
            default:
                return;
        }

        event.preventDefault();
        const newTheme = THEMES[newIndex];
        dispatch(setTheme(newTheme));

        const newButton = buttonRefs.current[newTheme];
        if (newButton) {
            newButton.focus();
        }
    };

    if (!mounted) {
        return (
            <div className="flex rounded-full bg-toggle-bg p-1" role="radiogroup" aria-label="Theme Switcher">
                {THEMES.map((theme) => (
                    <button
                        key={theme}
                        type="button"
                        className="flex size-8 items-center justify-center rounded-full"
                        disabled
                        aria-hidden="true"
                    />
                ))}
            </div>
        );
    }

    return (
        <div
            className={clsx(
                'flex rounded-full p-1',
                'bg-toggle-bg',
            )}
            role="radiogroup"
            aria-label="Theme Switcher"
            aria-describedby="theme-switcher-description"
            onKeyDown={handleKeyDown}
        >
            <span id="theme-switcher-description" className="sr-only">
                Choose a theme for the website.
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
                        iconName={themeIcons[theme] as any} // Cast needed for icon type compatibility
                        label={themeLabels[theme]}
                        onClick={() => handleThemeChange(theme)}
                    />
                );
            })}
        </div>
    );
};
