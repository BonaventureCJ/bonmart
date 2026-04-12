//src/components/auth/reset-password-form.tsx

"use client";

import { useId, type FormEvent } from "react";

/**
 * ResetPasswordForm Component
 * Handles the client-side interaction for account recovery.
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
                    className="focus-ring h-10 w-full rounded-md border border-[var(--footer-border)] bg-[var(--toggle-container-bg)] px-3 py-2 text-sm outline-none"
                />
            </div>
            <button
                type="submit"
                className="mt-2 h-10 w-full rounded-md bg-[var(--brand-color)] font-medium text-white transition-opacity hover:opacity-90"
            >
                Send Reset Link
            </button>
        </form>
    );
}
