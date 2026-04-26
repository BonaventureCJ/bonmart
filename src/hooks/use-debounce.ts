// src/hooks/use-debounce.ts

'use client';

import { useEffect, useState } from 'react';

/**
 * Custom hook to debounce a value.
 * Useful for search inputs to prevent excessive API calls or state updates.
 * 
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 300)
 */
export const useDebounce = <T>(value: T, delay: number = 300): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
};
