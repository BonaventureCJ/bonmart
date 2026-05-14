// src/components/product/card/card-rating.tsx

import { Icon } from '@/components/ui/icon/icon';

export function CardRating({ rate, count }: { rate: number; count: number }) {
    return (
        <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5 text-(--warning)">
                <Icon name="star" size={12} variant="warning" filled />
                <span className="font-bold tabular-nums text-(--foreground)">{rate}</span>
            </div>
            <span className="text-(--neutral-color) opacity-50 tabular-nums">({count})</span>
        </div>
    );
}
