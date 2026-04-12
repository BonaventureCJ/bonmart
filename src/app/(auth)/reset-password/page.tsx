//src/app/(auth)/reset-password/page.tsx

import { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";
import ResetPasswordForm from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password | BonMart",
  description: "Recover your BonMart account access securely.",
};

/**
 * ResetPasswordPage Component
 * Entry point for the account recovery flow.
 */
export default function ResetPasswordPage() {
  return (
    <PageContainer>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <header className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Reset your password
          </h1>
          <p className="text-sm text-neutral-color">
            Enter your email and we&apos;ll send you a link to get back into your account.
          </p>
        </header>

        <ResetPasswordForm />

        <p className="px-8 text-center text-sm text-neutral-color">
          <a
            href="/login"
            className="underline underline-offset-4 hover:text-[var(--brand-color)]"
          >
            Back to Login
          </a>
        </p>
      </div>
    </PageContainer>
  );
}
