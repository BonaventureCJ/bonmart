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
    return <div className="flex rounded-full bg-toggle-hover-bg p-1" role="radiogroup" aria-label="Theme Switcher" />;
  }

  // Render the interactive UI only on the client.
  return (
    <div className="flex rounded-full bg-toggle-hover-bg p-1 sync-transition focus-ring-dual" role="radiogroup" aria-label="Theme Switcher">
      {THEMES.map((theme) => (
        <button
          key={theme}
          type="button"
          onClick={() => handleThemeChange(theme)}
          className={clsx(
            'flex size-8 items-center justify-center rounded-full sync-transition',
            activeTheme === theme
              ? 'bg-brand-color text-surface-light dark:text-text-dark' // Corrected dark mode text color for consistency
              : 'text-neutral-color hover:bg-white/50 dark:hover:bg-neutral-bg-dark/50'
          )}
          aria-pressed={activeTheme === theme}
          aria-label={themeLabels[theme]}
          data-theme={theme}
        >
          {themeIcons[theme]}
        </button>
      ))}
    </div>
  );
};
