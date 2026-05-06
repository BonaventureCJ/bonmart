// src/app/global-error.tsx

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { logger } from "@/utils/logger";

/**
 * Global Error Boundary (Last Resort)
 * This file replaces the entire layout tree when the root layout crashes.
 * We avoid complex reusable components here to ensure this renders 
 * even if the component library or context providers fail.
 * It is only enabled in production.
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        try {
            // 1. Attempt to log via centralized utility (Dev-only check is inside logger)
            logger.error("CRITICAL Root Layout Failure", error, error.digest);
        } catch {
            // 2. Fallback: If the logger utility itself is inaccessible (e.g. ChunkLoadError)
            if (process.env.NODE_ENV === "development") {
                console.error("Critical Failure (Logger utility inaccessible):", error);
            }
        }
    }, [error]);

    return (
        <html lang="en">
            <head>
                <title>Critical System Interruption | Bonmart</title>
            </head>
            <body className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center font-sans text-[#171717]">
                {/* Hardcoded SVG: Ensures icon renders even if lucide-react fails to load */}
                <div
                    className="mb-8 rounded-full bg-[#fee2e2] p-6 text-[#dc2626]"
                    aria-hidden="true"
                >
                    <svg
                        xmlns="http://w3.org"
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                </div>

                <div className="max-w-2xl space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Critical System Interruption
                    </h1>

                    <p className="text-lg leading-relaxed text-[#374151] text-balance">
                        A core system error occurred. We apologize for the inconvenience.
                        Our team has been notified and is working to restore your
                        sustainable shopping experience.
                    </p>

                    {error.digest && (
                        <p className="mt-4 font-mono text-[10px] tracking-widest uppercase opacity-40">
                            Error Reference: <span className="select-all font-bold">{error.digest}</span>
                        </p>
                    )}
                </div>

                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                    <button
                        onClick={() => reset()}
                        className="cursor-pointer rounded-xl bg-[#15803d] px-8 py-3 font-semibold text-white shadow-sm transition-all hover:opacity-90 active:scale-95 focus-ring"
                    >
                        Recover System
                    </button>

                    <Link
                        href="/"
                        className="rounded-xl border border-[#e5e7eb] px-8 py-3 font-semibold text-[#171717] transition-colors hover:bg-[#f3f4f6] focus-ring"
                    >
                        Return Home
                    </Link>
                </div>
            </body>
        </html>
    );
}
