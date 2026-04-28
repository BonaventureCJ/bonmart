// src/components/auth/register-form.tsx

"use client";

import { useId, type FormEvent } from "react";

/**
 * RegisterForm Component
 * Handles client-side registration interactivity.
 * Adheres to enterprise DRY principles and v4.1 variable shorthand.
 */
export default function RegisterForm() {
    const nameId = useId();
    const emailId = useId();
    const passwordId = useId();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Registration logic will be integrated here
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2 text-left">
                <label htmlFor={nameId} className="text-sm font-medium">
                    Full Name
                </label>
                <input
                    id={nameId}
                    type="text"
                    placeholder="John Doe"
                    required
                    autoComplete="name"
                    className="checkout-input"
                />
            </div>

            <div className="grid gap-2 text-left">
                <label htmlFor={emailId} className="text-sm font-medium">
                    Email
                </label>
                <input
                    id={emailId}
                    type="email"
                    placeholder="name@example.com"
                    required
                    autoComplete="email"
                    className="checkout-input"
                />
            </div>

            <div className="grid gap-2 text-left">
                <label htmlFor={passwordId} className="text-sm font-medium">
                    Password
                </label>
                <input
                    id={passwordId}
                    type="password"
                    required
                    autoComplete="new-password"
                    className="checkout-input"
                />
            </div>

            <button
                type="submit"
                className="focus-ring mt-2 h-10 w-full cursor-pointer rounded-md bg-(--brand-color) font-medium text-(--text-on-brand) transition-opacity hover:opacity-90"
            >
                Create Account
            </button>

            {/* Development-specific note within the form context */}
            <p className="mt-2 text-center text-[10px] text-(--neutral-color) italic opacity-50">
                Dev Note: Registration logic and validation pending.
            </p>
        </form>
    );
}
