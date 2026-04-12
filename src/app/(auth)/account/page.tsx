//src/app/(auth)/account/page.tsx

import { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "My Account | BonMart",
  description: "Manage your profile, security settings, and sustainable shopping preferences.",
};

/**
 * AccountPage Component
 * The central hub for user profile management.
 */
export default function AccountPage() {
  return (
    <PageContainer>
      <div className="flex flex-col items-center gap-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Account Dashboard</h1>
          <p className="mt-2 text-neutral-color">
            Welcome back! Manage your eco-friendly shopping experience here.
          </p>
        </header>

        <div className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Profile Overview Placeholder */}
          <section className="rounded-xl border border-[var(--footer-border)] p-6 text-left">
            <h2 className="text-lg font-semibold">Profile Information</h2>
            <p className="mt-1 text-sm text-neutral-color">
              Update your name, email, and personal details.
            </p>
          </section>

          {/* Security Placeholder */}
          <section className="rounded-xl border border-[var(--footer-border)] p-6 text-left">
            <h2 className="text-lg font-semibold">Security & Privacy</h2>
            <p className="mt-1 text-sm text-neutral-color">
              Change your password and manage two-factor authentication.
            </p>
          </section>
        </div>
      </div>
    </PageContainer>
  );
}

