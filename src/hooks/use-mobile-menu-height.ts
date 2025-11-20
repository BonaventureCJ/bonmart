// src/hooks/use-mobile-menu-height.ts
'use client';

import { useEffect } from 'react';

/**
 * Custom hook to calculate and set the viewport height, addressing mobile browser UI issues.
 * @returns {void}
 */
export const useMobileMenuHeight = () => {
    useEffect(() => {
        const setViewportHeight = () => {
            const viewportHeight = window.innerHeight;
            document.documentElement.style.setProperty(
                '--vh',
                `${viewportHeight}px`,
            );
        };

        // Set the height initially and on resize
        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('resize', setViewportHeight);
    }, []);
};
