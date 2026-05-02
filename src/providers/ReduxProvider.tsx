// src/providers/ReduxProvider.tsx

'use client';

import { useLayoutEffect, useCallback } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';
import { useAppSelector } from '@/store/hooks';

/**
 * ThemeApplier handles the synchronization of the theme state 
 * with the DOM and localStorage.
 */
const ThemeApplier = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useAppSelector((state) => state.theme);

  const applyTheme = useCallback(() => {
    const root = document.documentElement;
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = theme === 'dark' || (theme === 'system' && isSystemDark);

    if (shouldBeDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }

    // Sync with localStorage for the head script (prevents FOUC on next reload)
    if (theme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  useLayoutEffect(() => {
    applyTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [theme, applyTheme]);

  return <>{children}</>;
};

/**
 * Enterprise ReduxProvider including Persistence and Theme synchronization.
 * PersistGate delays rendering until the stored state is rehydrated.
 */
export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeApplier>{children}</ThemeApplier>
      </PersistGate>
    </Provider>
  );
}
