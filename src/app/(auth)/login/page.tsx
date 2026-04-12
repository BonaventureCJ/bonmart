//src/app/(auth)/login/page.tsx

import { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";
import LoginForm from "@/components/auth/login-form";

export const metadata: Metadata = {
    title: "Login | BonMart",
    description: "Sign in to your BonMart account.",
};

export default function LoginPage() {
    return (
        <PageContainer>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <header className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
                    <p className="text-sm text-neutral-color">
                        Enter your credentials to access your account
                    </p>
                </header>

                <LoginForm />

                <p className="px-8 text-center text-sm text-neutral-color">
                    <span className="opacity-70">Don&apos;t have an account?</span>{" "}
                    <a href="/register" className="underline underline-offset-4 hover:text-[var(--brand-color)]">
                        Sign Up
                    </a>
                </p>
            </div>
        </PageContainer>
    );
}
