// src/providers/ReduxProvider.tsx

'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { useLayoutEffect } from 'react';
import { useAppSelector } from '@/store/hooks';

const ThemeApplier = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useAppSelector((state) => state.theme);

  useLayoutEffect(() => {
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

      if (theme === 'system') {
        localStorage.removeItem('theme');
      }
    };

    applyTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        // Corrected assignment/function call logic
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);

  return <>{children}</>;
};

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeApplier>{children}</ThemeApplier>
    </Provider>
  );
}

