// src/types/form.ts

export interface CheckoutFormData {
    fullName: string;
    streetAddress: string;
    city: string;
    postcode: string;
    cardNumber: string;
    expiryDate: string;
    cvc: string;
}

export type CheckoutFormErrors = Partial<Record<keyof CheckoutFormData, string>>;

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;
