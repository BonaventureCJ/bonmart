// src/components/product/card/use-product-actions.ts

'use client';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/features/cart/cart-slice';
import { selectIsItemInCart } from '@/features/cart/cart-selectors';
import { toggleWishlist } from '@/features/wishlist/wishlist-slice';
import { selectIsProductWishlisted } from '@/features/wishlist/wishlist-selectors';
import type { Product } from '@/types/product';

export function useProductActions(product: Product) {
    const dispatch = useAppDispatch();
    const [isAnimating, setIsAnimating] = useState(false);
    const [isHeartAnimating, setIsHeartAnimating] = useState(false);

    const isInCart = useAppSelector((state) => selectIsItemInCart(product.id)(state));
    const isFavourite = useAppSelector((state) => selectIsProductWishlisted(product.id)(state));

    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => setIsAnimating(false), 700);
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    useEffect(() => {
        if (isHeartAnimating) {
            const timer = setTimeout(() => setIsHeartAnimating(false), 200);
            return () => clearTimeout(timer);
        }
    }, [isHeartAnimating]);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart({ ...product, quantity: 1 }));
        setIsAnimating(true);
    };

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleWishlist(product));
        setIsHeartAnimating(true);
    };

    return {
        isInCart,
        isFavourite,
        isAnimating,
        isHeartAnimating,
        handleAddToCart,
        handleWishlistToggle,
    };
}
