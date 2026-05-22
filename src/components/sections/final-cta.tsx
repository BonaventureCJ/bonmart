// src/components/sections/final-cta.tsx

import { Heading } from '@/components/ui/heading/heading';
import { Button } from '@/components/ui/button/button';

export function FinalCTA() {
    return (
        <section className="rounded-3xl bg-(--brand-color) p-8 text-center text-(--text-on-brand) md:p-16">
            <Heading
                level={2}
                weight="bold"
                className="mb-4 text-(--text-on-brand)"
            >
                Ready to join the green revolution?
            </Heading>

            <p className="mb-10 text-base opacity-90 text-(--text-on-brand) md:text-lg">
                Experience enterprise-grade shopping with a conscience.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                    href="/products"
                    variant="secondary"
                    size="lg"
                    className="shadow-sm transition-transform active:scale-95"
                >
                    Shop Now
                </Button>

                <Button
                    href="/about"
                    variant="ghost"
                    className="border border-(--text-on-brand)/20 text-(--text-on-brand) hover:bg-black/10 active:bg-black/20"
                >
                    Our Story
                </Button>
            </div>
        </section>
    );
}

