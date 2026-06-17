// src/types/form.ts

import { z } from 'zod';

/**
 * Contact Form Validation Schema
 */
export const contactFormSchema = z.object({
    firstName: z.string().trim().min(2, { error: 'First name must be at least 2 characters.' }),
    lastName: z.string().trim().min(2, { error: 'Last name must be at least 2 characters.' }),
    email: z.string().trim().pipe(
        z.email({ error: 'Please enter a valid email address.' })
    ),
    subject: z.string().trim().min(4, { error: 'Subject must be at least 4 characters.' }),
    message: z.string().trim().min(10, { error: 'Message must be at least 10 characters.' }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

/**
 * Primitive Shipping Validation Schema Token
 */
export const shippingSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(3, { error: 'Full name must be at least 3 characters.' })
        .max(50, { error: 'Full name must not exceed 50 characters.' })
        .regex(/^[a-zA-Z\s\-'\.]+$/, { error: 'Full name contains invalid characters.' }),
    streetAddress: z
        .string()
        .trim()
        .min(5, { error: 'Street address must be at least 5 characters.' })
        .max(100, { error: 'Street address is too long.' }),
    city: z
        .string()
        .trim()
        .min(2, { error: 'City must be at least 2 characters.' })
        .max(50, { error: 'City name is too long.' }),
    postcode: z
        .string()
        .trim()
        .min(4, { error: 'Postcode must be at least 4 characters.' })
        .max(10, { error: 'Postcode must not exceed 10 characters.' })
        .regex(/^[A-Z0-9\s\-]+$/i, { error: 'Please enter a valid postcode.' }),
});

/**
 * Primitive Payment Validation Schema Token
 */
export const paymentSchema = z.object({
    cardNumber: z
        .string()
        .trim()
        .min(15, { error: 'Card number must be at least 15 digits.' })
        .max(19, { error: 'Card number must not exceed 19 characters.' })
        .regex(/^[0-9\s]+$/, { error: 'Card number must contain numbers only.' }),
    expiryDate: z
        .string()
        .trim()
        .min(5, { error: 'Expiry date must match MM/YY format.' })
        .max(5, { error: 'Expiry date must match MM/YY format.' })
        .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, { error: 'Please enter a valid future date (MM/YY).' })
        .refine((val) => {
            if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(val)) return false;
            const [monthStr, yearStr] = val.split('/');
            const expMonth = parseInt(monthStr, 10);
            const expYear = parseInt(`20${yearStr}`, 10);

            const now = new Date();
            const currentMonth = now.getMonth() + 1;
            const currentYear = now.getFullYear();

            return expYear > currentYear || (expYear === currentYear && expMonth >= currentMonth);
        }, { message: 'This card has expired.' }),
    cvc: z
        .string()
        .trim()
        .min(3, { error: 'CVC must be at least 3 digits.' })
        .max(4, { error: 'CVC must not exceed 4 digits.' })
        .regex(/^[0-9]+$/, { error: 'CVC must contain numbers only.' }),
});

/**
 * Unified Master Checkout Data Model Contract
 */
export const checkoutFormSchema = shippingSchema.merge(paymentSchema);

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
export type CheckoutFormErrors = Partial<Record<keyof CheckoutFormData, string>>;
