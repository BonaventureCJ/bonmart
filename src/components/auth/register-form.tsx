// src/components/auth/register-form.tsx

"use client";

import { useId, type FormEvent } from "react";
import { Button } from "@/components/ui/button/button";

/**
 * RegisterForm Component
 * Handles client-side registration interactivity.
 * Adheres to enterprise DRY principles.
 */
export default function RegisterForm() {
    const nameId = useId();
    const emailId = useId();
    const passwordId = useId();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Registration logic will be integrated with Redux here
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2 text-left">
                <label htmlFor={nameId} className="text-sm font-medium text-(--foreground)">
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
                <label htmlFor={emailId} className="text-sm font-medium text-(--foreground)">
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
                <label htmlFor={passwordId} className="text-sm font-medium text-(--foreground)">
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

            <Button
                type="submit"
                variant="primary"
                fullWidth
                size="md"
                className="mt-2"
            >
                Create Account
            </Button>

            <p className="mt-2 text-center text-[10px] tracking-wide text-(--neutral-color) uppercase opacity-60">
                Secure enterprise account registration
            </p>
        </form>
    );
}
