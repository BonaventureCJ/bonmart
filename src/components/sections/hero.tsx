// src/components/sections/hero.tsx

"use client";

import { useState, useEffect } from "react";
import BonMartCartLogo from "@/assets/icons/bonmart-cart-logo.svg";
import { Heading } from "@/components/ui/heading/heading";
import { Icon } from "@/components/ui/icon/icon";
import { Button } from "@/components/ui/button/button";

/**
 * Hero Component
 * Standardized with enterprise typography and theme-aware styling.
 * Updated for live Vercel deployment with exploration CTA.
 */
export function Hero() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    return (
        <section
            id="hero"
            role="region"
            aria-labelledby="hero-title"
            className="flex flex-col items-center gap-8 p-4 text-center sm:p-8"
        >
            <div
                className={!prefersReducedMotion ? "animate-bounce" : ""}
                aria-hidden="true"
            >
                <BonMartCartLogo className="h-[100px] w-[100px] text-(--brand-color)" />
            </div>

            <header className="space-y-4">
                <Heading
                    id="hero-title"
                    level={1}
                    weight="bold"
                    className="text-5xl md:text-6xl"
                >
                    <span className="text-(--brand-color)">Bon</span>
                    <span className="text-(--neutral-color)">Mart</span>
                </Heading>

                <Heading
                    level={2}
                    weight="semibold"
                    className="text-2xl text-(--brand-color)"
                >
                    Bonzer & Green
                </Heading>
            </header>

            <div className="space-y-6">
                <div className="space-y-4">
                    <p className="max-w-md text-lg text-(--neutral-color)">
                        We are crafting something special just for you. Our new
                        eco-conscious store is launching soon!
                    </p>
                    <p className="max-w-md text-lg text-(--neutral-color)">
                        Many enterprise-grade features are already live and ready
                        for inspection. We invite you to start exploring our
                        sustainable platform today.
                    </p>
                </div>

                <div className="pt-2">
                    <Button
                        href="/products"
                        variant="primary"
                        size="lg"
                        icon="arrowRight"
                        iconPlacement="right"
                    >
                        Start Exploring
                    </Button>
                </div>

                <p className="max-w-md text-sm text-(--neutral-color) opacity-70 italic">
                    Powered by CI/CD: New features are added on a rolling basis.
                </p>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-(--surface-raised) p-3 shadow-lg ring-1 ring-(--toggle-bg) transition-all">
                <Icon
                    name="loader"
                    className="animate-spin text-(--brand-color)"
                    size={20}
                />
                <span className="font-medium text-(--neutral-color)">
                    Optimizing your experience...
                </span>
            </div>
        </section>
    );
}
