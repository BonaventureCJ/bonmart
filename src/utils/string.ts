// src/utils/string.ts

/**
 * Enterprise SEO Slug Generator
 * Converts a raw product title string into a deterministic, URL-safe SEO string.
 * Shared across server data boundaries and client-side normalization frameworks.
 */
export const generateSlug = (text: string): string => {
    if (!text) return '';

    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-') // Convert special characters and spaces to hyphens
        .replace(/(^-|-$)+/g, '');   // Trim leading or trailing hyphens
};
