// src/actions/send-contact-email.ts

'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactFormSchema = z.object({
    firstName: z.string().trim().min(2, 'First name must be at least 2 characters.'),
    lastName: z.string().trim().min(2, 'Last name must be at least 2 characters.'),
    email: z.string().trim().email('Please enter a valid email address.'),
    subject: z.string().trim().min(4, 'Subject must be at least 4 characters.'),
    message: z.string().trim().min(10, 'Message must be at least 10 characters.'),
});

export type ContactActionResult = {
    success: boolean;
    message: string;
    fieldErrors?: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        subject?: string[];
        message?: string[];
    };
};

export async function sendContactEmail(payload: unknown): Promise<ContactActionResult> {
    const validation = contactFormSchema.safeParse(payload);

    if (!validation.success) {
        const flattened = z.flattenError(validation.error);
        return {
            success: false,
            message: 'Validation failed. Please verify your entries.',
            fieldErrors: flattened.fieldErrors,
        };
    }

    const { firstName, lastName, email, subject, message } = validation.data;
    const targetMailbox = process.env.CONTACT_RECEIVER_EMAIL;

    if (!process.env.RESEND_API_KEY || !targetMailbox) {
        console.error('[CRITICAL] Missing server configuration keys for Resend.');
        return {
            success: false,
            message: 'Server mail configuration error. Please try again later.',
        };
    }

    try {
        const { error } = await resend.emails.send({
            from: 'BonMart Contact Form <onboarding@resend.dev>',
            to: [targetMailbox],
            replyTo: email,
            // Dynamic subject line update
            subject: `[BonMart] ${subject} (From ${firstName} ${lastName})`,
            html: `
        <div style="font-family: sans-serif; padding: 24px; color: #171717; max-width: 600px; border: 1px solid #e5e7eb; border-radius: 16px;">
          <h2 style="color: #15803d; border-bottom: 2px solid #15803d; padding-bottom: 12px; font-size: 20px;">New BonMart Contact Submission</h2>
          <p><strong>From:</strong> ${firstName} ${lastName} (${email})</p>
          <p><strong>Subject Topic:</strong> ${subject}</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 12px; margin-top: 20px;">
            <p style="white-space: pre-wrap; margin: 0; line-height: 1.6;">${message}</p>
          </div>
        </div>
      `,
        });

        if (error) {
            console.error('Resend transactional API error:', error);
            return { success: false, message: 'The email provider rejected this package request.' };
        }

        return { success: true, message: 'Message delivered! Check your Google mailbox shortly.' };
    } catch (error) {
        console.error('Unexpected transport connection failure:', error);
        return { success: false, message: 'A network failure prevented safe data routing.' };
    }
}
