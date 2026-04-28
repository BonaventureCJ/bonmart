// src/components/auth/reset-password-form.tsx

"use client";

import { useId, type FormEvent } from "react";

/**
 * ResetPasswordForm Component
 * Handles the client-side interaction for account recovery.
 * Utilizes enterprise-standard utilities
 */
export default function ResetPasswordForm() {
    const emailId = useId();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Reset logic (e.g., sending recovery email) goes here
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2 text-left">
                <label htmlFor={emailId} className="text-sm font-medium">
                    Email Address
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

            <button
                type="submit"
                className="focus-ring mt-2 h-10 w-full cursor-pointer rounded-md bg-(--brand-color) font-medium text-(--text-on-brand) transition-opacity hover:opacity-90"
            >
                Send Reset Link
            </button>

            {/* Development-specific note within the form context */}
            <p className="mt-2 text-center text-[10px] text-(--neutral-color) italic opacity-50">
                Dev Note: Email integration and rate-limiting pending.
            </p>
        </form>
    );
}
