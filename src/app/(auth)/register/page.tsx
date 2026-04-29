// src/app/(auth)/register/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import PageContainer from "@/components/layout/page-container";
import RegisterForm from "@/components/auth/register-form";
import { Heading } from "@/components/ui/heading/heading";

export const metadata: Metadata = {
  title: "Create an Account | BonMart",
  description: "Join BonMart today for a more sustainable shopping experience.",
};

/**
 * RegisterPage Component
 * Adheres to enterprise standards for accessibility and theme consistency.
 */
export default function RegisterPage() {
  return (
    <PageContainer>
      <div className="flex min-h-[calc(100vh-var(--header-height))] flex-col items-center justify-between py-12 md:py-20">

        {/* Registration Card */}
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <header className="flex flex-col space-y-2 text-center">
            <Heading level={1} weight="semibold" className="text-2xl">
              Create an account
            </Heading>
            <p className="text-sm text-(--neutral-color)">
              Enter your details below to get started
            </p>
          </header>

          <RegisterForm />

          <p className="px-8 text-center text-sm text-(--neutral-color)">
            <span className="opacity-70">Already have an account?</span>{" "}
            <Link
              href="/login"
              className="font-medium underline underline-offset-4 transition-colors hover:text-(--brand-color) focus-ring rounded-sm"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Development Placeholder Note */}
        <footer className="w-full max-w-md border-t border-(--toggle-bg) pt-8 text-center">
          <p className="text-xs font-medium text-(--neutral-color) italic opacity-60">
            Note: Registration and validation logic are placeholders for the BonMart development phase.
          </p>
        </footer>
      </div>
    </PageContainer>
  );
}
