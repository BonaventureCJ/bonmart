// src/components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import BonMartLogo from "@/assets/icons/bonmart-logo.svg";

const Header = () => {
  const { isDark, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true after the component has mounted on the client
    setMounted(true);
  }, []);

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

      {mounted && (
        <button
          onClick={toggle}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          className="p-2 rounded-md shadow-sm text-text-light dark:text-text-dark
                     bg-surface-light dark:bg-neutral-bg-dark
                     hover:bg-[var(--toggle-hover-bg)] 
                     focus:outline-none focus-visible:focus-ring-dual
                     sync-transition"
        >
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
      )}
    </header>
  );
};

export default Header;
