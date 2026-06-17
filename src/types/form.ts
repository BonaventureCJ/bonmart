// src/types/form.ts

/* src/types/form.ts */
import { z } from 'zod';

/**
 * Primitive Shipping Schema Token
 */
export const shippingSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(3, 'Full name must be at least 3 characters.')
        .max(50, 'Full name must not exceed 50 characters.')
        .regex(/^[a-zA-Z\s\-'\.]+$/, 'Full name contains invalid characters.'),
    streetAddress: z
        .string()
        .trim()
        .min(5, 'Street address must be at least 5 characters.')
        .max(100, 'Street address is too long.'),
    city: z
        .string()
        .trim()
        .min(2, 'City must be at least 2 characters.')
        .max(50, 'City name is too long.'),
    postcode: z
        .string()
        .trim()
        .min(4, 'Postcode must be at least 4 characters.')
        .max(10, 'Postcode must not exceed 10 characters.')
        .regex(/^[A-Z0-9\s\-]+$/i, 'Please enter a valid postcode.'),
});

/**
 * Primitive Payment Schema Token
 */
export const paymentSchema = z.object({
    cardNumber: z
        .string()
        .trim()
        // Strips spaces dynamically for strict numeric evaluation if necessary
        .min(15, 'Card number must be at least 15 digits.')
        .max(19, 'Card number must not exceed 19 characters.')
        .regex(/^[0-9\s]+$/, 'Card number must contain numbers only.'),
    expiryDate: z
        .string()
        .trim()
        .min(5, 'Expiry date must match MM/YY format.')
        .max(5, 'Expiry date must match MM/YY format.')
        .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Please enter a valid future date (MM/YY).'),
    cvc: z
        .string()
        .trim()
        .min(3, 'CVC must be at least 3 digits.')
        .max(4, 'CVC must not exceed 4 digits.')
        .regex(/^[0-9]+$/, 'CVC must contain numbers only.'),
});

/**
 * Unified Unified Master Checkout Data Model Contract
 */
export const checkoutFormSchema = shippingSchema.merge(paymentSchema);

// Inferred TypeScript Type Interfaces
export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
export type CheckoutFormErrors = Partial<Record<keyof CheckoutFormData, string>>;


