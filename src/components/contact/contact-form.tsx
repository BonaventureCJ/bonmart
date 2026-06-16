// src/components/contact/contact-form.tsx

'use client';

import { useContactForm } from '@/hooks/use-contact-form';
import { Button } from '@/components/ui/button/button';
import { Heading } from '@/components/ui/heading/heading';

export function ContactForm() {
    const {
        values,
        errors,
        touched,
        status,
        handleChange,
        handleBlur,
        executeSubmit,
    } = useContactForm();

    const handleSubmit = async (e: React.FormEvent) => {
        await executeSubmit(e);
    };

    return (
        <section className="rounded-3xl border border-(--toggle-bg) bg-(--surface-raised) p-8 shadow-sm">
            <header className="mb-8 text-left">
                <Heading level={3} weight="bold">
                    Send a Message
                </Heading>
                <p className="mt-2 text-sm text-(--neutral-color)">
                    Fill out the form below and we will get back to you shortly.
                </p>
            </header>

            {status === 'success' && (
                <div role="alert" className="mb-6 rounded-xl bg-(--brand-color)/10 p-4 text-sm font-semibold text-(--brand-color) animate-zoom-in">
                    Message received! Our green team will respond within 24 business hours.
                </div>
            )}

            {status === 'error' && (
                <div role="alert" className="mb-6 rounded-xl bg-(--error-muted) p-4 text-sm font-semibold text-(--error) animate-zoom-in">
                    Failed to send. Please check your data connections and try again.
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Names Row Container */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="flex flex-col gap-2 text-left">
                        <label htmlFor="firstName" className="text-xs font-bold uppercase tracking-wider text-(--neutral-color)">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="Jane"
                            disabled={status === 'submitting'}
                            className="checkout-input focus-ring disabled:opacity-50"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={() => handleBlur('firstName')}
                            aria-invalid={touched.firstName && !!errors.firstName}
                            aria-describedby={touched.firstName && errors.firstName ? 'firstName-error' : undefined}
                        />
                        {touched.firstName && errors.firstName && (
                            <p id="firstName-error" className="text-xs font-semibold text-(--error)" role="status">
                                {errors.firstName}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 text-left">
                        <label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wider text-(--neutral-color)">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Doe"
                            disabled={status === 'submitting'}
                            className="checkout-input focus-ring disabled:opacity-50"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={() => handleBlur('lastName')}
                            aria-invalid={touched.lastName && !!errors.lastName}
                            aria-describedby={touched.lastName && errors.lastName ? 'lastName-error' : undefined}
                        />
                        {touched.lastName && errors.lastName && (
                            <p id="lastName-error" className="text-xs font-semibold text-(--error)" role="status">
                                {errors.lastName}
                            </p>
                        )}
                    </div>
                </div>

                {/* Email Address Field Block */}
                <div className="flex flex-col gap-2 text-left">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-(--neutral-color)">
                        Email Address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="jane@example.com"
                        disabled={status === 'submitting'}
                        className="checkout-input focus-ring disabled:opacity-50"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur('email')}
                        aria-invalid={touched.email && !!errors.email}
                        aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                    />
                    {touched.email && errors.email && (
                        <p id="email-error" className="text-xs font-semibold text-(--error)" role="status">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* SUBJECT FIELD (NEW IMPLEMENTATION) */}
                <div className="flex flex-col gap-2 text-left">
                    <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-(--neutral-color)">
                        Inquiry Subject
                    </label>
                    <input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="Order status, sustainability standards..."
                        disabled={status === 'submitting'}
                        className="checkout-input focus-ring disabled:opacity-50"
                        value={values.subject}
                        onChange={handleChange}
                        onBlur={() => handleBlur('subject')}
                        aria-invalid={touched.subject && !!errors.subject}
                        aria-describedby={touched.subject && errors.subject ? 'subject-error' : undefined}
                    />
                    {touched.subject && errors.subject && (
                        <p id="subject-error" className="text-xs font-semibold text-(--error)" role="status">
                            {errors.subject}
                        </p>
                    )}
                </div>

                {/* Your Message Box Field Block */}
                <div className="flex flex-col gap-2 text-left">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-(--neutral-color)">
                        Your Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="How can we help you?"
                        disabled={status === 'submitting'}
                        className="checkout-input resize-none focus-ring disabled:opacity-50"
                        value={values.message}
                        onChange={handleChange}
                        onBlur={() => handleBlur('message')}
                        aria-invalid={touched.message && !!errors.message}
                        aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
                    />
                    {touched.message && errors.message && (
                        <p id="message-error" className="text-xs font-semibold text-(--error)" role="status">
                            {errors.message}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    icon="arrowRight"
                    iconPlacement="right"
                    disabled={status === 'submitting'}
                >
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </Button>
            </form>
        </section>
    );
}