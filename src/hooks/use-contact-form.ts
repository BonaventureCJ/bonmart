// src/hooks/use-contact-form.ts

'use client';

import { useState, useTransition, ChangeEvent } from 'react';
import { sendContactEmail } from '@/actions/send-contact-email';
import { contactFormSchema, type ContactFormData, type ContactFormErrors } from '@/types/form';

const INITIAL_STATE: ContactFormData = {
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
};

export function useContactForm() {
    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [values, setValues] = useState<ContactFormData>(INITIAL_STATE);
    const [errors, setErrors] = useState<ContactFormErrors>({});
    const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({});

    const validateField = (name: keyof ContactFormData, value: string): string => {
        const result = contactFormSchema.safeParse({
            ...values,
            [name]: value,
        });

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            return fieldErrors[name]?.[0] || '';
        }
        return '';
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target as { name: keyof ContactFormData; value: string };

        setValues((prev) => ({ ...prev, [name]: value }));

        if (status === 'success' || status === 'error') {
            setStatus('idle');
        }

        // Interactive immediate validation feedback as the user types (if field was already interacted with)
        if (touched[name]) {
            const fieldError = validateField(name, value);
            setErrors((prev) => ({ ...prev, [name]: fieldError || undefined }));
        }
    };

    const handleBlur = (name: keyof ContactFormData) => {
        setTouched((prev) => ({ ...prev, [name]: true }));
        const fieldError = validateField(name, values[name]);
        setErrors((prev) => ({ ...prev, [name]: fieldError || undefined }));
    };

    const executeSubmit = async (e: React.FormEvent, callback?: () => void) => {
        e.preventDefault();
        setStatus('submitting');
        setErrors({});

        // Bulk validate everything prior to processing server submission
        const result = contactFormSchema.safeParse(values);

        if (!result.success) {
            setStatus('error');
            const flattened = result.error.flatten();
            const freshErrors: ContactFormErrors = {};

            Object.entries(flattened.fieldErrors).forEach(([key, val]) => {
                if (val && val.length > 0) {
                    freshErrors[key as keyof ContactFormData] = val[0];
                }
            });

            setErrors(freshErrors);

            // Type-safe approach to dynamically flag all fields as touched
            const allTouched = Object.fromEntries(
                Object.keys(values).map((key) => [key, true])
            ) as Record<keyof ContactFormData, boolean>;

            setTouched(allTouched);
            return;
        }

        startTransition(async () => {
            const response = await sendContactEmail(values);

            if (!response.success) {
                setStatus('error');
                if (response.fieldErrors) {
                    setErrors(response.fieldErrors);

                    const allErrorsTouched = Object.fromEntries(
                        Object.keys(response.fieldErrors).map((key) => [key, true])
                    ) as Record<keyof ContactFormData, boolean>;

                    setTouched(allErrorsTouched);
                }
                return;
            }

            setStatus('success');
            setValues(INITIAL_STATE);
            setTouched({});
            if (callback) callback();
        });
    };

    return {
        values,
        errors,
        touched,
        status: isPending ? 'submitting' : status,
        handleChange,
        handleBlur,
        executeSubmit,
    };
}
