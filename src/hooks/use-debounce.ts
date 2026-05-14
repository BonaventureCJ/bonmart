// src/hooks/use-debounce.ts
'use client';

import { useState, useEffect } from 'react';

/**
 * Abstract Utility Debounce Hook
 * Limits re-evaluation cycles of high-frequency input mutations.
 */
export function useDebounce<T>(value: T, delay = 180): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
