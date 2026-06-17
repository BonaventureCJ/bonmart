// src/hooks/use-contact-form.test.ts

import { renderHook, act } from '@testing-library/react';
import { useContactForm } from './use-contact-form';
import { type ChangeEvent, type FormEvent } from 'react';
import { expect, vi, describe, test, beforeEach } from 'vitest';

vi.mock('@/actions/send-contact-email', () => ({
    sendContactEmail: vi.fn(),
}));

import { sendContactEmail } from '@/actions/send-contact-email';

type HookFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
};

function createContactChangeEvent(
    name: keyof HookFormValues,
    value: string
): ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {
    return {
        target: { name, value },
    } as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
}

const mockFormEvent = {
    preventDefault: vi.fn(),
} as unknown as FormEvent;

describe('useContactForm Custom Hook Suite', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('should initialize contact fields with clean string states and idle status', () => {
        const { result } = renderHook(() => useContactForm());

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

    test('should flag specific target fields as touched on blur events and trigger real-time Zod evaluation', () => {
        const { result } = renderHook(() => useContactForm());

        act(() => {
            result.current.handleBlur('email');
        });

        expect(result.current.touched.email).toBe(true);
        expect(result.current.errors.email).toBe('Please enter a valid email address.');
    });

    describe('Submit Submission Layer & Asynchronous Status Lifecycle', () => {
        test('should map Zod errors back to state fields and set status to error on server validation failure', async () => {
            const { result } = renderHook(() => useContactForm());

            // Provide valid schema states on the client first so it reaches the server block safely
            act(() => {
                result.current.handleChange(createContactChangeEvent('firstName', 'Jane'));
                result.current.handleChange(createContactChangeEvent('lastName', 'Doe'));
                result.current.handleChange(createContactChangeEvent('email', 'jane@example.com'));
                result.current.handleChange(createContactChangeEvent('subject', 'Valid Subject Line'));
                result.current.handleChange(createContactChangeEvent('message', 'This is a long message paragraph.'));
            });

            vi.mocked(sendContactEmail).mockResolvedValueOnce({
                success: false,
                message: 'Validation failed. Please verify your entries.',
                fieldErrors: {
                    email: 'Please enter a valid email address.',
                    subject: 'Subject must be at least 4 characters.',
                },
            });

            await act(async () => {
                result.current.executeSubmit(mockFormEvent);
            });

            expect(sendContactEmail).toHaveBeenCalledWith(result.current.values);
            expect(result.current.status).toBe('error');

            expect(result.current.errors.email).toBe('Please enter a valid email address.');
            expect(result.current.errors.subject).toBe('Subject must be at least 4 characters.');

            expect(result.current.touched.email).toBe(true);
            expect(result.current.touched.subject).toBe(true);
        });

        test('should clear values, touch states, and invoke callbacks upon successful server transmission pipelines', async () => {
            const { result } = renderHook(() => useContactForm());
            const mockCallback = vi.fn();

            act(() => {
                result.current.handleChange(createContactChangeEvent('firstName', 'Jane'));
                result.current.handleChange(createContactChangeEvent('lastName', 'Doe'));
                result.current.handleChange(createContactChangeEvent('email', 'jane@example.com'));
                result.current.handleChange(createContactChangeEvent('subject', 'Green Order Status'));
                result.current.handleChange(createContactChangeEvent('message', 'This message exceeds ten characters.'));
            });

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

        test('should reset status flag back to idle when user types after a submission result banner occurs', async () => {
            const { result } = renderHook(() => useContactForm());

            // Provide valid initial details to satisfy the client-side pre-flight schema pass
            act(() => {
                result.current.handleChange(createContactChangeEvent('firstName', 'Jane'));
                result.current.handleChange(createContactChangeEvent('lastName', 'Doe'));
                result.current.handleChange(createContactChangeEvent('email', 'jane@example.com'));
                result.current.handleChange(createContactChangeEvent('subject', 'Valid Subject'));
                result.current.handleChange(createContactChangeEvent('message', 'This message is long enough.'));
            });

            vi.mocked(sendContactEmail).mockResolvedValueOnce({
                success: false,
                message: 'Validation failed.',
                fieldErrors: { email: 'Invalid email' },
            });

            await act(async () => {
                result.current.executeSubmit(mockFormEvent);
            });

            expect(result.current.status).toBe('error');

            act(() => {
                result.current.handleChange(createContactChangeEvent('firstName', 'Refactored Input'));
            });

            expect(result.current.status).toBe('idle');
        });
    });
});
