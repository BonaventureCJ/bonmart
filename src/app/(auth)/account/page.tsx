// src/app/(auth)/account/page.tsx

import { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading/heading";

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
            <Heading level={1} weight="bold">
              Account Dashboard
            </Heading>
            <p className="mt-2 text-(--neutral-color)">
              Welcome back! Manage your eco-friendly shopping experience here.
            </p>
          </header>

          <div className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
            <section className="rounded-xl border border-(--footer-border) bg-(--surface-raised) p-6 transition-colors">
              <Heading level={2} weight="semibold" align="left" className="text-lg">
                Profile Information
              </Heading>
              <p className="mt-1 text-sm text-(--neutral-color)">
                Update your name, email, and personal details.
              </p>
            </section>

            <section className="rounded-xl border border-(--footer-border) bg-(--surface-raised) p-6 transition-colors">
              <Heading level={2} weight="semibold" align="left" className="text-lg">
                Security & Privacy
              </Heading>
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
