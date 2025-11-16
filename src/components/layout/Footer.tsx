import { Globe } from 'lucide-react';
import Link from 'next/link';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher/ThemeSwitcher';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t-[0.25px] border-neutral-text-light dark:border-neutral-text-dark bg-[var(--background)] p-4">
      {/* Use grid for the main layout to easily control column flow */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center justify-items-center gap-6 md:grid-cols-3 md:justify-items-stretch lg:gap-0">
        {/* Theme Switcher for mobile*/}
        <div className="mt-4 md:hidden">
          <ThemeSwitcher />
        </div>
        {/* Navigation and Portfolio Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:justify-start">
          <a
            className="text-neutral-text-light hover:text-text-light flex transform items-center gap-2 text-sm transition-transform duration-300 hover:scale-105 hover:underline hover:underline-offset-4 dark:text-neutral-text-dark dark:hover:text-text-dark"
            href="https://bonaventurecj.github.io/portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit BonaventureCJ's portfolio website (opens in a new tab)"
          >
            <Globe className="size-4" aria-hidden="true" />
            BonaventureCJ&apos;s Portfolio
          </a>
          <Link
            className="text-neutral-text-light hover:text-text-light text-sm hover:underline hover:underline-offset-4 dark:text-neutral-text-dark dark:hover:text-text-dark"
            href="/privacy"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Theme Switcher in the center for wider screens */}
        <div className="hidden justify-center md:flex">
          <ThemeSwitcher />
        </div>

        {/* Copyright notice on the right for wider screens */}
        <div className="flex items-center justify-center md:justify-end">
          <p className="text-sm text-neutral-text-light dark:text-neutral-text-dark">
            &copy; {currentYear} <span className="font-semibold">Bonaventure C.J. Ugwu</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

