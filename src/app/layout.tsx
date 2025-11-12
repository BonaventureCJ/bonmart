// src/app/layout.tsx
import type { Metadata } from "next";
import ThemeProvider from "@/components/ThemeProvider";
//import ThemeProvider from "../components/ThemeProvider";
import Footer from "@/components/Footer";
//import Footer from "../components/Footer";
import Header from "@/components/Header";
//import Header from "../components/Header";
import "@/styles/globals.css"; // ensure Tailwind is imported
//import "./styles/globals.css"; // ensure Tailwind is imported

export const metadata: Metadata = {
  title: "BonMart - Coming Soon",
  description: "BonMart: Bonzer Shopping Experiences. Our new online store is under construction.",
  keywords: ["BonMart", "e-commerce", "shopping", "coming soon", "online store"],
  openGraph: {
    title: "BonMart - Coming Soon",
    description: "Our new online store is under construction.",
    siteName: "BonMart",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* ThemeProvider is a client component that hydrates theme from localStorage / prefers-color-scheme */}
        <ThemeProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-100 smooth-theme-transition">
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
