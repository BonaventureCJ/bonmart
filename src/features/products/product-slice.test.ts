// src/features/products/product-slice.test.ts

import productReducer, {
    setProducts,
    updateProduct,
    setLoading,
    setError,
} from './product-slice';
import { MOCK_PRODUCTS, type Product } from '@/data/mock-products';

describe('Product Slice Suite', () => {

    test('should initialize with populated mock products sorted alphabetically', () => {
        // Passing undefined state forces Redux to run the slice initialization logic
        const state = productReducer(undefined, { type: '@@INIT' });

        expect(state.isLoading).toBe(false);
        expect(state.error).toBeNull();
        expect(state.ids).toHaveLength(MOCK_PRODUCTS.length);

        // Verify the sortComparer is enforcing alphabetical order on start
        const firstProduct = state.entities[state.ids[0]];
        const secondProduct = state.entities[state.ids[1]];

        expect(firstProduct?.name.localeCompare(secondProduct?.name ?? '')).toBeLessThanOrEqual(0);
    });

    test('should handle setProducts payload insertion and enforce alphabetical sorting', () => {
        const freshUnsortedItems: Product[] = [
            {
                id: 99,
                slug: 'zebra-item',
                name: 'Zebra Sustainable Eco Bag',
                price: 15.00,
                description: 'Eco friendly canvas bag.',
                category: 'bags',
                imageUrl: '/img/bag.jpg',
                rating: { rate: 4.5, count: 10 },
                isEcoFriendly: true,
            },
            {
                id: 88,
                slug: 'alpha-item',
                name: 'Alpha Recycled Notebook',
                price: 5.00,
                description: 'Notebook made from recycled stock.',
                category: 'stationery',
                imageUrl: '/img/notebook.jpg',
                rating: { rate: 4.8, count: 12 },
                isEcoFriendly: true,
            },
        ];

        // Trigger state override passing our fresh unsorted items payload
        const state = productReducer(undefined, setProducts(freshUnsortedItems));

        expect(state.ids).toHaveLength(2);
        // Alpha must come before Zebra due to the sortComparer, forcing layout order invariance
        expect(state.ids[0]).toBe(88);
        expect(state.ids[1]).toBe(99);
    });

    test('should handle updateProduct to insert new elements or patch existing records via upsert', () => {
        const stateWithInit = productReducer(undefined, { type: '@@INIT' });

        const updatedProductPatch: Product = {
            id: 2, // Overriding default entry id: 2 ('Mens Casual Premium Slim Fit T-Shirts ')
            slug: 'patched-premium-tee',
            name: 'Patched Premium Bio Tee',
            price: 24.99, // Altered price parameter
            description: 'Modified eco description details.',
            category: "men's clothing",
            imageUrl: '/img/patched.jpg',
            rating: { rate: 4.9, count: 300 },
            isEcoFriendly: true,
        };

        const nextState = productReducer(stateWithInit, updateProduct(updatedProductPatch));

        expect(nextState.entities[2]?.name).toBe('Patched Premium Bio Tee');
        expect(nextState.entities[2]?.price).toBe(24.99);
        expect(nextState.ids).toHaveLength(MOCK_PRODUCTS.length); // Total count remains un-mutated
    });

    test('should toggle isLoading state flags predictably', () => {
        const initialState = productReducer(undefined, { type: '@@INIT' });

        const loadingState = productReducer(initialState, setLoading(true));
        expect(loadingState.isLoading).toBe(true);

        const completeState = productReducer(loadingState, setLoading(false));
        expect(completeState.isLoading).toBe(false);
    });

    test('should capture and assign explicit string error messages', () => {
        const initialState = productReducer(undefined, { type: '@@INIT' });

        const errorState = productReducer(initialState, setError('CRITICAL_API_TIMEOUT'));
        expect(errorState.error).toBe('CRITICAL_API_TIMEOUT');

        const recoveredState = productReducer(errorState, setError(null));
        expect(recoveredState.error).toBeNull();
    });
});
