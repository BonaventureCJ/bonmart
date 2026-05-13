// src/app/global-error.tsx

"use client";

import { useEffect, useState } from "react";
import { logger } from "@/utils/logger";

interface UnifiedCookieStore {
    getAll: () => Promise<Array<{ name: string }>>;
    delete: (name: string) => Promise<void>;
}

/**
 * Global Error Boundary (Last Resort)
 * This file replaces the entire layout tree when the root layout crashes.
 * We avoid complex reusable components here to ensure this renders 
 * even if the component library or context providers fail.
 * Implements defensive layout structure to fix and isolate root client errors.
 * Addresses Next.js 15 + React 19 hydration failures programmatically.
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const [isClearingState, setIsClearingState] = useState(false);

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

    /**
     * Purges enterprise local cache structures (Redux-persist / theme storage)
     * which are the leading cause of permanent client-side hydration mismatches.
     */
    const handleStatePurgeAndRecovery = async () => {
        setIsClearingState(true);
        try {
            // Programmatically break corrupt client persistence blocks
            window.localStorage.clear();
            window.sessionStorage.clear();

            // Safe property probing that bypasses global Window mapping conflicts
            if ("cookieStore" in window) {
                const targetStore = (window as unknown as { cookieStore: UnifiedCookieStore }).cookieStore;
                if (targetStore && typeof targetStore.getAll === "function") {
                    const cookies = await targetStore.getAll();
                    for (const cookie of cookies) {
                        await targetStore.delete(cookie.name);
                    }
                }
            }

            // Attempt Next.js client-side frame recovery tree reset
            reset();

            // Hard bypass: Force browser to discard hot module memory structures
            window.location.reload();
        } catch {
            // Ultimate fallback safety link for application recovery
            window.location.href = "/";
        } finally {
            setIsClearingState(false);
        }
    };

    return (
        <html lang="en">
            <head>
                <title>Critical System Interruption | Bonmart</title>
            </head>
            <body className="flex min-h-screen flex-col bg-white font-sans text-[#171717] dark:bg-[#0a0a0a] dark:text-[#ededed]">
                <main className="flex flex-1 flex-col items-center justify-center p-6 text-center" id="main-content">
                    {/* Hardcoded SVG: Ensures icon renders even if lucide-react fails to load */}
                    <div
                        className="mb-8 rounded-full bg-[#fee2e2] p-6 text-[#dc2626] dark:bg-[#450a0a] dark:text-[#ef4444]"
                        aria-hidden="true"
                    >
                        <svg
                            xmlns="w3.org"
                            width="64"
                            height="64"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                    </div>

                    <div className="max-w-2xl space-y-4">
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                            Critical System Interruption
                        </h1>

                        <p className="text-lg leading-relaxed text-[#374151] dark:text-[#d1d5db] text-balance">
                            A configuration mismatch or core server error interrupted the page load.
                            This is usually caused by outdated browser site data or corrupt local session state caches.
                        </p>

                        {error.digest && (
                            <p className="inline-block mt-4 rounded-md bg-[#f3f4f6] px-3 py-1 font-mono text-[11px] tracking-wide uppercase text-[#374151] dark:bg-[#1f2937] dark:text-[#d1d5db]">
                                Error Reference: <span className="select-all font-bold">{error.digest}</span>
                            </p>
                        )}
                    </div>

                    {/* Step-by-Step Clear Storage Actions Container */}
                    <section
                        className="mt-10 w-full max-w-xl rounded-2xl border border-[#e5e7eb] bg-[#f3f4f6]/50 p-6 text-left dark:border-[#374151] dark:bg-[#1f2937]/50"
                        aria-labelledby="recovery-instructions-heading"
                    >
                        <h2 id="recovery-instructions-heading" className="text-base font-bold text-[#15803d] dark:text-[#4ade80]">
                            Recommended Manual Recovery Steps
                        </h2>

                        <ol className="mt-4 space-y-3 text-sm text-[#374151] dark:text-[#d1d5db] list-decimal pl-4">
                            <li>
                                <strong>Clear Site Storage Automatically:</strong> Click the
                                <em> &quot;Purge Data &amp; Auto-Recover&quot;</em> button below to scrub local application storage configurations.
                            </li>
                            <li>
                                <strong>Manual Data Purge:</strong> If automated recovery fails, clear cache fragments via your browser environment settings:
                                <ul className="mt-2 space-y-1 pl-4 list-disc text-xs opacity-90">
                                    <li>
                                        <strong className="text-[#171717] dark:text-[#ededed]">Chrome / Edge / Brave:</strong> Click the settings/padlock icon to the left of the URL bar {"\u2192"} Select <strong>Site settings</strong> {"\u2192"} Click <strong>Clear data</strong>.
                                    </li>
                                    <li>
                                        <strong className="text-[#171717] dark:text-[#ededed]">Safari:</strong> Open <strong>Settings</strong> {"\u2192"} Navigate to <strong>Advanced</strong> {"\u2192"} Select <strong>Website Data</strong> {"\u2192"} Locate <em>bonmart</em> and remove.
                                    </li>
                                    <li>
                                        <strong className="text-[#171717] dark:text-[#ededed]">Firefox:</strong> Click the shield lock icon next to the URL address {"\u2192"} Select <strong>Clear cookies and site data</strong>.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <strong>Hard Refresh:</strong> Reload the active layout frame using <kbd className="rounded bg-white px-1.5 py-0.5 text-xs shadow-sm dark:bg-black">Ctrl + F5</kbd> or <kbd className="rounded bg-white px-1.5 py-0.5 text-xs shadow-sm dark:bg-black">Cmd + Shift + R</kbd>.
                            </li>
                        </ol>
                    </section>

                    <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
                        <button
                            onClick={handleStatePurgeAndRecovery}
                            disabled={isClearingState}
                            className="cursor-pointer rounded-xl bg-[#15803d] px-8 py-3 font-semibold text-white shadow-sm transition-all hover:opacity-90 active:scale-95 focus-ring disabled:pointer-events-none disabled:opacity-50"
                        >
                            {isClearingState ? "Purging Environment..." : "Purge Data & Auto-Recover"}
                        </button>

                        <button
                            onClick={() => reset()}
                            className="rounded-xl border border-[#e5e7eb] bg-white px-8 py-3 font-semibold text-[#171717] transition-colors hover:bg-[#f3f4f6] dark:border-[#374151] dark:bg-transparent dark:text-[#ededed] dark:hover:bg-[#374151] focus-ring"
                        >
                            Retry Render Layout
                        </button>
                    </div>
                </main>
            </body>
        </html>
    );
}
