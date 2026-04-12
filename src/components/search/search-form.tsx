//src/components/search/search-form.tsx

"use client";

import { useId, type FormEvent } from "react";

/**
 * SearchForm Component
 * A client-side component handling product search input and submission logic.
 * Follows enterprise patterns for accessibility and hydration safety.
 */
export default function SearchForm() {
    const inputId = useId();

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Logic for routing to search results will be implemented here
    };

    return (
        <form
            role="search"
            className="relative flex w-full items-center"
            onSubmit={handleSearch}
        >
            <label htmlFor={inputId} className="sr-only">
                Search for products
            </label>
            <input
                id={inputId}
                type="search"
                placeholder="Search eco-friendly items..."
                className="focus-ring h-12 w-full rounded-full border border-[var(--footer-border)] bg-[var(--toggle-container-bg)] px-6 py-2 outline-none transition-all placeholder:text-[var(--neutral-color)]"
            />
        </form>
    );
}
