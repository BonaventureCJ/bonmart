// src/components/contact/contact-form.tsx

'use client';

import { Button } from '@/components/ui/button/button';
import { Heading } from '@/components/ui/heading/heading';

/**
 * Theme-aware contact form.
 * Optimized for rapid scanning and accessibility.
 */
export function ContactForm() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Integration with RTK Query to follow in future milestones
    };

    return (
        <section className="rounded-3xl border border-(--toggle-bg) bg-(--surface-raised) p-8 shadow-sm">
            {/* Form Header */}
            <header className="mb-8 text-left">
                <Heading level={3} weight="bold">
                    Send a Message
                </Heading>
                <p className="mt-2 text-sm text-center text-(--neutral-color)">
                    Fill out the form below and we will get back to you shortly.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* First Name Field */}
                    <div className="flex flex-col gap-2 text-left">
                        <label
                            htmlFor="first-name"
                            className="text-xs font-bold uppercase tracking-wider text-(--neutral-color)"
                        >
                            First Name
                        </label>
                        <input
                            id="first-name"
                            type="text"
                            placeholder="Jane"
                            className="checkout-input"
                            required
                        />
                    </div>

                    {/* Last Name Field */}
                    <div className="flex flex-col gap-2 text-left">
                        <label
                            htmlFor="last-name"
                            className="text-xs font-bold uppercase tracking-wider text-(--neutral-color)"
                        >
                            Last Name
                        </label>
                        <input
                            id="last-name"
                            type="text"
                            placeholder="Doe"
                            className="checkout-input"
                            required
                        />
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
                        type="email"
                        placeholder="jane@example.com"
                        className="checkout-input"
                        required
                    />
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
                        rows={5}
                        placeholder="How can we help you?"
                        className="checkout-input resize-none"
                        required
                    />
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    icon="arrowRight"
                    iconPlacement="right"
                >
                    Send Message
                </Button>
            </form>
        </section>
    );
}
