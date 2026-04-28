// src/components/auth/login-form.tsx

"use client";

import { useId, type FormEvent } from "react";
import { Button } from "@/components/ui/button/button";

/**
 * LoginForm Component
 * Handles the client-side authentication interaction.
 * Adheres to enterprise accessibility standards and semantic HTML.
 */
export default function LoginForm() {
    const emailId = useId();
    const passwordId = useId();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Integration with Redux/NextAuth logic to follow
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-2 text-left">
                <label
                    htmlFor={emailId}
                    className="text-sm font-medium text-(--foreground)"
                >
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
                <label
                    htmlFor={passwordId}
                    className="text-sm font-medium text-(--foreground)"
                >
                    Password
                </label>
                <input
                    id={passwordId}
                    type="password"
                    required
                    autoComplete="current-password"
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
                Sign In
            </Button>

            {/* Contextual Dev Note */}
            <p className="mt-2 text-center text-[10px] tracking-wide text-(--neutral-color) uppercase opacity-60">
                Authentication state managed via Redux Toolkit
            </p>
        </form>
    );
}
