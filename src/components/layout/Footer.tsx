// src/components/Footer.tsx
import { Globe } from "lucide-react";
import Link from "next/link";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton/ThemeToggleButton";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
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

                <Link className="text-sm hover:underline hover:underline-offset-4 smooth-theme-transition" href="/privacy">
                    Privacy Policy
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <ThemeToggleButton />
                <div className="text-sm text-gray-500 dark:text-gray-400 smooth-theme-transition">
                    <p>
                        &copy; {currentYear} <span className="font-semibold">Bonaventure C.J. Ugwu</span>. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
