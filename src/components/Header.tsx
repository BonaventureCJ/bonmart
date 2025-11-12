// src/components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import BonMartLogo from "@/assets/icons/bonmart-logo.svg";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Determine initial mode based on system preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(isSystemDark);
      document.documentElement.classList.toggle('dark', isSystemDark);
    }
  }, []);

  // Toggle dark/light mode handler
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <header className="w-full max-w-7xl flex justify-between items-center p-4">
      <div className="flex items-center gap-2">
        <BonMartLogo
          className="w-10 h-10 text-brand"
          aria-label="BonMart Logo"
        />
        <p className="text-xl font-bold text-brand">BonMart</p>
      </div>
      {/* Updated Dark mode toggle button */}
      <button
        onClick={toggleDarkMode}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        className="p-2 rounded-md shadow-sm transition-colors duration-[var(--duration-long)] ease-[var(--transition-ease-in-out)]
                   bg-surface-light text-text-light hover:bg-gray-100 dark:bg-neutral-bg-dark dark:text-text-dark dark:hover:bg-gray-800"
      >
        {isDarkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
    </header>
  );
};

export default Header;
