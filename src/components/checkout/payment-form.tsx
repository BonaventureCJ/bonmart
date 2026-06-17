// src/components/checkout/payment-form.tsx

'use client';

import { ChangeEvent } from 'react';
import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';
import type { CheckoutFormData, CheckoutFormErrors } from '@/types/form';

interface PaymentFormProps {
    values: CheckoutFormData;
    errors: CheckoutFormErrors;
    touched: Partial<Record<keyof CheckoutFormData, boolean>>;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (name: keyof CheckoutFormData) => void;
}

export function PaymentForm({ values, errors, touched, onChange, onBlur }: PaymentFormProps) {
    return (
        <section className="rounded-3xl border border-(--toggle-bg) bg-(--surface-raised) p-6 sm:p-8">
            <header className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--brand-color)/10 text-(--brand-color)">
                    <Icon name="check" size={20} />
                </div>
                <Heading level={3} weight="bold" className="text-xl">
                    Payment Method
                </Heading>
            </header>

            <div className="space-y-4">
                <div className="flex items-center gap-2 rounded-xl bg-(--brand-color)/5 px-4 py-3 text-(--brand-color)">
                    <Icon name="lock" size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">
                        Secure SSL Encrypted Payment
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Card Number Field Block */}
                    <div className="sm:col-span-2">
                        <label htmlFor="cardNumber" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-(--neutral-color)">
                            Card Number
                        </label>
                        <div className="relative">
                            <input
                                id="cardNumber"
                                name="cardNumber"
                                type="text"
                                maxLength={19}
                                placeholder="0000 0000 0000 0000"
                                className="checkout-input pr-12 focus-ring"
                                value={values.cardNumber}
                                onChange={onChange}
                                onBlur={() => onBlur('cardNumber')}
                                aria-invalid={touched.cardNumber && !!errors.cardNumber}
                                aria-describedby={touched.cardNumber && errors.cardNumber ? 'cardNumber-error' : undefined}
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50">
                                <Icon name="monitor" size={20} />
                            </div>
                        </div>
                        {touched.cardNumber && errors.cardNumber && (
                            <p id="cardNumber-error" className="mt-1.5 animate-zoom-in text-xs font-semibold text-(--error)" role="status">
                                {errors.cardNumber}
                            </p>
                        )}
                    </div>

                    {/* Expiry Date Field Block */}
                    <div>
                        <label htmlFor="expiryDate" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-(--neutral-color)">
                            Expiry Date
                        </label>
                        <input
                            id="expiryDate"
                            name="expiryDate"
                            type="text"
                            maxLength={5}
                            placeholder="MM / YY"
                            className="checkout-input focus-ring"
                            value={values.expiryDate}
                            onChange={onChange}
                            onBlur={() => onBlur('expiryDate')}
                            aria-invalid={touched.expiryDate && !!errors.expiryDate}
                            aria-describedby={touched.expiryDate && errors.expiryDate ? 'expiryDate-error' : undefined}
                        />
                        {touched.expiryDate && errors.expiryDate && (
                            <p id="expiryDate-error" className="mt-1.5 animate-zoom-in text-xs font-semibold text-(--error)" role="status">
                                {errors.expiryDate}
                            </p>
                        )}
                    </div>

                    {/* CVC Field Block */}
                    <div>
                        <label htmlFor="cvc" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-(--neutral-color)">
                            CVC
                        </label>
                        <input
                            id="cvc"
                            name="cvc"
                            type="text"
                            maxLength={4}
                            placeholder="123"
                            className="checkout-input focus-ring"
                            value={values.cvc}
                            onChange={onChange}
                            onBlur={() => onBlur('cvc')}
                            aria-invalid={touched.cvc && !!errors.cvc}
                            aria-describedby={touched.cvc && errors.cvc ? 'cvc-error' : undefined}
                        />
                        {touched.cvc && errors.cvc && (
                            <p id="cvc-error" className="mt-1.5 animate-zoom-in text-xs font-semibold text-(--error)" role="status">
                                {errors.cvc}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}