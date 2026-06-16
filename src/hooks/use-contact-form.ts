// src/hooks/use-contact-form.ts

'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import type { ContactFormData, ContactFormErrors } from '@/types/form';

const INITIAL_STATE: ContactFormData = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
};

export function useContactForm() {
    const [values, setValues] = useState<ContactFormData>(INITIAL_STATE);
    const [errors, setErrors] = useState<ContactFormErrors>({});
    const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({});
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const validateField = (name: keyof ContactFormData, value: string): string => {
        const trimmed = value.trim();
        switch (name) {
            case 'firstName':
                if (!trimmed) return 'First name is required.';
                if (trimmed.length < 2) return 'First name must be at least 2 characters.';
                return '';
            case 'lastName':
                if (!trimmed) return 'Last name is required.';
                if (trimmed.length < 2) return 'Last name must be at least 2 characters.';
                return '';
            case 'email':
                if (!trimmed) return 'Email address is required.';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
                    return 'Please enter a valid email address.';
                }
                return '';
            case 'message':
                if (!trimmed) return 'Message field cannot be left blank.';
                if (trimmed.length < 10) return 'Your message must be at least 10 characters long.';
                return '';
            default:
                return '';
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));

        if (touched[name as keyof ContactFormData]) {
            const error = validateField(name as keyof ContactFormData, value);
            setErrors((prev) => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (name: keyof ContactFormData) => {
        setTouched((prev) => ({ ...prev, [name]: true }));
        const error = validateField(name, values[name]);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const executeSubmit = async (e: FormEvent, onSuccessCallback?: () => void): Promise<boolean> => {
        e.preventDefault();

        const freshErrors: ContactFormErrors = {};
        let isValid = true;

        (Object.keys(values) as Array<keyof ContactFormData>).forEach((key) => {
            const error = validateField(key, values[key]);
            if (error) {
                freshErrors[key] = error;
                isValid = false;
            }
        });

        setErrors(freshErrors);
        setTouched({
            firstName: true,
            lastName: true,
            email: true,
            message: true,
        });

        if (!isValid) {
            const firstError = document.querySelector('[aria-invalid="true"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                (firstError as HTMLElement).focus();
            }
            return false;
        }

        setStatus('submitting');
        try {
            // Latency simulation mirroring real-world enterprise pipeline actions
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setStatus('success');
            setValues(INITIAL_STATE);
            setTouched({});
            if (onSuccessCallback) onSuccessCallback();
            return true;
        } catch {
            setStatus('error');
            return false;
        }
    };

    return {
        values,
        errors,
        touched,
        status,
        handleChange,
        handleBlur,
        executeSubmit,
    };
}
