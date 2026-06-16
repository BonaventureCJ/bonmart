// src/components/checkout/checkout-form.tsx

'use client';

import { ChangeEvent } from 'react';
import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';
import type { CheckoutFormData, CheckoutFormErrors } from '@/types/form';

interface CheckoutFormProps {
    values: CheckoutFormData;
    errors: CheckoutFormErrors;
    touched: Partial<Record<keyof CheckoutFormData, boolean>>;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (name: keyof CheckoutFormData) => void;
}

export function CheckoutForm({ values, errors, touched, onChange, onBlur }: CheckoutFormProps) {
    return (
        <section className="rounded-3xl border border-(--toggle-bg) bg-(--surface-raised) p-6 sm:p-8">
            <header className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--brand-color)/10 text-(--brand-color)">
                    <Icon name="user" size={20} />
                </div>
                <Heading level={3} weight="bold" className="text-xl">
                    Shipping Details
                </Heading>
            </header>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Full Name */}
                <div className="sm:col-span-2">
                    <label htmlFor="fullName" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-(--neutral-color)">
                        Full Name
                    </label>
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="e.g. John Doe"
                        className="checkout-input focus-ring"
                        value={values.fullName}
                        onChange={onChange}
                        onBlur={() => onBlur('fullName')}
                        aria-invalid={touched.fullName && !!errors.fullName ? 'true' : 'false'}
                        aria-describedby={touched.fullName && errors.fullName ? 'fullName-error' : undefined}
                    />
                    {touched.fullName && errors.fullName && (
                        <p id="fullName-error" className="mt-1.5 text-xs font-semibold text-(--error)">
                            {errors.fullName}
                        </p>
                    )}
                </div>

                {/* Street Address */}
                <div className="sm:col-span-2">
                    <label htmlFor="streetAddress" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-(--neutral-color)">
                        Street Address
                    </label>
                    <input
                        id="streetAddress"
                        name="streetAddress"
                        type="text"
                        placeholder="123 Eco Street"
                        className="checkout-input focus-ring"
                        value={values.streetAddress}
                        onChange={onChange}
                        onBlur={() => onBlur('streetAddress')}
                        aria-invalid={touched.streetAddress && !!errors.streetAddress ? 'true' : 'false'}
                        aria-describedby={touched.streetAddress && errors.streetAddress ? 'streetAddress-error' : undefined}
                    />
                    {touched.streetAddress && errors.streetAddress && (
                        <p id="streetAddress-error" className="mt-1.5 text-xs font-semibold text-(--error)">
                            {errors.streetAddress}
                        </p>
                    )}
                </div>

                {/* City */}
                <div>
                    <label htmlFor="city" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-(--neutral-color)">
                        City
                    </label>
                    <input
                        id="city"
                        name="city"
                        type="text"
                        placeholder="Lagos"
                        className="checkout-input focus-ring"
                        value={values.city}
                        onChange={onChange}
                        onBlur={() => onBlur('city')}
                        aria-invalid={touched.city && !!errors.city ? 'true' : 'false'}
                        aria-describedby={touched.city && errors.city ? 'city-error' : undefined}
                    />
                    {touched.city && errors.city && (
                        <p id="city-error" className="mt-1.5 text-xs font-semibold text-(--error)">
                            {errors.city}
                        </p>
                    )}
                </div>

                {/* Postcode */}
                <div>
                    <label htmlFor="postcode" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-(--neutral-color)">
                        Postcode
                    </label>
                    <input
                        id="postcode"
                        name="postcode"
                        type="text"
                        maxLength={6}
                        placeholder="100001"
                        className="checkout-input focus-ring"
                        value={values.postcode}
                        onChange={onChange}
                        onBlur={() => onBlur('postcode')}
                        aria-invalid={touched.postcode && !!errors.postcode ? 'true' : 'false'}
                        aria-describedby={touched.postcode && errors.postcode ? 'postcode-error' : undefined}
                    />
                    {touched.postcode && errors.postcode && (
                        <p id="postcode-error" className="mt-1.5 text-xs font-semibold text-(--error)">
                            {errors.postcode}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
