// src/data/cart-data.ts

import { MOCK_PRODUCTS, type Product } from './mock-products';

export interface CartItem extends Product {
  quantity: number;
}

export const CART_ITEMS: CartItem[] = [
  {
    ...MOCK_PRODUCTS[0], // Fjallraven Backpack
    quantity: 1,
  },
  {
    ...MOCK_PRODUCTS[1], // Mens Casual Slim Fit T-Shirt
    quantity: 2,
  },
  {
    ...MOCK_PRODUCTS[5], // Solid Gold Petite Micropave
    quantity: 1,
  },
];
