//src/app/(auth)/register/page.tsx

import { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";
import RegisterForm from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create an Account | BonMart",
  description: "Join BonMart today for a more sustainable shopping experience.",
};

/**
 * RegisterPage Component
 * Entry point for new user registration.
 */
export default function RegisterPage() {
  return (
    <PageContainer>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <header className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-neutral-color">
            Enter your details below to get started
          </p>
        </header>

        <RegisterForm />

        <p className="px-8 text-center text-sm text-neutral-color">
          <span className="opacity-70">Already have an account?</span>{" "}
          <a href="/login" className="underline underline-offset-4 hover:text-[var(--brand-color)]">
            Login
          </a>
        </p>
      </div>
    </PageContainer>
  );
}
