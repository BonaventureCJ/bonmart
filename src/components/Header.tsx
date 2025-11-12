// src/components/Header.tsx
"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function Header() {
  const { isDark, toggle } = useTheme();

  return (
    <header className="w-full max-w-7xl flex justify-between items-center p-4">
      <div className="flex items-center gap-2">
        <ShoppingBag
          className="w-6 h-6 text-indigo-600 dark:text-indigo-400 smooth-theme-transition"
          aria-hidden="true"
        />
        <Link href="/" className="text-xl font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded">
          BonMart
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          aria-pressed={isDark}
          className="smooth-theme-transition p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
}
