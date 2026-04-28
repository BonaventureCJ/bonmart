// src/app/(auth)/account/page.tsx

import { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "My Account | BonMart",
  description: "Manage your profile, security settings, and sustainable shopping preferences.",
};

export default function AccountPage() {
  return (
    <PageContainer>
      <div className="flex min-h-[calc(100vh-var(--header-height))] flex-col items-center gap-8 py-8 pb-12 md:py-12">

        {/* Main Content: flex-1 pushes the footer down */}
        <div className="flex w-full flex-1 flex-col items-center gap-8">
          <header className="text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Account Dashboard
            </h1>
            <p className="mt-2 text-(--neutral-color)">
              Welcome back! Manage your eco-friendly shopping experience here.
            </p>
          </header>

          <div className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
            <section className="rounded-xl border border-(--footer-border) bg-(--surface-raised) p-6 transition-colors">
              <h2 className="text-lg font-semibold">Profile Information</h2>
              <p className="mt-1 text-sm text-(--neutral-color)">
                Update your name, email, and personal details.
              </p>
            </section>

            <section className="rounded-xl border border-(--footer-border) bg-(--surface-raised) p-6 transition-colors">
              <h2 className="text-lg font-semibold">Security & Privacy</h2>
              <p className="mt-1 text-sm text-(--neutral-color)">
                Change your password and manage two-factor authentication.
              </p>
            </section>
          </div>
        </div>
        <footer className="w-full max-w-4xl border-t border-(--toggle-bg) pt-8 text-center">
          <p className="mx-auto max-w-md text-xs font-medium text-(--neutral-color) italic opacity-60">
            Note: This dashboard is currently a placeholder for the BonMart development phase.
            Functionality will be implemented in upcoming iterations.
          </p>
        </footer>
      </div>
    </PageContainer>
  );
}
