// src/app/(auth)/login/page.tsx

import { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";
import LoginForm from "@/components/auth/login-form";
import Link from "next/link";
import { Heading } from "@/components/ui/heading/heading";

export const metadata: Metadata = {
    title: "Login | BonMart",
    description: "Sign in to your BonMart account and continue your eco-friendly journey.",
};

/**
 * LoginPage Component
 * Provides a secure entry point for users with theme-aware styling.
 */
export default function LoginPage() {
    return (
        <PageContainer>
            <div className="flex min-h-[calc(100vh-var(--header-height))] flex-col items-center justify-between py-12 md:py-20">

                {/* Login Card Section */}
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <header className="flex flex-col space-y-2 text-center">
                        <Heading level={1} weight="semibold" className="text-2xl">
                            Welcome back
                        </Heading>
                        <p className="text-sm text-(--neutral-color)">
                            Enter your credentials to access your account
                        </p>
                    </header>

                    <LoginForm />

                    <p className="px-8 text-center text-sm text-(--neutral-color)">
                        <span className="opacity-70">Don&apos;t have an account?</span>{" "}
                        <Link
                            href="/register"
                            className="font-medium underline underline-offset-4 transition-colors hover:text-(--brand-color) focus-ring rounded-sm"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>

                {/* Development Placeholder Note */}
                <footer className="w-full max-w-md border-t border-(--toggle-bg) pt-8 text-center">
                    <p className="text-xs font-medium text-(--neutral-color) italic opacity-60">
                        Note: Authentication logic is currently a placeholder for the BonMart development phase.
                    </p>
                </footer>
            </div>
        </PageContainer>
    );
}
