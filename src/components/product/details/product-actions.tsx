// src/components/product/details/product-actions.tsx

'use client';

import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui/icon/icon';
import { Button } from '@/components/ui/button/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/features/cart/cart-slice';
import { toggleWishlist } from '@/features/wishlist/wishlist-slice';
import type { Product } from '@/data/mock-products';

export function ProductActions({ product }: { product: Product }) {
    const dispatch = useAppDispatch();
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    const isFavourite = useAppSelector((state) =>
        state.wishlist.items.some((item) => item.id === product.id)
    );

    useEffect(() => {
        if (isAdded) {
            const timer = setTimeout(() => setIsAdded(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isAdded]);

    const handleUpdateQuantity = (type: 'inc' | 'dec') => {
        setQuantity((prev) => (type === 'inc' ? prev + 1 : Math.max(1, prev - 1)));
    };

    return (
        <div className="mb-10 flex flex-col gap-4 sm:flex-row">
            <div className="flex items-center justify-between rounded-full border border-(--toggle-bg) bg-(--background) p-1.5 sm:w-36">
                <Button
                    variant="ghost" size="sm" icon="minus"
                    ariaLabel="Decrease" onClick={() => handleUpdateQuantity('dec')}
                    disabled={quantity <= 1}
                />
                <span className="w-10 text-center font-bold text-(--foreground)" aria-live="polite">{quantity}</span>
                <Button variant="ghost" size="sm" icon="plus" ariaLabel="Increase" onClick={() => handleUpdateQuantity('inc')} />
            </div>

            <Button
                variant={isAdded ? "secondary" : "primary"}
                size="lg" fullWidth icon={isAdded ? "check" : "cart"}
                onClick={() => { dispatch(addToCart({ ...product, quantity })); setIsAdded(true); }}
                className="flex-1 shadow-md transition-all active:scale-95"
            >
                {isAdded ? "Added to Cart" : "Add to Shopping Cart"}
            </Button>

            <Button
                variant="secondary" size="lg"
                ariaLabel={isFavourite ? "Remove from wishlist" : "Add to wishlist"}
                onClick={() => dispatch(toggleWishlist(product))}
                className={clsx("flex items-center gap-2 transition-all active:scale-95 sm:px-6", isFavourite && "bg-(--brand-color)/10")}
            >
                <Icon name="heart" size={20} filled={isFavourite} className="text-(--brand-color)" />
                <span className="text-sm font-bold text-(--brand-color)">
                    {isFavourite ? "Saved to Favourites" : "Add to Favourites"}
                </span>
            </Button>
        </div>
    );
}
