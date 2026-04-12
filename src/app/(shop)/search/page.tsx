//src/app/(shop)/search/page.tsx

import { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";
import SearchForm from "@/components/search/search-form";

export const metadata: Metadata = {
    title: "Search Products | BonMart",
    description: "Find sustainable and eco-friendly products quickly with BonMart search.",
};

/**
 * SearchPage Component
 * Server-side entry point for the search route.
 * Orchestrates layout and SEO while delegating interactivity to Client Components.
 */
export default function SearchPage() {
    return (
        <PageContainer>
            <div className="flex flex-col items-center gap-8">
                <header className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Search BonMart
                    </h1>
                    <p className="mt-2 text-neutral-color">
                        Find the best sustainable products for your lifestyle.
                    </p>
                </header>

                <section className="w-full max-w-2xl">
                    {/* Client Component boundary for form interactivity */}
                    <SearchForm />

                    <div className="mt-12 text-center">
                        <p className="text-sm text-neutral-color">
                            Our advanced search filters are currently under development.
                        </p>
                    </div>
                </section>
            </div>
        </PageContainer>
    );
}
