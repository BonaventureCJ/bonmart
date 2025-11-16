'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTheme, type Theme } from '@/store/themeSlice';
import { useState, useEffect, useRef } from 'react';

const THEMES: Theme[] = ['light', 'dark', 'system'];

// Accessible labels for each theme option.
const themeLabels: Record<Theme, string> = {
    light: 'Light Theme',
    dark: 'Dark Theme',
    system: 'System Theme',
};

// Icons for each theme option.
const themeIcons: Record<Theme, React.ReactNode> = {
    light: <Sun className="size-5" aria-hidden="true" />,
    dark: <Moon className="size-5" aria-hidden="true" />,
    system: <Monitor className="size-5" aria-hidden="true" />,
};

export const ThemeSwitcher = () => {
    const dispatch = useAppDispatch();
    const activeTheme = useAppSelector((state) => state.theme.theme);
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
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

        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            newIndex = (themeIndex + 1) % THEMES.length;
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            newIndex = (themeIndex - 1 + THEMES.length) % THEMES.length;
        } else if (event.key === 'Home') {
            newIndex = 0;
        } else if (event.key === 'End') {
            newIndex = THEMES.length - 1;
        } else {
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
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            ref={containerRef}
        >
            <span id="theme-switcher-description" className="sr-only">
                Choose a theme for the website.
            </span>
            {THEMES.map((theme) => {
                const isSelected = activeTheme === theme;
                return (
                    <button
                        key={theme}
                        ref={(el) => {
                            buttonRefs.current[theme] = el;
                        }}
                        type="button"
                        onClick={() => handleThemeChange(theme)}
                        className={clsx(
                            'relative z-0 flex size-8 items-center justify-center rounded-full sync-transition',
                            'hover:bg-[var(--color-toggle-hover-light)] dark:hover:bg-[var(--color-toggle-hover-dark)]',
                            'focus:focus-ring',
                            isSelected && 'text-brand',
                            !isSelected && 'text-neutral-color'
                        )}
                        aria-pressed={isSelected}
                        aria-label={themeLabels[theme]}
                        data-theme={theme}
                        tabIndex={isSelected ? 0 : -1}
                    >
                        <span className="relative z-10">{themeIcons[theme]}</span>
                    </button>
                );
            })}
        </div>
    );
};
