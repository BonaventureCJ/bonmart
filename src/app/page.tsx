"use client";
import { useState, useEffect } from "react";
import { Globe, ShoppingBag, Loader2 } from "lucide-react";
import BonMartLogoComponent from "@/assets/icons/bonmart-logo.svg";

export default function Home() {
  const currentYear = new Date().getFullYear();
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  // Determine initial theme: localStorage > system preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setIsDarkMode(storedTheme === "dark");
        document.documentElement.classList.toggle("dark", storedTheme === "dark");
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDarkMode(prefersDark);
        document.documentElement.classList.toggle("dark", prefersDark);
      }
    }
  }, []);

  // Theme toggle handler
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  // Prevent content flash before theme initializes
  if (isDarkMode === null) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 smooth-theme-transition"></div>
    );
  }

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      {/* Main container with global smooth transitions */}
      <div className="smooth-theme-transition min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-100">

        {/* Grid-based layout */}
        <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-4 sm:p-8">

          {/* Header */}
          <header className="w-full max-w-7xl flex justify-between items-center p-4">
            <div className="flex items-center gap-2">
              <ShoppingBag
                className="w-6 h-6 text-indigo-600 dark:text-indigo-400 smooth-theme-transition"
                aria-hidden="true"
              />
              <p className="text-xl font-bold">BonMart</p>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              className="smooth-theme-transition p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 shadow-sm"
            >
              {isDarkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </header>

          {/* Main content */}
          <main className="flex flex-col gap-8 row-start-2 items-center justify-center text-center p-4">
            <div className="flex flex-col items-center">
              <div className="animate-bounce mb-4">
                <BonMartLogoComponent
                  className="w-[100px] h-[100px] text-green-600 dark:text-green-400 smooth-theme-transition"
                  aria-label="BonMart Logo"
                />
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                <span className="text-green-600 dark:text-green-400 smooth-theme-transition">
                  Bon
                </span>
                <span className="text-gray-900 dark:text-white smooth-theme-transition">
                  Mart
                </span>
              </h1>

              <h2 className="text-2xl text-indigo-600 dark:text-indigo-400 mb-6 smooth-theme-transition">
                Bonzer Shopping Experiences
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md smooth-theme-transition">
                We are crafting something special just for you. Our new online store is under construction and will be live soon!
              </p>

              <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-xl smooth-theme-transition">
                <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" aria-hidden="true" />
                <span className="text-gray-700 dark:text-gray-300 smooth-theme-transition">Coming soon!</span>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="row-start-3 w-full max-w-7xl flex flex-col md:flex-row gap-4 justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700 smooth-theme-transition">

            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                className="flex items-center gap-2 text-sm hover:underline hover:underline-offset-4 transition-transform duration-300 transform hover:scale-105 smooth-theme-transition"
                href="https://bonaventurecj.github.io/portfolio/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit BonaventureCJ's portfolio website (opens in a new tab)"
              >
                <Globe className="w-4 h-4 smooth-theme-transition" aria-hidden="true" />
                BonaventureCJ&apos;s Portfolio
              </a>

              <a
                className="text-sm hover:underline hover:underline-offset-4 smooth-theme-transition"
                href="#"
              >
                Privacy Policy
              </a>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400 smooth-theme-transition">
              <p>
                &copy; {currentYear} <span className="font-semibold">Bonaventure C.J. Ugwu</span>. All rights reserved.
              </p>
            </div>

          </footer>
        </div>
      </div>
    </div>
  );
}

/*
SEO Metadata (use in layout.js or head.js)
------------------------------------------
export const metadata = {
  title: 'BonMart - Coming Soon',
  description: 'BonMart: Bonzer Shopping Experiences. Our new online store is under construction and will be available soon.',
  keywords: ['BonMart', 'e-commerce', 'shopping', 'coming soon', 'online store'],
  openGraph: {
    title: 'BonMart - Coming Soon',
    description: 'Our new online store is under construction.',
    url: 'https://yourwebsite.com',
    siteName: 'BonMart',
  },
};
*/
