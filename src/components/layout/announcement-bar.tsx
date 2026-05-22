// src/components/layout/announcement-bar.tsx

'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@/components/ui/icon/icon';
import { Button } from '@/components/ui/button/button';

/**
 * Announcement Bar.
 * Global notification component with persistence logic and brand alignment.
 */
export function AnnouncementBar() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const isDismissed = localStorage.getItem('bm_announcement_dismissed');
        if (!isDismissed) setIsVisible(true);
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem('bm_announcement_dismissed', 'true');
    };

    if (!isVisible) return null;

    return (
        <aside
            role="status"
            className="relative z-70 flex min-h-10 w-full items-center justify-center bg-(--brand-color) px-12 py-2 text-center text-xs font-medium text-(--text-on-brand) sm:text-sm"
        >
            <div className="flex items-center gap-2">
                <Icon name="refresh" size={14} className="animate-spin" />
                <p>
                    BonMart is under CI/CD: Most features are ready for exploration; more added on a rolling basis!
                </p>
            </div>

            <Button
                variant="ghost"
                size="sm"
                ariaLabel="Dismiss announcement"
                onClick={handleDismiss}
                className="absolute right-2 border-none text-(--text-on-brand) hover:bg-(--surface-dark)/15 active:bg-(--surface-dark)/25"
            >
                <Icon name="close" size={16} aria-hidden="true" />
            </Button>
        </aside>
    );
}
