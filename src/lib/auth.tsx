// src/lib/auth.tsx
import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { Resend } from "resend";
import { render } from "@react-email/render";

import { VerificationEmail } from "@/lib/emails/verification-email";
import { PasswordResetEmail } from "@/lib/emails/password-reset-email";

const url = process.env.DATABASE_URL ?? process.env.DATABASE_URL_UNPOOLED;
if (!url) {
  throw new Error("DATABASE_URL is missing. Set it before running the Better Auth CLI.");
}

const resendApiKey = process.env.RESEND_API_KEY ?? process.env.RESEND_API;
const resendFromEmail = process.env.RESEND_FROM_EMAIL ?? "Wrenchwork <no-reply@wrenchwork.app>";
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

const resend = resendApiKey
  ? new Resend(resendApiKey)
  : null;

// Neon requires SSL; `pg` needs it explicitly in many environments.
const pool = new Pool({
  connectionString: url,
  ssl: { rejectUnauthorized: false },
});

export const auth = betterAuth({
  database: pool,
  user: {
    additionalFields: {
      privacyPolicyAccepted: {
        type: "boolean",
        required: true,
        defaultValue: false,
        input: true,
      },
      privacyPolicyVersion: {
        type: "string",
        required: false,
        input: true,
      },
      privacyPolicyAcceptedAt: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["x-real-ip", "cf-connecting-ip", "x-forwarded-for"],
    },
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 100,
    customRules: {
      "/sign-in/email": { window: 10, max: 3 },
      "/sign-up/email": { window: 60, max: 5 },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    disabledPaths: ["/sign-up", "/sign-in"],
    resetPasswordTokenExpiresIn: 3600, // 1 hour in seconds
    async sendResetPassword({ user, url }) {
      if (!resend) {
        console.warn("Resend client not configured. Skipping password reset email send.");
        return;
      }

      // Better Auth provides the full reset URL, use it directly
      const resetUrl = url;
      const firstName = user.name?.split(" ")[0] || null;

      try {
        const emailHtml = await render(
          <PasswordResetEmail
            firstName={firstName}
            resetUrl={resetUrl}
          />
        );

        const { data, error } = await resend.emails.send({
          from: resendFromEmail,
          to: user.email,
          subject: "Reset your Wrenchwork password",
          html: emailHtml,
        });

        if (error) {
          console.error("Resend error:", error);
          throw new Error(`Failed to send password reset email: ${error.message}`);
        }

        console.log("Password reset email sent:", data);
      } catch (err) {
        console.error("Failed to send password reset email:", err);
        throw err;
      }
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: false,
    autoSignInAfterVerification: false,
    async sendVerificationEmail({ user, token }) {
      if (!resend) {
        console.warn("Resend client not configured. Skipping verification email send.");
        return;
      }

      const verificationUrl = `${appUrl}/verify-email?token=${encodeURIComponent(token)}`;
      const firstName = user.name?.split(" ")[0] || null;

      try {
        const emailHtml = await render(
          <VerificationEmail
            firstName={firstName}
            verificationUrl={verificationUrl}
          />
        );

        const { data, error } = await resend.emails.send({
          from: resendFromEmail,
          to: user.email,
          subject: "Verify your Wrenchwork email",
          html: emailHtml,
        });

        if (error) {
          console.error("Resend error:", error);
          throw new Error(`Failed to send verification email: ${error.message}`);
        }

        console.log("Verification email sent:", data);
      } catch (err) {
        console.error("Failed to send verification email:", err);
        throw err;
      }
    },
  },
  account: {
    accountLinking: {
      enabled: false,
    },
  },
});
