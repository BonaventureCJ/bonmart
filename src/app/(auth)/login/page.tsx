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
 * Standardized using enterprise spacing tokens and semantic layout principles.
 */
export default function LoginPage() {
    return (
        <PageContainer>
            {/* 
                Spacing Strategy:
                - min-h: Account for header height and the double page-padding applied by LayoutWrapper.
                - justify-between: Pins the dev note to the bottom while centering the login card.
            */}
            <div className="flex min-h-[calc(100vh-var(--header-height)-var(--page-padding-y)*2)] flex-col items-center justify-between">

                {/* Login Card Section */}
                <div className="mx-auto flex w-full flex-1 flex-col justify-center space-y-6 sm:w-[350px]">
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

                {/* Development Placeholder Note: Semantic change to div to avoid global footer conflict */}
                <div className="mt-12 w-full max-w-md border-t border-(--toggle-bg) pt-8 text-center">
                    <p className="text-xs font-medium text-(--neutral-color) italic opacity-60">
                        Note: Authentication logic is currently a placeholder for the BonMart development phase.
                    </p>
                </div>
            </div>
        </PageContainer>
    );
}
