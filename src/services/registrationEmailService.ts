// @ts-ignore
import { EMAILJS_SERVICE_ID, EMAILJS_PUBLIC_KEY } from '@env';

// We fallback to the hardcoded ones if .env is missing for EmailJS to ensure it doesn't break
const SERVICE_ID = EMAILJS_SERVICE_ID || "service_vbx15qf";
const PUBLIC_KEY = EMAILJS_PUBLIC_KEY || "Ao5LtP5ECdyZkMfIi";
const REGISTRATION_TEMPLATE_ID = "template_f566cct";

export interface EmailParams {
    firstName: string;
    lastName: string;
    businessName: string;
    email: string;
    whatsapp: string;
    country: string;
    categories: string;
    timestamp: string;
    [key: string]: string;
}

export const RegistrationEmailService = {
    sendRegistrationEmail: async (params: EmailParams) => {
        if (!SERVICE_ID || !REGISTRATION_TEMPLATE_ID || !PUBLIC_KEY) {
            console.error('EmailJS configuration missing');
            return { success: false, error: 'Email configuration error' };
        }

        try {
            const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    service_id: SERVICE_ID,
                    template_id: REGISTRATION_TEMPLATE_ID,
                    user_id: PUBLIC_KEY,
                    template_params: params,
                }),
            });

            if (!response.ok) {
                const text = await response.text();
                return { success: false, error: text };
            }

            console.log('Email sent successfully');
            return { success: true };
        } catch (error: any) {
            console.error('Failed to send email:', error);
            return { success: false, error: error?.message || 'Failed to send email' };
        }
    }
};
