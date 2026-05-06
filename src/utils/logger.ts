// src/utils/logger.ts

/**
 * Enterprise Logger Utility
 * Centralizes application error reporting.
 */
export const logger = {
    error: (message: string, error: Error, digest?: string) => {
        // TODO: Integrate Sentry or a lightweight logging service here 
        // once Next.js 15 manifest conflicts are resolved.

        if (process.env.NODE_ENV === 'development') {
            console.error(`[Bonmart Error] ${message}:`, {
                error,
                digest,
                stack: error.stack,
            });
        }
    },
};
