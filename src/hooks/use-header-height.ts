// src/hooks/use-header-height.ts

import { useEffect, useState, RefObject } from 'react';

/**
 * Hook to measure the real-time height of the header area.
 * Uses ResizeObserver to handle height changes from text wrapping or bar dismissal.
 */
export function useHeaderHeight(ref: RefObject<HTMLDivElement | null>) {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (!ref.current) return;

        const updateHeight = () => {
            if (ref.current) {
                setHeight(ref.current.offsetHeight);
            }
        };

        const resizeObserver = new ResizeObserver(updateHeight);
        resizeObserver.observe(ref.current);

        updateHeight();
        return () => resizeObserver.disconnect();
    }, [ref]);

    return height;
}
