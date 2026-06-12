// src/providers/redux-provider.tsx

'use client';

import { useLayoutEffect, useEffect, useCallback, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';
import { useAppSelector } from '@/store/hooks';
import { selectCurrentTheme } from '@/features/theme/theme-selectors';

/**
 * Safe Layout Effect
 * Prevents SSR warnings while ensuring theme logic runs before paint.
 */
const useSafeLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const ThemeApplier = ({ children }: { children: React.ReactNode }) => {
  const theme = useAppSelector(selectCurrentTheme);
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = theme === 'dark' || (theme === 'system' && isSystemDark);

    // Apply classes to prevent FOUC
    root.classList.toggle('dark', shouldBeDark);
    root.classList.toggle('light', !shouldBeDark);

    // Sync localStorage for the static blocking script in layout.tsx head
    if (theme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // Handle initial mount and theme changes before paint
  useSafeLayoutEffect(() => {
    setMounted(true);
    applyTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        document.documentElement.classList.toggle('dark', e.matches);
        document.documentElement.classList.toggle('light', !e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [theme, applyTheme]);

  /**
   * Hydration Guard
   * Return a transparent shell during hydration to allow useSafeLayoutEffect 
   * to do its work without UI flickering.
   */
  if (!mounted) {
    return <div className="opacity-0">{children}</div>;
  }

  return <>{children}</>;
};

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeApplier>{children}</ThemeApplier>
      </PersistGate>
    </Provider>
  );
}
