// src/app/layout.tsx (RootLayout)
import type { Metadata } from 'next';
import { ReduxProvider } from '@/providers/ReduxProvider';
import { LayoutWrapper } from '@/components/layout/layout-wrapper';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'BonMart - Bonzer & Green',
  description: 'BonMart online store: under construction. Coming soon.',
  appleWebApp: {
    title: 'BonMart',
  },
};

// Immediately applies the theme to prevent FOUC, based on stored preference or system setting.
const setInitialTheme = `
  (function() {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = storedTheme === "dark" || (storedTheme === null && prefersDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Script to set initial theme based on localStorage to prevent FOUC.
          This runs before React hydrates the page.
        */}
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
      </head>
      <body>
        <ReduxProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
