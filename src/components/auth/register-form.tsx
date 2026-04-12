//src/components/auth/register-form.tsx

"use client";

import { useId, type FormEvent } from "react";

/**
 * RegisterForm Component
 * Handles client-side registration interactivity.
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
                <label htmlFor={nameId} className="text-sm font-medium">Full Name</label>
                <input
                    id={nameId}
                    type="text"
                    placeholder="John Doe"
                    required
                    className="focus-ring h-10 w-full rounded-md border border-[var(--footer-border)] bg-[var(--toggle-container-bg)] px-3 py-2 text-sm outline-none"
                />
            </div>
            <div className="grid gap-2 text-left">
                <label htmlFor={emailId} className="text-sm font-medium">Email</label>
                <input
                    id={emailId}
                    type="email"
                    placeholder="name@example.com"
                    required
                    className="focus-ring h-10 w-full rounded-md border border-[var(--footer-border)] bg-[var(--toggle-container-bg)] px-3 py-2 text-sm outline-none"
                />
            </div>
            <div className="grid gap-2 text-left">
                <label htmlFor={passwordId} className="text-sm font-medium">Password</label>
                <input
                    id={passwordId}
                    type="password"
                    required
                    className="focus-ring h-10 w-full rounded-md border border-[var(--footer-border)] bg-[var(--toggle-container-bg)] px-3 py-2 text-sm outline-none"
                />
            </div>
            <button
                type="submit"
                className="mt-2 h-10 w-full rounded-md bg-[var(--brand-color)] font-medium text-white transition-opacity hover:opacity-90"
            >
                Create Account
            </button>
        </form>
    );
}
