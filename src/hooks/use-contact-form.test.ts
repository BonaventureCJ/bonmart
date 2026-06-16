// src/hooks/use-contact-form.test.ts

import { renderHook, act } from '@testing-library/react';
import { useContactForm } from './use-contact-form';
import { type ChangeEvent, type FormEvent } from 'react';

// Struct type-safe representation of your contact payload contract
interface ContactValues {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

// Reusable ChangeEvent factory builder removing strict type linting warnings
function createContactChangeEvent(
    name: keyof ContactValues,
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
        vi.useFakeTimers();

        // Stub missing jsdom DOM layout methods to validate accessibility routing
        window.HTMLElement.prototype.scrollIntoView = vi.fn();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    test('should initialize contact fields with clean string states and idle status', () => {
        const { result } = renderHook(() => useContactForm());

        expect(result.current.values).toEqual({
            firstName: '',
            lastName: '',
            email: '',
            message: '',
        });
        expect(result.current.errors).toEqual({});
        expect(result.current.touched).toEqual({});
        expect(result.current.status).toBe('idle');
    });

    describe('Field-Level Blur & Change Valuations', () => {
        test('should append validation error strings on firstName inputs under 2 characters', () => {
            const { result } = renderHook(() => useContactForm());

            act(() => {
                result.current.handleChange(createContactChangeEvent('firstName', 'A'));
            });

            act(() => {
                result.current.handleBlur('firstName');
            });

            expect(result.current.errors.firstName).toBe('First name must be at least 2 characters.');
        });

        test('should catch invalid email syntax configurations and register alert text', () => {
            const { result } = renderHook(() => useContactForm());

            act(() => {
                result.current.handleChange(createContactChangeEvent('email', 'bonamart.eco@invalid'));
            });

            act(() => {
                result.current.handleBlur('email');
            });

            expect(result.current.errors.email).toBe('Please enter a valid email address.');
        });

        test('should evaluate message lengths enforcing a strict 10 character text constraint ceiling', () => {
            const { result } = renderHook(() => useContactForm());

            act(() => {
                result.current.handleChange(createContactChangeEvent('message', 'Short'));
            });

            act(() => {
                result.current.handleBlur('message');
            });

            expect(result.current.errors.message).toBe('Your message must be at least 10 characters long.');
        });
    });

    describe('Submit Submission Layer & Latency Timers', () => {
        test('should handle validation failures, touch properties, and try focusing elements', async () => {
            const { result } = renderHook(() => useContactForm());

            // Create dummy element in the DOM to mock document.querySelector logic execution paths
            const dummyInput = document.createElement('input');
            dummyInput.setAttribute('aria-invalid', 'true');
            document.body.appendChild(dummyInput);
            const focusSpy = vi.spyOn(dummyInput, 'focus');

            let submissionResult = true;
            await act(async () => {
                submissionResult = await result.current.executeSubmit(mockFormEvent);
            });

            expect(submissionResult).toBe(false);
            expect(result.current.status).toBe('idle');
            expect(result.current.touched.message).toBe(true);
            expect(focusSpy).toHaveBeenCalled();

            document.body.removeChild(dummyInput);
        });

        test('should transition status flags and reset values cleanly on successful execution pipelines', async () => {
            const { result } = renderHook(() => useContactForm());
            const mockCallback = vi.fn();

            act(() => {
                result.current.handleChange(createContactChangeEvent('firstName', 'Bonaventure'));
                result.current.handleChange(createContactChangeEvent('lastName', 'Ugwu'));
                result.current.handleChange(createContactChangeEvent('email', 'bonacjugwu@gmail.com'));
                result.current.handleChange(createContactChangeEvent('message', 'This is an enterprise green sustainability query.'));
            });

            let submitPromise: Promise<boolean>;
            act(() => {
                submitPromise = result.current.executeSubmit(mockFormEvent, mockCallback);
            });

            // Assert instant submission buffering states prior to mock timing flushing sweeps
            expect(result.current.status).toBe('submitting');

            // Leap forward over the 2-second asynchronous backend mock loop latency window
            await act(async () => {
                vi.advanceTimersByTime(2000);
            });

            const resolvedStatus = await submitPromise!;
            expect(resolvedStatus).toBe(true);
            expect(result.current.status).toBe('success');
            expect(mockCallback).toHaveBeenCalled();

            // State reset validations
            expect(result.current.values.firstName).toBe('');
            expect(result.current.touched).toEqual({});
        });
    });
});
