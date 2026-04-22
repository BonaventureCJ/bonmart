// src/app/contact/page.tsx

import { Metadata } from 'next';
import PageContainer from '@/components/layout/page-container';
import { ContactHeader } from '@/components/contact/contact-header';
import { ContactInfo } from '@/components/contact/contact-info';
import { ContactForm } from '@/components/contact/contact-form';

export const metadata: Metadata = {
    title: 'Contact Us | Bonmart Support',
    description: 'Get in touch with the Bonmart team regarding sustainability, orders, or partnerships.',
    openGraph: {
        title: 'Contact Bonmart | Sustainable Support',
        description: 'Connect with our environmental specialists and support team.',
        type: 'website',
    },
};

export default function ContactPage() {
    return (
        <PageContainer>
            <article className="mx-auto max-w-5xl py-12 md:py-24">
                <ContactHeader />
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
                    <ContactInfo />
                    <ContactForm />
                </div>
            </article>
        </PageContainer>
    );
}
