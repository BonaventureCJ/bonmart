// src/hooks/use-contact-form.test.ts

import { renderHook, act } from '@testing-library/react';
import { useContactForm } from './use-contact-form';
import { type ChangeEvent, type FormEvent } from 'react';
import { expect, vi, describe, test, beforeEach, afterEach } from 'vitest';

// 1. Mock the Next.js Server Action cleanly before execution
vi.mock('@/actions/send-contact-email', () => ({
    sendContactEmail: vi.fn(),
}));

// Import the mocked function reference to change resolution payloads inside specific tests
import { sendContactEmail } from '@/actions/send-contact-email';

type HookFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
};

// Reusable ChangeEvent factory builder removing strict type linting warnings
function createContactChangeEvent(
    name: keyof HookFormValues,
    value: string
): ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {
    return {
        target: { name, value },
    } as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
}

// Mock FormEvent builder for clean submissions
const mockFormEvent = {
    preventDefault: vi.fn(),
} as unknown as FormEvent;

describe('useContactForm Custom Hook Suite', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('should initialize contact fields with clean string states and idle status', () => {
        const { result } = renderHook(() => useContactForm());

        // Matches the updated Zod and hook architecture exactly
        expect(result.current.values).toEqual({
            firstName: '',
            lastName: '',
            email: '',
            subject: '',
            message: '',
        });
        expect(result.current.errors).toEqual({});
        expect(result.current.touched).toEqual({});
        expect(result.current.status).toBe('idle');
    });

    test('should update state value on field change actions', () => {
        const { result } = renderHook(() => useContactForm());

        act(() => {
            result.current.handleChange(createContactChangeEvent('firstName', 'Eco-Builder'));
            result.current.handleChange(createContactChangeEvent('subject', 'Partnerships'));
        });

        expect(result.current.values.firstName).toBe('Eco-Builder');
        expect(result.current.values.subject).toBe('Partnerships');
    });

    test('should flag specific target fields as touched on blur events', () => {
        const { result } = renderHook(() => useContactForm());

        act(() => {
            result.current.handleBlur('email');
        });

        expect(result.current.touched.email).toBe(true);
        expect(result.current.touched.firstName).toBeUndefined();
    });

    describe('Submit Submission Layer & Asynchronous Status Lifecycle', () => {
        test('should map Zod errors back to state fields and set status to error on server validation failure', async () => {
            const { result } = renderHook(() => useContactForm());

            // Configure mock server failure response payload matching Zod's flattened output
            vi.mocked(sendContactEmail).mockResolvedValueOnce({
                success: false,
                message: 'Validation failed. Please verify your entries.',
                fieldErrors: {
                    email: ['Please enter a valid email address.'],
                    subject: ['Subject must be at least 4 characters.'],
                },
            });

            // Wrap async execution within an awaited act() boundary
            await act(async () => {
                result.current.executeSubmit(mockFormEvent);
            });

            expect(sendContactEmail).toHaveBeenCalledWith(result.current.values);
            expect(result.current.status).toBe('error');

            // Verified that first-element array indexing strings map accurately
            expect(result.current.errors.email).toBe('Please enter a valid email address.');
            expect(result.current.errors.subject).toBe('Subject must be at least 4 characters.');

            // Validation failure marks fields as touched automatically to reveal highlights
            expect(result.current.touched.email).toBe(true);
            expect(result.current.touched.subject).toBe(true);
        });

        test('should clear values, touch states, and invoke callbacks upon successful server transmission pipelines', async () => {
            const { result } = renderHook(() => useContactForm());
            const mockCallback = vi.fn();

            // Populate input data fields
            act(() => {
                result.current.handleChange(createContactChangeEvent('firstName', 'Jane'));
                result.current.handleChange(createContactChangeEvent('lastName', 'Doe'));
                result.current.handleChange(createContactChangeEvent('email', 'jane@example.com'));
                result.current.handleChange(createContactChangeEvent('subject', 'Green Order Status'));
                result.current.handleChange(createContactChangeEvent('message', 'This message exceeds ten characters.'));
            });

            // Mock successful server execution response
            vi.mocked(sendContactEmail).mockResolvedValueOnce({
                success: true,
                message: 'Message delivered! Check your Google mailbox shortly.',
            });

            await act(async () => {
                result.current.executeSubmit(mockFormEvent, mockCallback);
            });

            expect(sendContactEmail).toHaveBeenCalled();
            expect(result.current.status).toBe('success');
            expect(mockCallback).toHaveBeenCalled();

            // Form values must reset to absolute empty string defaults upon server success
            expect(result.current.values).toEqual({
                firstName: '',
                lastName: '',
                email: '',
                subject: '',
                message: '',
            });
            expect(result.current.touched).toEqual({});
            expect(result.current.errors).toEqual({});
        });
    });
});
