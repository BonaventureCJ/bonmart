// src/components/sections/hero.tsx

"use client";

import { useState, useEffect } from "react";
import BonMartCartLogo from "@/assets/icons/bonmart-cart-logo.svg";
import { Heading } from "@/components/ui/heading/heading";
import { Button } from "@/components/ui/button/button";

/**
 * Hero Component
 * Focuses on brand identity and sustainable value proposition.
 * Optimized for LCP and accessibility with motion-aware animations.
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
            aria-labelledby="hero-main-title"
            className="page-section flex flex-col items-center gap-10 px-4 text-center sm:px-8"
        >
            {/* Visual Branding: Animated Logo */}
            <div
                className={!prefersReducedMotion ? "animate-bounce" : ""}
                aria-hidden="true"
            >
                <BonMartCartLogo className="h-24 w-24 text-(--brand-color)" />
            </div>

            {/* Content Header: Welcome & Brand */}
            <header className="space-y-4">
                <div className="mx-auto mb-4 inline-flex items-center rounded-full bg-(--brand-color)/10 px-4 py-1.5 text-xs font-bold tracking-widest text-(--brand-color) uppercase">
                    Bonzer & Green
                </div>

                <Heading
                    id="hero-main-title"
                    level={1}
                    weight="bold"
                    className="text-5xl tracking-tight md:text-7xl"
                >
                    Welcome to <span className="text-(--brand-color)">Bon</span>Mart
                </Heading>

                <p className="mx-auto max-w-2xl text-lg leading-relaxed text-(--neutral-color) md:text-xl">
                    Experience the future of commerce. We are committed to
                    providing a premium, eco-friendly shopping experience
                    that protects our planet without compromising on quality.
                </p>
            </header>

            {/* Primary Action Area */}
            <div className="flex flex-col items-center gap-6">
                <div className="space-y-2">
                    <Button
                        href="/products"
                        variant="primary"
                        size="lg"
                        icon="arrowRight"
                        iconPlacement="right"
                        className="shadow-lg transition-transform hover:scale-105 active:scale-95"
                    >
                        Start Mock Shopping
                    </Button>
                    <p className="text-sm font-medium text-(--neutral-color) opacity-60">
                        Explore our sustainable catalog in preview mode.
                    </p>
                </div>
            </div>

            {/* Trust Indicator */}
            <div className="flex items-center gap-2 text-sm font-semibold text-(--brand-color) opacity-80">
                <div className="h-px w-8 bg-(--brand-color)/30" />
                <span>100% Carbon Neutral Operations</span>
                <div className="h-px w-8 bg-(--brand-color)/30" />
            </div>
        </section>
    );
}
