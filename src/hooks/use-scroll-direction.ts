// src/hooks/use-scroll-direction.ts

'use client';

import { useEffect, useState, useRef } from 'react';

type ScrollDirection = 'up' | 'down' | null;

/**
 * Enterprise hook to track vertical scroll direction.
 * @param enabled - If false, the hook returns null and skips event listeners (optimization).
 * @param threshold - Pixels to scroll before triggering a direction change.
 */
export const useScrollDirection = (enabled: boolean = true, threshold = 10) => {
    const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
    const lastScrollY = useRef(0);

    useEffect(() => {
        if (!enabled) {
            setScrollDirection(null);
            return;
        }

        const updateScrollDirection = () => {
            const scrollY = window.scrollY;

            if (Math.abs(scrollY - lastScrollY.current) < threshold) return;

            const direction: ScrollDirection = scrollY > lastScrollY.current ? 'down' : 'up';

            if (direction !== scrollDirection) {
                // Always force 'up' (visible) when near the top of the page
                setScrollDirection(scrollY < 10 ? 'up' : direction);
            }

            lastScrollY.current = scrollY > 0 ? scrollY : 0;
        };

        window.addEventListener('scroll', updateScrollDirection, { passive: true });
        return () => window.removeEventListener('scroll', updateScrollDirection);
    }, [scrollDirection, threshold, enabled]);

    return scrollDirection;
};

