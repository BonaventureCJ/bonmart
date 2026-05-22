// src/components/layout/announcement-bar.tsx

'use client';

import { clsx } from 'clsx';
import { Icon } from '@/components/ui/icon/icon';
import { Button } from '@/components/ui/button/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { dismissAnnouncement } from '@/features/ui/ui-slice';
import { selectIsAnnouncementDismissed } from '@/features/ui/ui-selectors';

/**
 * Enterprise Announcement Bar.
 * Global Notification Component for critical updates.
 * State-driven via Redux Toolkit for consistent global UI orchestration.
 */
export function AnnouncementBar() {
    const dispatch = useAppDispatch();
    const isDismissed = useAppSelector(selectIsAnnouncementDismissed);

    const handleDismiss = () => {
        dispatch(dismissAnnouncement());
        localStorage.setItem('bm_announcement_dismissed', 'true');
    };

    if (isDismissed) return null;

    return (
        <aside
            role="status"
            className={clsx(
                "relative z-70 flex min-h-10 w-full items-center justify-center px-12 py-2 text-center text-xs font-medium sm:text-sm",
                "bg-(--brand-color) text-(--text-on-brand)"
            )}
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
                className={clsx(
                    "absolute right-2 flex h-8 w-8 items-center justify-center rounded-full border-none transition-all duration-200",
                    "text-(--text-on-brand)",
                    /**
                     * REVIEWER NOTE: 
                     * We use arbitrary color functions here to replicate "black/15" logic using 
                     * the enterprise --color-surface-dark token. This approach is chosen to 
                     * override the internal hover:bg-(--toggle-hover-bg) defined in the 
                     * shared Button component without modifying the base UI library.
                     */
                    "hover:bg-[rgb(from_var(--color-surface-dark)_r_g_b_/_0.15)]",
                    "active:bg-[rgb(from_var(--color-surface-dark)_r_g_b_/_0.25)]"
                )}
            >
                <Icon name="close" size={16} aria-hidden="true" />
            </Button>
        </aside>
    );
}
