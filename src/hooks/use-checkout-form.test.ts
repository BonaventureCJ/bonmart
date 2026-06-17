// src/hooks/use-checkout-form.test.ts

import { renderHook, act } from '@testing-library/react';
import { useCheckoutForm } from './use-checkout-form';
import { type ChangeEvent } from 'react';
import { describe, test, expect } from 'vitest';

interface FormValues {
    fullName: string;
    streetAddress: string;
    city: string;
    postcode: string;
    cardNumber: string;
    expiryDate: string;
    cvc: string;
}

function createMockChangeEvent(name: keyof FormValues, value: string): ChangeEvent<HTMLInputElement> {
    return {
        target: { name, value },
    } as ChangeEvent<HTMLInputElement>;
}

describe('useCheckoutForm Custom Hook Suite', () => {
    test('should initialize form fields with clean string states and empty objects', () => {
        const { result } = renderHook(() => useCheckoutForm());

        expect(result.current.values).toEqual({
            fullName: '',
            streetAddress: '',
            city: '',
            postcode: '',
            cardNumber: '',
            expiryDate: '',
            cvc: '',
        });
        expect(result.current.errors).toEqual({});
        expect(result.current.touched).toEqual({});
    });

    describe('Form Input Formatting Pass', () => {
        test('should dynamically format card numbers with space groupings every 4 characters', () => {
            const { result } = renderHook(() => useCheckoutForm());

            act(() => {
                result.current.handleChange(createMockChangeEvent('cardNumber', '1234567812345678'));
            });

            expect(result.current.values.cardNumber).toBe('1234 5678 1234 5678');
        });

        test('should append an explicit slash separator after the second character during expiration inputs', () => {
            const { result } = renderHook(() => useCheckoutForm());

            act(() => {
                result.current.handleChange(createMockChangeEvent('expiryDate', '1229'));
            });

            expect(result.current.values.expiryDate).toBe('12/29');
        });

        test('should scrub out non-numeric character insertions from cvc and postcode data fields', () => {
            const { result } = renderHook(() => useCheckoutForm());

            act(() => {
                result.current.handleChange(createMockChangeEvent('cvc', 'abc34d'));
            });

            expect(result.current.values.cvc).toBe('34');
        });
    });

    describe('Field Validation Pass & Blur Interceptions', () => {
        test('should raise explicit validation error alerts when full name limits are violated', () => {
            const { result } = renderHook(() => useCheckoutForm());

            act(() => {
                result.current.handleBlur('fullName');
            });
            expect(result.current.errors.fullName).toBe('Full name must be at least 3 characters.');

            act(() => {
                result.current.handleChange(createMockChangeEvent('fullName', 'Ed'));
            });

            expect(result.current.errors.fullName).toBe('Full name must be at least 3 characters.');
        });

        test('should throw an error if the credit card digit length evaluates to less than 15 digits', () => {
            const { result } = renderHook(() => useCheckoutForm());

            act(() => {
                result.current.handleChange(createMockChangeEvent('cardNumber', '4111 1111'));
                result.current.handleBlur('cardNumber');
            });

            expect(result.current.errors.cardNumber).toBe('Card number must be at least 15 digits.');
        });

        test('should reject malformed credit card validation dates', () => {
            const { result } = renderHook(() => { return useCheckoutForm(); });

            act(() => {
                // Formatted cleanly into exactly five characters ("14/26") inside state layers
                result.current.handleChange(createMockChangeEvent('expiryDate', '1426'));
            });

            act(() => {
                result.current.handleBlur('expiryDate');
            });

            expect(result.current.errors.expiryDate).toBe('Please enter a valid future date (MM/YY).');
        });

        test('should accurately calculate card expiration limits based on the current calendar year', () => {
            const { result } = renderHook(() => { return useCheckoutForm(); });

            const pastYearShort = (new Date().getFullYear() - 1).toString().slice(-2);

            act(() => {
                // Passes clean 4-digit token structure to let formatExpiry mask cleanly into "01/XX"
                result.current.handleChange(createMockChangeEvent('expiryDate', `01${pastYearShort}`));
            });

            act(() => {
                result.current.handleBlur('expiryDate');
            });

            expect(result.current.errors.expiryDate).toBe('This card has expired.');
        });
    });

    describe('validateAll Submission Layer', () => {
        test('should return false and touch all properties when evaluation sets fail', () => {
            const { result } = renderHook(() => useCheckoutForm());

            let isValid = true;
            act(() => {
                isValid = result.current.validateAll();
            });

            expect(isValid).toBe(false);
            expect(result.current.touched.fullName).toBe(true);
            expect(result.current.touched.cvc).toBe(true);
            expect(result.current.errors.fullName).toBe('Full name must be at least 3 characters.');
        });

        test('should return true and submit with zero errors when complete valid payloads pass', () => {
            const { result } = renderHook(() => useCheckoutForm());

            const futureYearShort = (new Date().getFullYear() + 4).toString().slice(-2);

            act(() => {
                result.current.handleChange(createMockChangeEvent('fullName', 'Bonaventure Ugwu'));
                result.current.handleChange(createMockChangeEvent('streetAddress', '123 Green Way'));
                result.current.handleChange(createMockChangeEvent('city', 'Calabar'));
                result.current.handleChange(createMockChangeEvent('postcode', '54321'));
                result.current.handleChange(createMockChangeEvent('cardNumber', '4111111111111111'));
                result.current.handleChange(createMockChangeEvent('expiryDate', `12${futureYearShort}`));
                result.current.handleChange(createMockChangeEvent('cvc', '123'));
            });

            let isValid = false;
            act(() => {
                isValid = result.current.validateAll();
            });

            expect(isValid).toBe(true);
            expect(Object.values(result.current.errors).every((err) => { return !err; })).toBe(true);
        });
    });
});
