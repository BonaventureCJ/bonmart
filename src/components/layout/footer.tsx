// src/components/layout/footer.tsx

import Link from 'next/link';
import { clsx } from 'clsx';
import { ThemeSwitcher } from '@/components/ui/theme-switcher/theme-switcher';
import { Brand } from '@/components/branding/brand';
import { Attribution } from '@/components/branding/attribution';

/**
 * Renders the responsive and accessible footer component for the application.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full border-t border-(--footer-border) p-6 md:p-8"
      role="contentinfo"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:gap-8">
        {/* Top container with Brand and ThemeSwitcher */}
        <div className="flex w-full items-center justify-between">
          <Brand />
          <ThemeSwitcher />
        </div>

        {/* Bottom container with Navigation and Copyright */}
        <div className="flex w-full flex-col items-center gap-6 md:flex-row md:justify-between lg:gap-8">
          {/* Navigation Section */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm md:justify-start">
              <li className="flex items-center">
                <Attribution />
              </li>
              <li className="flex items-center">
                <Link
                  className={clsx(
                    '-m-1 p-1 rounded-md text-(--neutral-color) underline-offset-4 transition-colors duration-(--duration-long) ease-(--transition-ease-in-out)',
                    'hover:text-(--brand-color) hover:underline',
                    'focus-ring'
                  )}
                  href="/privacy"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>

          {/* Copyright Notice */}
          <div className="text-center md:text-right">
            <p className="text-sm text-(--neutral-color)">
              &copy; {currentYear}{' '}
              <a
                href="https://bonaventurecj.github.io/portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  '-m-0.5 inline-block rounded-xs p-0.5 font-semibold text-(--foreground) underline-offset-4 transition-colors duration-(--duration-long) ease-(--transition-ease-in-out)',
                  'hover:text-(--brand-color) hover:underline',
                  'focus-ring'
                )}
                aria-label="Visit Bonaventure C.J. Ugwu's portfolio (opens in a new tab)"
              >
                Bonaventure C.J. Ugwu
              </a>
              . All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
