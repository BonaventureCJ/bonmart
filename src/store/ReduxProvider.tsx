'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';
import { useAppSelector } from './hooks';

// Helper component to apply theme logic.
const ThemeApplier = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useAppSelector((state) => state.theme);

  useEffect(() => {
    const applyTheme = () => {
      const root = document.documentElement;
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (theme === 'dark' || (theme === 'system' && isSystemDark)) {
        root.classList.add('dark');
        root.classList.remove('light');
        localStorage.setItem('theme', 'dark');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
        localStorage.setItem('theme', 'light');
      }

      // Handle the system setting explicitly by removing the stored theme.
      if (theme === 'system') {
        localStorage.removeItem('theme');
      }
    };

    applyTheme();

    // Listen for system theme changes and update the UI if the theme is 'system'.
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        e.matches ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
      }
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);

  return <>{children}</>;
};

// Main Redux provider component.
export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeApplier>{children}</ThemeApplier>
    </Provider>
  );
}
