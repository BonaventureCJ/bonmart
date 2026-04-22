// src/components/contact/contact-header.tsx

import { Heading } from '@/components/ui/heading/heading';
import { Icon } from '@/components/ui/icon/icon';

export function ContactHeader() {
    return (
        <header className="mb-16 flex flex-col items-center text-center md:mb-32">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-(--brand-color)/10 px-4 py-1.5 text-[10px] font-bold tracking-widest text-(--brand-color) uppercase">
                <Icon name="user" size={14} />
                <span>Get in Touch</span>
            </div>
            <Heading level={1} weight="bold" className="mb-6">
                We&apos;re Here to <br className="hidden md:block" />
                <span className="text-(--brand-color)">Support Your Journey</span>
            </Heading>
            <p className="max-w-2xl text-base leading-relaxed text-(--neutral-color) md:text-lg">
                Have questions about our eco-standards or an existing order?
                Our team of environmental specialists is ready to assist you.
            </p>
        </header>
    );
}
