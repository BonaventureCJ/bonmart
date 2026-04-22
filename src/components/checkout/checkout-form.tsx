// src/components/checkout/checkout-form.tsx

'use client';

import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';

export function CheckoutForm() {
    return (
        <section className="rounded-3xl border border-(--toggle-bg) bg-(--surface-raised) p-6 sm:p-8">
            <header className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--brand-color)/10 text-(--brand-color)">
                    <Icon name="user" size={20} />
                </div>
                <Heading level={3} weight="bold" className="text-xl">
                    Shipping Details
                </Heading>
            </header>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-(--neutral-color)">
                        Full Name
                    </label>
                    <input type="text" placeholder="e.g. John Doe" className="checkout-input" />
                </div>

                <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-(--neutral-color)">
                        Street Address
                    </label>
                    <input type="text" placeholder="123 Eco Street" className="checkout-input" />
                </div>

                <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-(--neutral-color)">
                        City
                    </label>
                    <input type="text" placeholder="Lagos" className="checkout-input" />
                </div>

                <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-(--neutral-color)">
                        Postcode
                    </label>
                    <input type="text" placeholder="100001" className="checkout-input" />
                </div>
            </div>
        </section>
    );
}
