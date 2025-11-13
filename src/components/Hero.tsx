// src/components/Hero.tsx
"use client";

import BonMartLogo from "@/assets/icons/bonmart-logo.svg";
import { Loader2 } from "lucide-react";

export default function Hero() {
    // Respect reduced motion system preference for animations.
    const prefersReducedMotion =
        typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return (
        <section
            id="hero"
            role="region"
            aria-labelledby="hero-title"
            className="flex flex-col items-center text-center gap-8 p-4 sm:p-8"
        >
            <div className={`mb-4 ${prefersReducedMotion ? "" : "animate-bounce"}`} aria-hidden={prefersReducedMotion}>
                <BonMartLogo className="w-[100px] h-[100px] text-brand sync-transition" />
            </div>

            <h1 id="hero-title" className="text-5xl md:text-6xl font-extrabold mb-4">
                <span className="text-brand sync-transition">Bon</span>
                <span className="text-neutral-text-light dark:text-neutral-text-dark sync-transition">Mart</span>
            </h1>

            <h2 className="text-2xl text-brand sync-transition mb-6">
                Bonzer & Green
            </h2>

            <p className="text-lg text-neutral-text-light dark:text-neutral-text-dark sync-transition mb-8 max-w-md">
                We are crafting something special just for you. Our new online store is under construction and will be live soon!
            </p>

            <div className="flex items-center gap-3 p-3 bg-surface-light dark:bg-neutral-bg-dark rounded-lg shadow-xl sync-transition">
                <Loader2 className="w-5 h-5 text-brand sync-transition animate-spin" aria-hidden="true" />
                <span className="text-neutral-text-light dark:text-neutral-text-dark sync-transition">Coming soon!</span>
            </div>
        </section>
    );
}
