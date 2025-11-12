// src/app/layout.tsx
import type { Metadata } from "next";
import ThemeProvider from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "BonMart - Bonzer Shopping Experiences",
  description: "BonMart online store: under construction. Coming soon.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          {/* Main container where the theme transition will be applied universally */}
          <div className="min-h-screen bg-surface-light text-text-light dark:bg-surface-dark dark:text-text-dark transition-colors duration-[var(--duration-long)] ease-[var(--transition-ease-in-out)] font-sans">
            {/* Inner container for the grid layout */}
            <div className="grid grid-rows-[auto_1fr_auto] min-h-screen items-center justify-items-center p-4 sm:p-8">
              <Header />
              <main className="row-start-2 w-full flex items-center justify-center">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
