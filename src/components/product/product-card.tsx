//src/components/product/product-card.tsx

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Leaf, Star } from "lucide-react";
import { clsx } from "clsx";

interface ProductCardProps {
    id: string;
    slug: string;
    name: string;
    price: number;
    originalPrice?: number;
    imageUrl: string;
    imageAlt?: string;
    category: string;
    rating: number;
    isEcoFriendly: boolean;
    priority?: boolean;
}

/**
 * ProductCard Component 
 * Enhanced with Tailwind CSS v4.1 variable shorthands.
 */
export default function ProductCard({
    id,
    slug,
    name,
    price,
    originalPrice,
    imageUrl,
    imageAlt,
    category,
    rating,
    isEcoFriendly,
    priority = false,
}: ProductCardProps) {
    const discountPercentage = originalPrice
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : null;

    return (
        <article
            className={clsx(
                "group relative flex flex-col overflow-hidden rounded-xl border border-transparent",
                "bg-[--background] transition-all duration-[--duration-long] ease-[--transition-ease-in-out]",
                "hover:shadow-lg hover:border-[--brand-color]"
            )}
        >
            {/* Media Section */}
            <div className="aspect-[4/5] relative w-full overflow-hidden bg-[--toggle-container-bg]">
                <Link
                    href={`/products/${slug}`}
                    className="block h-full w-full"
                    tabIndex={-1}
                >
                    <Image
                        src={imageUrl}
                        alt={imageAlt || name}
                        fill
                        priority={priority}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>

                {/* Floating Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {isEcoFriendly && (
                        <span className="flex items-center gap-1 rounded-full bg-[--brand-color] px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
                            <Leaf size={12} fill="currentColor" />
                            Eco-Conscious
                        </span>
                    )}
                    {discountPercentage && (
                        <span className="w-fit rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
                            -{discountPercentage}%
                        </span>
                    )}
                </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[--neutral-color] uppercase tracking-widest">
                        {category}
                    </span>
                    <div
                        className="flex items-center gap-1 text-amber-500"
                        aria-label={`Rating: ${rating} out of 5 stars`}
                    >
                        <Star size={12} fill="currentColor" />
                        <span className="text-xs font-medium text-[--foreground]">{rating}</span>
                    </div>
                </div>

                <Link
                    href={`/products/${slug}`}
                    className="focus-ring mb-2 block rounded-sm outline-none"
                >
                    <h3 className="line-clamp-2 text-base font-bold leading-tight transition-colors group-hover:text-[--brand-color]">
                        {name}
                    </h3>
                </Link>

                {/* Price & Action Section */}
                <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex flex-col">
                        {originalPrice && (
                            <del className="text-xs text-[--neutral-color] no-underline">
                                <span className="sr-only">Original price: </span>
                                <span className="line-through">${originalPrice.toFixed(2)}</span>
                            </del>
                        )}
                        <span className="text-lg font-black tracking-tight">
                            <span className="sr-only">Current price: </span>
                            ${price.toFixed(2)}
                        </span>
                    </div>

                    <button
                        type="button"
                        aria-label={`Add ${name} to shopping cart`}
                        className={clsx(
                            "focus-ring flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-none",
                            "bg-[--toggle-container-bg] text-[--foreground] transition-all duration-200",
                            "hover:bg-[--brand-color] hover:text-white active:scale-95"
                        )}
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </article>
    );
}
