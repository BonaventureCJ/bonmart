// src/app/global-error.tsx

"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

/**
 * Global Error Boundary (Last Resort)
 * We avoid reusable components here to ensure this renders 
 * even if the component library or context providers crash.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center p-6 text-center font-sans bg-white text-[#171717]">
        {/* Hardcoded SVG instead of Icon component for maximum stability */}
        <div className="mb-6 rounded-full bg-[#fee2e2] p-6 text-[#dc2626]">
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

        <h1 className="mb-4 text-3xl font-bold tracking-tight">
          Critical System Interruption
        </h1>

        <p className="mb-8 max-w-md text-lg text-[#374151]">
          A core system error occurred. We have been notified and are 
          investigating the interruption to your sustainable shopping.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            onClick={() => reset()}
            className="cursor-pointer rounded-xl bg-[#15803d] px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90 shadow-sm"
          >
            Recover System
          </button>
          
          <a
            href="/"
            className="rounded-xl border border-[#e5e7eb] px-8 py-3 font-semibold text-[#171717] transition-colors hover:bg-[#f3f4f6]"
          >
            Return Home
          </a>
        </div>

        {error.digest && (
          <p className="mt-12 font-mono text-[10px] uppercase tracking-widest opacity-30">
            Error ID: {error.digest}
          </p>
        )}
      </body>
    </html>
  );
}
