// src/components/product/card/card-badge.tsx

import { Icon } from '@/components/ui/icon/icon';
import { clsx } from 'clsx';

export function CardBadge({ className }: { className?: string }) {
    return (
        <div
            className={clsx(
                "flex items-center gap-1 rounded-full bg-(--brand-color) p-1 text-[8px] font-bold uppercase tracking-tighter text-(--text-on-image) animate-zoom-in",
                "md:px-2 md:py-0.5 md:text-[9px] md:tracking-wider",
                className
            )}
        >
            <Icon name="leaf" size={10} className="text-(--text-on-image) transition-transform duration-300 group-hover:rotate-12" />
            <span>Eco Choice</span>
        </div>
    );
}
