import { Globe } from 'lucide-react';
import Link from 'next/link';
import { ThemeSwitcher } from '@/components/common/ThemeSwitcher/ThemeSwitcher';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="row-start-3 w-full max-w-7xl flex flex-col md:flex-row gap-4 justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700 sync-transition">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <a
          className="flex items-center gap-2 text-sm hover:underline hover:underline-offset-4 duration-300 transform hover:scale-105 sync-transition"
          href="https://bonaventurecj.github.io/portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit BonaventureCJ's portfolio website (opens in a new tab)"
        >
          <Globe className="size-4 sync-transition" aria-hidden="true" />
          BonaventureCJ&apos;s Portfolio
        </a>

        <Link className="text-sm hover:underline hover:underline-offset-4 sync-transition" href="/privacy">
          Privacy Policy
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <div className="text-sm text-gray-500 dark:text-gray-400 sync-transition">
          <p>
            &copy; {currentYear} <span className="font-semibold">Bonaventure C.J. Ugwu</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
