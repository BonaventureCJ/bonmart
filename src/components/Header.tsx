// src/components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import BonMartLogo from "@/assets/icons/bonmart-logo.svg";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(isSystemDark);
      document.documentElement.classList.toggle('dark', isSystemDark);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <header className="w-full max-w-7xl flex justify-between items-center p-4">
      <div className="flex items-center gap-2">
        <BonMartLogo
          className="w-10 h-10 text-brand sync-transition"
          aria-label="BonMart Logo"
        />
        <p className="text-xl font-bold">
          <span className="text-brand sync-transition">Bon</span>
          <span className="text-neutral-text-light dark:text-neutral-text-dark sync-transition">Mart</span>
        </p>
      </div>
      <button
        onClick={toggleDarkMode}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        className="p-2 rounded-md shadow-sm text-text-light dark:text-text-dark
                   bg-surface-light dark:bg-neutral-bg-dark
                   hover:bg-[var(--toggle-hover-bg)] 
                   focus:outline-none focus-visible:focus-ring-dual
                   sync-transition"
      >
        {isDarkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
    </header>
  );
};

export default Header;
