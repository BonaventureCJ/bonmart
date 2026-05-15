// src/components/search/search-submit-button.tsx
import React from 'react';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui/icon/icon';

interface SearchSubmitButtonProps {
    isPending: boolean;
    className?: string;
}

export const SearchSubmitButton: React.FC<SearchSubmitButtonProps> = ({
    isPending,
    className
}) => {
    return (
        <button
            type="submit"
            disabled={isPending}
            className={clsx(
                // Base styles from primary button theme
                "relative h-8 overflow-hidden rounded-full px-5 text-xs font-bold transition-all active:scale-95",
                "bg-(--brand-color) text-(--text-on-image) hover:opacity-90",
                "disabled:bg-(--brand-color)/40 disabled:text-(--text-on-image)/60 disabled:cursor-not-allowed",
                className
            )}
            aria-label={isPending ? "Searching products" : "Execute search"}
        >
            {/* Loading Overlay: Does not affect button dimensions */}
            {isPending && (
                <div className="absolute inset-0 flex items-center justify-center bg-(--brand-color)">
                    <Icon
                        name="loader"
                        size={16}
                        className="animate-spin text-(--text-on-image)"
                    />
                </div>
            )}

            {/* Main Label: Always present in DOM to reserve width */}
            <span className={clsx(isPending && "invisible")}>
                Search
            </span>
        </button>
    );
};
