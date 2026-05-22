import { ref, set, get, remove } from "firebase/database";
import { realtimeDb } from "../lib/firebase";
// import emailjs from "@emailjs/react-native";

const EMAILJS_PUBLIC_KEY = "Ao5LtP5ECdyZkMfIi";
const EMAILJS_SERVICE_ID = "service_vbx15qf";
const EMAILJS_TEMPLATE_ID = "template_m3jd548"; // OTP template
// const EMAILJS_REGISTRATION_TEMPLATE_ID = "template_f566cct"; // Registration email template (unused here but good to note)

interface OTPRecord {
  email: string;
  otp: string;
  createdAt: number;
  expiresAt: number;
  attempts: number;
  isVerified: boolean;
}

export class OTPService {
  private static readonly OTP_EXPIRY_MINUTES = 10;
  private static readonly MAX_ATTEMPTS = 3;
  private static readonly RESEND_COOLDOWN_SECONDS = 60;

  private static generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  static async sendOTP(
    email: string
  ): Promise<{ success: boolean; sessionId?: string; error?: string }> {
    try {
      if (!realtimeDb) {
        // Fallback if DB not ready (e.g. still in "YOUR_API_KEY" state)
        // But in production this should throw
        console.warn("Database not initialized");
        return { success: false, error: "System not ready (DB)" };
      }

      // Check existing OTP
      const existingOTPRef = ref(
        realtimeDb,
        `otps/${email.replace(/[.@]/g, "_")}`
      );
      const existingSnapshot = await get(existingOTPRef);

      if (existingSnapshot.exists()) {
        const existingOTP: OTPRecord = existingSnapshot.val();
        const timeSinceCreated = Date.now() - existingOTP.createdAt;
        const cooldownMs = this.RESEND_COOLDOWN_SECONDS * 1000;

        if (timeSinceCreated < cooldownMs && !existingOTP.isVerified) {
          const remainingSeconds = Math.ceil(
            (cooldownMs - timeSinceCreated) / 1000
          );
          return {
            success: false,
            error: `Please wait ${remainingSeconds} seconds before requesting a new OTP.`,
          };
        }
      }

      const otp = this.generateOTP();
      const now = Date.now();
      const expiresAt = now + this.OTP_EXPIRY_MINUTES * 60 * 1000;

      const otpRecord: OTPRecord = {
        email,
        otp,
        createdAt: now,
        expiresAt,
        attempts: 0,
        isVerified: false,
      };

      await set(existingOTPRef, otpRecord);

      // Send via EmailJS API instead of library
      try {
        const response = await fetch(
          "https://api.emailjs.com/api/v1.0/email/send",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Origin: "https://sell.surf.mt", // Mimic web origin
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            },
            body: JSON.stringify({
              service_id: EMAILJS_SERVICE_ID,
              template_id: EMAILJS_TEMPLATE_ID,
              user_id: EMAILJS_PUBLIC_KEY,
              template_params: {
                // Kitchen sink strategy from web implementation
                email: email,
                to_email: email,
                recipient_email: email,
                user_email: email,
                reply_to: email,

                name: email.split("@")[0],
                to_name: email.split("@")[0],
                recipient_name: email.split("@")[0],

                otp: otp,
                otp_code: otp,
                code: otp,

                expiry_minutes: this.OTP_EXPIRY_MINUTES.toString(),
                expiry: this.OTP_EXPIRY_MINUTES.toString(),

                message: `Your OTP code is: ${otp}. Valid for ${this.OTP_EXPIRY_MINUTES} minutes.`,
              },
            }),
          }
        );

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`EmailJS Error: ${text}`);
        }

        return { success: true, sessionId: `otp_${now}` };
      } catch (emailError: any) {
        console.error("EmailJS Error:", emailError);
        // Cleanup
        await remove(existingOTPRef);
        return {
          success: false,
          error: "Failed to send email. Check configuration.",
        };
      }
    } catch (error: any) {
      console.error("OTP Send Error:", error);
      return { success: false, error: error.message || "Failed to send OTP" };
    }
  }

  static async verifyOTP(
    email: string,
    inputOTP: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      if (!realtimeDb) return { success: false, error: "Database unavailable" };

      const otpRef = ref(realtimeDb, `otps/${email.replace(/[.@]/g, "_")}`);
      const snapshot = await get(otpRef);

      if (!snapshot.exists()) {
        return { success: false, error: "OTP not found or expired." };
      }

      const otpRecord: OTPRecord = snapshot.val();

      if (otpRecord.expiresAt < Date.now()) {
        await remove(otpRef);
        return { success: false, error: "OTP expired." };
      }

      if (otpRecord.isVerified) {
        return { success: false, error: "OTP already used." };
      }

      if (otpRecord.attempts >= this.MAX_ATTEMPTS) {
        await remove(otpRef);
        return { success: false, error: "Too many failed attempts." };
      }

      if (otpRecord.otp !== inputOTP) {
        await set(otpRef, { ...otpRecord, attempts: otpRecord.attempts + 1 });
        return { success: false, error: "Invalid OTP code." };
      }

      await set(otpRef, { ...otpRecord, isVerified: true });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  static async isEmailVerified(email: string): Promise<boolean> {
    try {
      if (!realtimeDb) return false;
      const otpRef = ref(realtimeDb, `otps/${email.replace(/[.@]/g, "_")}`);
      const snapshot = await get(otpRef);
      if (!snapshot.exists()) return false;
      const rec = snapshot.val();
      return rec.isVerified && rec.expiresAt > Date.now();
    } catch {
      return false;
    }
  }

  static async cleanupOTP(email: string) {
    if (!realtimeDb) return;
    const otpRef = ref(realtimeDb, `otps/${email.replace(/[.@]/g, "_")}`);
    await remove(otpRef);
  }
}
