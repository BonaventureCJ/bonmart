// src/components/Hero.tsx
"use client";

import BonMartLogo from "@/assets/icons/bonmart-logo.svg";
import { Loader2 } from "lucide-react";

export default function Hero() {
    // respect reduced motion
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
                <BonMartLogo className="w-[100px] h-[100px] text-green-600 dark:text-green-400 smooth-theme-transition" />
            </div>

            <h1 id="hero-title" className="text-5xl md:text-6xl font-extrabold mb-4">
                <span className="text-green-600 dark:text-green-400 smooth-theme-transition">Bon</span>
                <span className="text-gray-900 dark:text-white smooth-theme-transition">Mart</span>
            </h1>

            <h2 className="text-2xl text-indigo-600 dark:text-indigo-400 mb-6 smooth-theme-transition">
                Bonzer Shopping Experiences
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md smooth-theme-transition">
                We are crafting something special just for you. Our new online store is under construction and will be live soon!
            </p>

            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-xl smooth-theme-transition">
                <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" aria-hidden="true" />
                <span className="text-gray-700 dark:text-gray-300 smooth-theme-transition">Coming soon!</span>
            </div>
        </section>
    );
}
