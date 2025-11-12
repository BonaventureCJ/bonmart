"use client";

import BonMartLogo from "@/assets/icons/bonmart-logo.svg";
import { Loader2 } from "lucide-react";

export default function Hero() {
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
                <BonMartLogo className="w-[100px] h-[100px] text-brand" />
            </div>

            <h1 id="hero-title" className="text-5xl md:text-6xl font-extrabold mb-4">
                <span className="text-brand">Bon</span>
                <span className="text-neutral-text-light dark:text-neutral-text-dark">Mart</span>
            </h1>

            <h2 className="text-2xl text-brand mb-6">
                Bonzer Shopping Experiences
            </h2>

            <p className="text-lg text-neutral-text-light dark:text-neutral-text-dark mb-8 max-w-md">
                We are crafting something special just for you. Our new online store is under construction and will be live soon!
            </p>

            <div className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-bg-dark rounded-lg shadow-xl">
                <Loader2 className="w-5 h-5 text-brand animate-spin" aria-hidden="true" />
                <span className="text-neutral-text-light dark:text-neutral-text-dark">Coming soon!</span>
            </div>
        </section>
    );
}
