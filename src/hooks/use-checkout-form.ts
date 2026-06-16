// src/hooks/use-checkout-form.ts

'use client';

import { useState, ChangeEvent } from 'react';
import type { CheckoutFormData, CheckoutFormErrors } from '@/types/form';

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

    const validateField = (name: keyof CheckoutFormData, value: string): string => {
        const trimmed = value.trim();
        switch (name) {
            case 'fullName':
                if (!trimmed) return 'Full name is required.';
                if (trimmed.length < 3) return 'Name must be at least 3 characters.';
                return '';
            case 'streetAddress':
                return !trimmed ? 'Street address is required.' : '';
            case 'city':
                return !trimmed ? 'City is required.' : '';
            case 'postcode':
                return !/^\d{5,6}$/.test(trimmed) ? 'Provide a valid zip/postcode (5-6 digits).' : '';
            case 'cardNumber':
                return trimmed.replace(/\s/g, '').length !== 16 ? 'Card number must be 16 digits.' : '';
            case 'expiryDate': {
                if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(trimmed)) {
                    return 'Expiry must use MM/YY format.';
                }

                const [monthStr, yearStr] = trimmed.split('/');
                const expMonth = parseInt(monthStr, 10);
                const expYear = parseInt(`20${yearStr}`, 10);

                const now = new Date();
                const currentMonth = now.getMonth() + 1;
                const currentYear = now.getFullYear();

                if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
                    return 'This card has expired.';
                }
                return '';
            }
            case 'cvc':
                return !/^\d{3,4}$/.test(trimmed) ? 'CVC must be 3 or 4 digits.' : '';
            default:
                return '';
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let targetValue = value;

        if (name === 'cardNumber') targetValue = formatCardNumber(value);
        if (name === 'expiryDate') targetValue = formatExpiry(value);
        if (name === 'cvc' || name === 'postcode') targetValue = value.replace(/\D/g, '');

        setValues((prev) => ({ ...prev, [name]: targetValue }));

        if (touched[name as keyof CheckoutFormData]) {
            const error = validateField(name as keyof CheckoutFormData, targetValue);
            setErrors((prev) => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (name: keyof CheckoutFormData) => {
        setTouched((prev) => ({ ...prev, [name]: true }));
        const error = validateField(name, values[name]);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const validateAll = (): boolean => {
        const freshErrors: CheckoutFormErrors = {};
        let isValid = true;

        (Object.keys(values) as Array<keyof CheckoutFormData>).forEach((key) => {
            const error = validateField(key, values[key]);
            if (error) {
                freshErrors[key] = error;
                isValid = false;
            }
        });

        setErrors(freshErrors);
        setTouched(
            Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {})
        );
        return isValid;
    };

    return { values, errors, touched, handleChange, handleBlur, validateAll };
}
