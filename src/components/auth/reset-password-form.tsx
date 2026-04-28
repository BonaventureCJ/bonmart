// src/components/auth/reset-password-form.tsx

"use client";

import { useId, type FormEvent } from "react";
import { Button } from "@/components/ui/button/button";

/**
 * ResetPasswordForm Component
 * Handles the client-side interaction for account recovery.
 * Adheres to enterprise accessibility standards and mobile-first design.
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
                <label
                    htmlFor={emailId}
                    className="text-sm font-medium text-(--foreground)"
                >
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

            <Button
                type="submit"
                variant="primary"
                fullWidth
                size="md"
                className="mt-2"
            >
                Send Reset Link
            </Button>

            {/* Development-specific note within the form context */}
            <p className="mt-2 text-center text-[10px] text-(--neutral-color) italic opacity-50">
                Dev Note: Email integration and rate-limiting pending.
            </p>
        </form>
    );
}
