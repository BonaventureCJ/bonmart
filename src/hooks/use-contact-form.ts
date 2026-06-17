// src/hooks/use-contact-form.ts

'use client';

import { useState, useTransition } from 'react';
import { sendContactEmail } from '@/actions/send-contact-email';

type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

export function useContactForm() {
    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const [values, setValues] = useState<FormValues>({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));

        // FIXED: Clear the global success/error status banner immediately when user types
        if (status === 'success' || status === 'error') {
            setStatus('idle');
        }

        if (errors[name as keyof FormValues]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleBlur = (field: keyof FormValues) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    const executeSubmit = async (e: React.FormEvent, callback?: () => void) => {
        e.preventDefault();
        setStatus('submitting');
        setErrors({});

        startTransition(async () => {
            const response = await sendContactEmail(values);

            if (!response.success) {
                setStatus('error');
                if (response.fieldErrors) {
                    const formErrorState: FormErrors = {};

                    Object.entries(response.fieldErrors).forEach(([key, val]) => {
                        if (val && val.length > 0) {
                            formErrorState[key as keyof FormValues] = val[0];
                        }
                    });

                    setErrors(formErrorState);
                    setTouched(
                        Object.keys(response.fieldErrors).reduce((acc, currentKey) => {
                            acc[currentKey as keyof FormValues] = true;
                            return acc;
                        }, {} as Record<keyof FormValues, boolean>)
                    );
                }
                return;
            }

            setStatus('success');
            setValues({ firstName: '', lastName: '', email: '', subject: '', message: '' });
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
