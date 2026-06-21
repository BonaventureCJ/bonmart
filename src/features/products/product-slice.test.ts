// src/features/products/product-slice.test.ts

import { describe, test, expect } from 'vitest';
import { productsAdapter, transformRawApiProducts } from './product-slice';

/**
 * Enterprise Schema Matching Definition for Mocking Raw API Responses
 */
interface ApiProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

describe('Product RTK Query Boundary & Slice Suite', () => {

    describe('transformRawApiProducts Data Transformer', () => {

        test('should translate raw external API keys into strict local Product interface declarations', () => {
            const rawApiInput: ApiProduct[] = [
                {
                    id: 1,
                    title: 'Fjallraven Backpack',
                    price: 109.95,
                    description: 'Padded laptop storage sleeve.',
                    category: "men's clothing",
                    image: 'https://fakestoreapi.com',
                    rating: { rate: 3.9, count: 120 }
                }
            ];

            const transformedResult = transformRawApiProducts(rawApiInput);
            expect(transformedResult).toHaveLength(1);

            const transformedEntity = transformedResult[0];
            // Verify that structural field translations have mapped successfully
            expect(transformedEntity.name).toBe('Fjallraven Backpack');
            expect(transformedEntity.imageUrl).toBe('https://fakestoreapi.com');
            expect(transformedEntity.slug).toBe('fjallraven-backpack');
        });

        test('should apply deterministic green brand initiative parameters during translation passes', () => {
            const rawApiInput: ApiProduct[] = [
                {
                    id: 1,
                    title: 'Non-Eco Clothing Item',
                    price: 20.00,
                    description: 'Standard cotton t-shirt.',
                    category: "men's clothing",
                    image: 'https://fakestoreapi.com',
                    rating: { rate: 4.0, count: 50 }
                },
                {
                    id: 2,
                    title: 'Eco Friendly Matching ID Item',
                    price: 25.00,
                    description: 'Recycled blend textile item.',
                    category: "men's clothing",
                    image: 'https://fakestoreapi.com',
                    rating: { rate: 4.2, count: 80 }
                },
                {
                    id: 3,
                    title: 'Eco Friendly Jewelery Category Item',
                    price: 150.00,
                    description: 'Sustainable conflict-free accessory item.',
                    category: 'jewelery',
                    image: 'https://fakestoreapi.com',
                    rating: { rate: 4.8, count: 200 }
                }
            ];

            const transformedResult = transformRawApiProducts(rawApiInput);

            expect(transformedResult[0].isEcoFriendly).toBe(false); // ID 1, Category clothing -> Non-eco
            expect(transformedResult[1].isEcoFriendly).toBe(true);  // ID 2 -> Even ID fallback rule met
            expect(transformedResult[2].isEcoFriendly).toBe(true);  // ID 3 -> Jewelry category rule met
        });
    });

    describe('transformResponse Cache Normalization Engine', () => {

        test('should convert transformed raw arrays into a normalized EntityState sorted alphabetically by name', () => {
            const rawApiInput: ApiProduct[] = [
                {
                    id: 99,
                    title: 'Zebra Canvas Shopping Sack',
                    price: 15.00,
                    description: 'Reusable grocery transport alternative.',
                    category: 'bags',
                    image: 'https://fakestoreapi.com',
                    rating: { rate: 4.5, count: 10 }
                },
                {
                    id: 88,
                    title: 'Alpha Recycled Notebook Binder',
                    price: 5.00,
                    description: 'Zero-waste post-consumer paper bundle.',
                    category: 'stationery',
                    image: 'https://fakestoreapi.com',
                    rating: { rate: 4.8, count: 12 }
                }
            ];

            /**
             * Type-Safe Enterprise Normalization Test Strategy:
             * We feed the raw data directly through the shared transformation utility node,
             * then inject the output directly into the productsAdapter engine. This replicates 
             * the exact operational sequence executed inside the RTK Query fetch engine.
             */
            const transformedProducts = transformRawApiProducts(rawApiInput);
            const baseInitialState = productsAdapter.getInitialState();
            const normalizedState = productsAdapter.setAll(baseInitialState, transformedProducts);

            // Assert standard EntityState shape mapping configurations
            expect(normalizedState.ids).toHaveLength(2);

            // Alpha must appear first inside the ID index due to alphabetical sortComparer logic
            expect(normalizedState.ids[0]).toBe(88);
            expect(normalizedState.ids[1]).toBe(99);

            expect(normalizedState.entities[88]?.name).toBe('Alpha Recycled Notebook Binder');
            expect(normalizedState.entities[99]?.name).toBe('Zebra Canvas Shopping Sack');
        });
    });
});
