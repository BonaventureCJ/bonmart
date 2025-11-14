'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTheme, type Theme } from '@/store/themeSlice';
import { useState, useEffect } from 'react';

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

    // Set mounted to true once the component is hydrated on the client.
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleThemeChange = (theme: Theme) => {
        dispatch(setTheme(theme));
    };

    // Render a placeholder or nothing on the server.
    if (!mounted) {
        return (
            <div className="flex rounded-full bg-toggle-hover-bg p-1" role="radiogroup" aria-label="Theme Switcher">
                {/* Render a basic button placeholder for consistent server-side rendering */}
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

    // Render the interactive UI only on the client.
    return (
        <div
            className={clsx(
                'flex rounded-full p-1',
                'bg-toggle-hover-bg focus-within:focus-ring-dual',
            )}
            role="radiogroup"
            aria-label="Theme Switcher"
            aria-describedby="theme-switcher-description"
        >
            <span id="theme-switcher-description" className="sr-only">
                Choose a theme for the website.
            </span>
            {THEMES.map((theme) => (
                <button
                    key={theme}
                    type="button"
                    onClick={() => handleThemeChange(theme)}
                    className={clsx(
                        'relative z-0 flex size-8 items-center justify-center rounded-full sync-transition',
                        // Hover state for light and dark mode, using custom CSS properties
                        'hover:bg-[var(--color-toggle-hover-light)] dark:hover:bg-[var(--color-toggle-hover-dark)]',
                        // Active state classes to style the icon and use the pseudo-element
                        activeTheme === theme && 'text-surface-light dark:text-text-dark active-bg-scale',
                        activeTheme !== theme && 'text-neutral-color'
                    )}
                    aria-pressed={activeTheme === theme}
                    aria-label={themeLabels[theme]}
                    data-theme={theme}
                >
                    <span className="relative z-10">{themeIcons[theme]}</span>
                </button>
            ))}
        </div>
    );
};
