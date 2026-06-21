// src/types/product.ts

/**
 * Enterprise Core Domain Definition for a Marketplace Product
 * Used across server routing pipelines, client components, and state normalization layers.
 */
export interface Product {
    id: number;
    slug: string;
    name: string;
    price: number;
    description: string;
    category: string;
    imageUrl: string;
    rating: {
        rate: number;
        count: number;
    };
    isEcoFriendly: boolean;
}
