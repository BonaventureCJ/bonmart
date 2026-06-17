// src/hooks/use-checkout-form.ts

'use client';

import { useState, ChangeEvent } from 'react';
import { checkoutFormSchema, type CheckoutFormData, type CheckoutFormErrors } from '@/types/form';

const INITIAL_STATE: CheckoutFormData = {
    fullName: '',
    streetAddress: '',
    city: '',
    postcode: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
};

export function useCheckoutForm() {
    const [values, setValues] = useState<CheckoutFormData>(INITIAL_STATE);
    const [errors, setErrors] = useState<CheckoutFormErrors>({});
    const [touched, setTouched] = useState<Partial<Record<keyof CheckoutFormData, boolean>>>({});

    const formatCardNumber = (value: string): string => {
        const digits = value.replace(/\D/g, '');
        const groups = digits.match(/.{1,4}/g);
        return groups ? groups.slice(0, 4).join(' ') : digits;
    };

    const formatExpiry = (value: string): string => {
        const digits = value.replace(/\D/g, '');
        if (digits.length >= 2) {
            return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
        }
        return digits;
    };

    // Safe isolated field evaluator validating ONLY the current targeted field value slice
    const validateFieldState = (name: keyof CheckoutFormData, value: string): string => {
        // Generate a temporary mock validation shape containing only the current targeted input value
        const result = checkoutFormSchema.safeParse({
            ...INITIAL_STATE,
            [name]: value,
        });

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            return fieldErrors[name]?.[0] || '';
        }
        return '';
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let targetValue = value;

        if (name === 'cardNumber') targetValue = formatCardNumber(value);
        if (name === 'expiryDate') targetValue = formatExpiry(value);
        if (name === 'cvc' || name === 'postcode') targetValue = value.replace(/\D/g, '');

        setValues((prev) => ({ ...prev, [name]: targetValue }));

        // Instant validation feedback on input transformation if previously blurred
        if (touched[name as keyof CheckoutFormData]) {
            const error = validateFieldState(name as keyof CheckoutFormData, targetValue);
            setErrors((prev) => ({ ...prev, [name]: error || undefined }));
        }
    };

    const handleBlur = (name: keyof CheckoutFormData) => {
        setTouched((prev) => ({ ...prev, [name]: true }));
        const error = validateFieldState(name, values[name]);
        setErrors((prev) => ({ ...prev, [name]: error || undefined }));
    };

    const validateAll = (): boolean => {
        const result = checkoutFormSchema.safeParse(values);

        if (!result.success) {
            const flattened = result.error.flatten();
            const freshErrors: CheckoutFormErrors = {};

            Object.entries(flattened.fieldErrors).forEach(([key, val]) => {
                if (val && val.length > 0) {
                    freshErrors[key as keyof CheckoutFormData] = val[0];
                }
            });

            setErrors(freshErrors);

            // Type-safe approach to dynamically flag all fields as touched
            const allTouched = Object.fromEntries(
                Object.keys(values).map((key) => [key, true])
            ) as Record<keyof CheckoutFormData, boolean>;

            setTouched(allTouched);
            return false;
        }

        setErrors({});
        return true;
    };

    return { values, errors, touched, handleChange, handleBlur, validateAll };
}
