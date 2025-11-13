// src/components/ThemeProvider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  isDark: boolean;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider hydrates theme preference from localStorage or system preference.
 * It prevents FOUC by holding off rendering children until theme is determined.
 */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      const v = stored === "dark";
      setIsDark(v);
      document.documentElement.classList.toggle("dark", v);
      return;
    }

    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggle = () => {
    // set to the opposite; if null treat as light -> true
    const next = !(isDark ?? false);
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  };

  // Prevent FOUC
  if (isDark === null) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 smooth-theme-transition" aria-hidden="true" />;
  }

  return <ThemeContext.Provider value={{ isDark, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
