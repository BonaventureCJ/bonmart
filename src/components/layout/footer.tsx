// src/components/layout/footer.tsx
import Link from 'next/link';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui/icon/icon';
import { ThemeSwitcher } from '@/components/ui/theme-switcher/theme-switcher';
import { Brand } from '@/components/branding/brand';

/**
 * Renders the responsive and accessible footer component for the application.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full border-t border-t-(--footer-border) p-6 md:p-8"
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
              <li>
                <a
                  className={clsx(
                    'flex items-center gap-2 transition-colors duration-300',
                    'text-(--neutral-color) hover:text-(--brand-color)',
                    'focus-ring rounded-md p-1 -m-1',
                  )}
                  href="bonaventurecj.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit BonaventureCJ's portfolio website (opens in a new tab)"
                >
                  <Icon name="globe" className="size-4" />
                  BonaventureCJ&apos;s Portfolio
                </a>
              </li>
              <li>
                <Link
                  className={clsx(
                    'transition-colors duration-300',
                    'text-(--neutral-color) hover:text-(--brand-color)',
                    'focus-ring rounded-md p-1 -m-1',
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
              <span className="font-semibold">Bonaventure C.J. Ugwu</span>. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
