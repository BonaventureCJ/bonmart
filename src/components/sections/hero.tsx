// src/components/sections/hero.tsx

"use client";

import { useState, useEffect } from "react";
import BonMartCartLogo from "@/assets/icons/bonmart-cart-logo.svg";
import { Heading } from "@/components/ui/heading/heading";
import { Icon } from "@/components/ui/icon/icon";
import { Button } from "@/components/ui/button/button";

/**
 * Hero Component
 * Optimized for performance and accessibility.
 * Maintains original content while enforcing enterprise-grade HTML structure.
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
            className="page-section flex flex-col items-center gap-8 px-4 text-center sm:px-8"
        >
            {/* Visual Branding */}
            <div
                className={!prefersReducedMotion ? "animate-bounce" : ""}
                aria-hidden="true"
            >
                <BonMartCartLogo className="h-[100px] w-[100px] text-(--brand-color)" />
            </div>

            {/* Typography Hierarchy */}
            <header className="space-y-4">
                <Heading
                    level={3}
                    weight="bold"
                    className="text-5xl md:text-6xl"
                >
                    Welcome to
                </Heading>

                <Heading
                    id="hero-main-title"
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

            {/* Main Content Area */}
            <div className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                    <p className="max-w-md text-lg text-(--neutral-color) leading-relaxed">
                        While we prepare to launch, many enterprise-grade features
                        are already live and ready for inspection.
                    </p>
                    <p className="max-w-md text-lg text-(--neutral-color) leading-relaxed">
                        We invite you to start exploring our sustainable platform
                        today as we continue crafting special e-shopping experiences for you.
                    </p>
                </div>

                <div className="pt-2">
                    <Button
                        href="/products"
                        variant="primary"
                        size="lg"
                        icon="arrowRight"
                        iconPlacement="right"
                        className="transition-transform active:scale-95"
                    >
                        Start Exploring
                    </Button>
                </div>

                <p className="max-w-md text-sm italic text-(--neutral-color) opacity-70">
                    Powered by CI/CD: New features are added on a rolling basis.
                </p>
            </div>

            {/* Live Status Feedback */}
            <div
                className="flex items-center gap-3 rounded-lg bg-(--surface-raised) p-3 shadow-lg ring-1 ring-(--toggle-bg) transition-all"
                role="status"
            >
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
