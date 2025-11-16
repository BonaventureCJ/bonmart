// src/components/layout/Footer.tsx
import Link from 'next/link';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui/Icon';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher/ThemeSwitcher';

/**
 * Renders the responsive and accessible footer component for the application.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full border-t border-footer bg-[var(--background)] p-6 md:p-8"
      role="contentinfo"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 md:flex-row md:justify-between lg:gap-8">
        {/* Navigation Section */}
        <nav aria-label="Footer navigation" className="order-2 md:order-1">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm md:justify-start">
            <li>
              <a
                className={clsx(
                  "flex items-center gap-2 transition-colors duration-300",
                  "text-neutral hover:text-brand",
                  "focus-ring rounded-md p-1 -m-1"
                )}
                href="https://bonaventurecj.github.io/portfolio/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit BonaventureCJ's portfolio website (opens in a new tab)"
              >
                {/* Use the reusable Icon component */}
                <Icon name="globe" className="size-4" />
                BonaventureCJ&apos;s Portfolio
              </a>
            </li>
            <li>
              <Link
                className={clsx(
                  "transition-colors duration-300",
                  "text-neutral hover:text-brand",
                  "focus-ring rounded-md p-1 -m-1"
                )}
                href="/privacy"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>

        {/* Theme Switcher */}
        <div className="order-1 md:order-2">
          <ThemeSwitcher />
        </div>

        {/* Copyright Notice */}
        <div className="order-3 text-center md:text-right">
          <p className="text-sm text-neutral">
            &copy; {currentYear} <span className="font-semibold">Bonaventure C.J. Ugwu</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
