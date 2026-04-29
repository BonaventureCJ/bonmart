// src/app/(auth)/reset-password/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import PageContainer from "@/components/layout/page-container";
import ResetPasswordForm from "@/components/auth/reset-password-form";
import { Heading } from "@/components/ui/heading/heading";

export const metadata: Metadata = {
  title: "Reset Password | BonMart",
  description: "Recover your BonMart account access securely.",
};

/**
 * ResetPasswordPage Component
 * Provides a secure password recovery interface with standardized layout.
 */
export default function ResetPasswordPage() {
  return (
    <PageContainer>
      <div className="flex min-h-[calc(100vh-var(--header-height))] flex-col items-center justify-between py-12 md:py-20">

        {/* Reset Password Form Section */}
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <header className="flex flex-col space-y-2 text-center">
            <Heading level={1} weight="semibold" className="text-2xl">
              Reset your password
            </Heading>
            <p className="text-sm text-(--neutral-color)">
              Enter your email and we&apos;ll send you a link to get back into your account.
            </p>
          </header>

          <ResetPasswordForm />

          <p className="px-8 text-center text-sm text-(--neutral-color)">
            <Link
              href="/login"
              className="font-medium underline underline-offset-4 transition-colors hover:text-(--brand-color) focus-ring rounded-sm"
            >
              Back to Login
            </Link>
          </p>
        </div>

        {/* Development Placeholder Note */}
        <footer className="w-full max-w-md border-t border-(--toggle-bg) pt-8 text-center">
          <p className="text-xs font-medium text-(--neutral-color) italic opacity-60">
            Note: Password recovery and email triggers are placeholders for the BonMart development phase.
          </p>
        </footer>
      </div>
    </PageContainer>
  );
}
