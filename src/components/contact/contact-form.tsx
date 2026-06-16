// src/components/contact/contact-form.tsx

'use client';

import { useContactForm } from '@/hooks/use-contact-form';
import { Button } from '@/components/ui/button/button';
import { Heading } from '@/components/ui/heading/heading';

/**
 * Theme-aware contact form.
 * Optimized for rapid scanning and accessibility.
 */
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
        await executeSubmit(e, () => {
            // Placeholder callback hook for future RTK Query sync mutations
        });
    };

    return (
        <section className="rounded-3xl border border-(--toggle-bg) bg-(--surface-raised) p-8 shadow-sm">
            {/* Form Header */}
            <header className="mb-8 text-left">
                <Heading level={3} weight="bold">
                    Send a Message
                </Heading>
                <p className="mt-2 text-sm text-(--neutral-color)">
                    Fill out the form below and we will get back to you shortly.
                </p>
            </header>

            {status === 'success' && (
                <div className="mb-6 rounded-xl bg-(--brand-color)/10 p-4 text-sm font-semibold text-(--brand-color) animate-zoom-in">
                    Message received! Our green team will respond within 24 business hours.
                </div>
            )}

            {status === 'error' && (
                <div className="mb-6 rounded-xl bg-(--error-muted) p-4 text-sm font-semibold text-(--error) animate-zoom-in">
                    Failed to send. Please check your data connections and try again.
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* First Name Field */}
                    <div className="flex flex-col gap-2 text-left">
                        <label
                            htmlFor="firstName"
                            className="text-xs font-bold uppercase tracking-wider text-(--neutral-color)"
                        >
                            First Name
                        </label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="Jane"
                            className="checkout-input focus-ring"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={() => handleBlur('firstName')}
                            aria-invalid={touched.firstName && !!errors.firstName ? 'true' : 'false'}
                            aria-describedby={touched.firstName && errors.firstName ? 'firstName-error' : undefined}
                        />
                        {touched.firstName && errors.firstName && (
                            <p id="firstName-error" className="text-xs font-semibold text-(--error)">
                                {errors.firstName}
                            </p>
                        )}
                    </div>

                    {/* Last Name Field */}
                    <div className="flex flex-col gap-2 text-left">
                        <label
                            htmlFor="lastName"
                            className="text-xs font-bold uppercase tracking-wider text-(--neutral-color)"
                        >
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Doe"
                            className="checkout-input focus-ring"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={() => handleBlur('lastName')}
                            aria-invalid={touched.lastName && !!errors.lastName ? 'true' : 'false'}
                            aria-describedby={touched.lastName && errors.lastName ? 'lastName-error' : undefined}
                        />
                        {touched.lastName && errors.lastName && (
                            <p id="lastName-error" className="text-xs font-semibold text-(--error)">
                                {errors.lastName}
                            </p>
                        )}
                    </div>
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-2 text-left">
                    <label
                        htmlFor="email"
                        className="text-xs font-bold uppercase tracking-wider text-(--neutral-color)"
                    >
                        Email Address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="jane@example.com"
                        className="checkout-input focus-ring"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur('email')}
                        aria-invalid={touched.email && !!errors.email ? 'true' : 'false'}
                        aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                    />
                    {touched.email && errors.email && (
                        <p id="email-error" className="text-xs font-semibold text-(--error)">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-2 text-left">
                    <label
                        htmlFor="message"
                        className="text-xs font-bold uppercase tracking-wider text-(--neutral-color)"
                    >
                        Your Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="How can we help you?"
                        className="checkout-input resize-none focus-ring"
                        value={values.message}
                        onChange={handleChange}
                        onBlur={() => handleBlur('message')}
                        aria-invalid={touched.message && !!errors.message ? 'true' : 'false'}
                        aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
                    />
                    {touched.message && errors.message && (
                        <p id="message-error" className="text-xs font-semibold text-(--error)">
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