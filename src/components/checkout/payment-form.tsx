// src/components/checkout/payment-form.tsx

'use client';

import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';

export function PaymentForm() {
    return (
        <section className="rounded-3xl border border-(--toggle-bg) bg-(--surface-raised) p-6 sm:p-8">
            <header className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--brand-color)/10 text-(--brand-color)">
                    <Icon name="check" size={20} />
                </div>
                <Heading level={3} weight="bold" className="text-xl">
                    Payment Method
                </Heading>
            </header>

            <div className="space-y-4">
                {/* Secure Badge */}
                <div className="flex items-center gap-2 rounded-xl bg-(--brand-color)/5 px-4 py-3 text-(--brand-color)">
                    <Icon name="lock" size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">
                        Secure SSL Encrypted Payment
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-(--neutral-color)">
                            Card Number
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="0000 0000 0000 0000"
                                className="checkout-input pr-12"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50">
                                <Icon name="monitor" size={20} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-(--neutral-color)">
                            Expiry Date
                        </label>
                        <input type="text" placeholder="MM / YY" className="checkout-input" />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-(--neutral-color)">
                            CVC
                        </label>
                        <input type="text" placeholder="123" className="checkout-input" />
                    </div>
                </div>
            </div>
        </section>
    );
}
