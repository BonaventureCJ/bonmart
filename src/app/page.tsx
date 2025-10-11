"use client"
//import Image from "next/image";
import { useState, useEffect } from "react";
// Removed Image from 'next/image' if we don't need it elsewhere, but kept for general use below
import { Globe, ShoppingBag, Loader2 } from "lucide-react"; // Using Lucide icons for a professional look
// Correct import alias - this works because of your pnpm install and next.config.js setup
import BonMartLogoComponent from '@/assets/icons/bonmart-logo.svg';

/**
 * Renders the BonMart placeholder page.
 * Follows RWD, WCAG, SEO best practices, uses semantic HTML, and includes dark/light mode with animations.
 */
export default function Home() {
  const currentYear = new Date().getFullYear();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Determine initial mode based on system preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  // Toggle dark/light mode handler
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    // Conditional class for dark mode on the main container
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      {/* Container that handles the theme transition and base styles */}
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 font-sans text-gray-800 dark:text-gray-100">

        {/* Main layout using CSS grid for better structure */}
        <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-4 sm:p-8">

          {/* Header/Utility Section - Top of the page for branding/actions */}
          <header className="w-full max-w-7xl flex justify-between items-center p-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
              <p className="text-xl font-bold">BonMart</p>
            </div>
            {/* Dark mode toggle button */}
            <button
              onClick={toggleDarkMode}
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 shadow-sm"
            >
              {/* Using emojis for simple, accessible icon representation */}
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </header>

          {/* Main Content Area */}
          <main className="flex flex-col gap-8 row-start-2 items-center justify-center text-center p-4">
            {/* SEO: Use appropriate headings structure (h1, h2, etc.) */}
            <div className="flex flex-col items-center">
              {/* Professional looking animation on main logo */}
              <div className="animate-bounce mb-4">

                {/* 
                  *** THIS IS THE MODIFIED SECTION ***
                  We use the imported SVG as a React component directly.
                  This allows us to leverage CSS classes (Tailwind) for styling.
                */}
                <BonMartLogoComponent
                  className="w-[100px] h-[100px] text-green-600 dark:text-green-400"  // Using Tailwind arbitrary values for exact width/height
                  aria-label="BonMart Logo"
                />

              </div>

              {/* Headings and introductory text */}
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                {/* Green in both light and dark modes */}
                <span className="text-green-600 dark:text-green-400">
                  Bon
                </span>
                {/* Black in light mode, white in dark mode */}
                <span className="text-gray-900 dark:text-white">
                  Mart
                </span>
              </h1>

              <h2 className="text-2xl text-indigo-600 dark:text-indigo-400 mb-6">
                Bonzer Shopping Experiences
              </h2>
              {/* Call to action/status message */}
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md">
                We are crafting something special just for you. Our new online store is under construction and will be live soon!
              </p>

              {/* Professional loading indicator with animation */}
              <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" aria-hidden="true" />
                <span className="text-gray-700 dark:text-gray-300">Coming soon!</span>
              </div>
            </div>
          </main>

          {/* Footer Area - Semantic HTML use */}
          <footer className="row-start-3 w-full max-w-7xl flex flex-col md:flex-row gap-4 justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700">

            {/* Link Section */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {/* Use anchor tag for navigation, apply RWD classes */}
              <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-sm transition duration-300 transform hover:scale-105"
                href="https://bonaventurecj.github.io/portfolio/"
                target="_blank"
                rel="noopener noreferrer" // Essential for security with target="_blank"
                aria-label="Visit BonaventureCJ's portfolio website (opens in a new tab)"
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
                BonaventureCJ&apos;s Portfolio
              </a>
              {/* You can add more footer links here */}
              <a
                className="text-sm hover:underline hover:underline-offset-4 transition duration-300"
                href="#"
              // Replace with actual privacy policy link
              >
                Privacy Policy
              </a>
            </div>

            {/* Copyright Section */}
            <div className="text-sm text-gray-500 dark:text-gray-400">
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

// SEO Meta Tags (For use in the layout.js or head.js file in a Next.js setup)
/* 
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
