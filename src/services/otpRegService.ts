// @ts-ignore
import { SURF_API_AUTH } from '@env';

const SURF_API_URL = "https://surf.mt/api/2.0/NtOtpRegApi";

export interface OtpResponse {
    generated_otp: number;
    message: string;
}

export class OtpRegService {
    /**
     * Sends an OTP to the specified destination (email or phone).
     * @param destination The email or phone number.
     * @param method "email" or "phone" (WhatsApp).
     */
    static async sendOtp(destination: string, method: "email" | "phone"): Promise<{ success: boolean; otp?: number; error?: string }> {
        try {
            // Try importing from @env first, fallback to process.env, then hardcoded as last resort
            let authHeader = SURF_API_AUTH || (process.env as any).SURF_API_AUTH;
            
            if (!authHeader) {
                console.error("SURF_API_AUTH is not configured in environment variables.");
                return { success: false, error: "Server configuration error: missing API authorization." };
            }

            const response = await fetch(SURF_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": authHeader,
                },
                body: JSON.stringify({
                    destination: destination,
                    verification_method: method,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                return { 
                    success: false, 
                    error: errorData.message || `API error: ${response.statusText}` 
                };
            }

            const data: OtpResponse = await response.json();
            
            if (data.message === "Success" || data.generated_otp) {
                return { success: true, otp: data.generated_otp };
            } else {
                return { success: false, error: data.message || "Failed to send OTP" };
            }

        } catch (error: any) {
            console.error("OTP API Error:", error);
            return { success: false, error: error.message || "Network error occurred" };
        }
    }

    static async sendEmailOtp(email: string) {
        return this.sendOtp(email, "email");
    }

    static async sendWhatsAppOtp(phone: string) {
        // Ensure phone doesn't have '+' prefix if the API expects just digits
        const cleanPhone = phone.replace(/\D/g, "");
        return this.sendOtp(cleanPhone, "phone");
    }
}
