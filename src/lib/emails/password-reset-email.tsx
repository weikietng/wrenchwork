import * as React from "react"

interface PasswordResetEmailProps {
  firstName?: string | null
  resetUrl: string
}

export function PasswordResetEmail({
  firstName,
  resetUrl,
}: PasswordResetEmailProps) {
  const safeName = firstName?.trim() || "there"

  return (
    <div
      style={{
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        backgroundColor: "#f8fafc",
        padding: "40px 20px",
        margin: 0,
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "48px 40px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: "32px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://wrenchwork.northbench.dev/icon.png"
            alt="Wrenchwork"
            style={{
              width: "120px",
              height: "auto",
              margin: "0 auto",
              display: "block",
            }}
          />
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "16px",
            color: "#0f172a",
            lineHeight: 1.3,
          }}
        >
          Reset your password
        </h1>

        {/* Body Text */}
        <p
          style={{
            fontSize: "16px",
            marginBottom: "12px",
            color: "#334155",
            lineHeight: 1.6,
          }}
        >
          Hi {safeName}, we received a request to reset your password for your <strong>Wrenchwork</strong> account.
        </p>
        
        <p
          style={{
            fontSize: "16px",
            marginBottom: "32px",
            color: "#334155",
            lineHeight: 1.6,
          }}
        >
          Click the button below to create a new password. If you didn&apos;t request this, you can safely ignore this email.
        </p>

        {/* CTA Button */}
        <a
          href={resetUrl}
          style={{
            display: "inline-block",
            padding: "14px 32px",
            backgroundColor: "#1d4ed8",
            color: "#ffffff",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "16px",
            marginBottom: "32px",
            transition: "background-color 0.2s",
          }}
        >
          Reset my password
        </a>

        {/* Divider */}
        <div
          style={{
            borderTop: "1px solid #e2e8f0",
            margin: "32px 0",
          }}
        />

        {/* Fallback Link */}
        <p
          style={{
            fontSize: "14px",
            marginBottom: "12px",
            color: "#64748b",
            lineHeight: 1.5,
          }}
        >
          This link will expire in 1 hour. If the button above doesn&apos;t work, copy and paste this link into your browser:
        </p>
        
        <div
          style={{
            fontFamily: "monospace",
            fontSize: "13px",
            wordBreak: "break-all",
            backgroundColor: "#f1f5f9",
            padding: "16px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            marginBottom: "32px",
            color: "#475569",
          }}
        >
          {resetUrl}
        </div>

        {/* Security Notice */}
        <div
          style={{
            backgroundColor: "#fef3c7",
            border: "1px solid #fbbf24",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "24px",
            textAlign: "left",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              color: "#92400e",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            <strong>Security tip:</strong> If you didn&apos;t request a password reset, please ignore this email and consider changing your password to keep your account secure.
          </p>
        </div>

        {/* Footer */}
        <p
          style={{
            fontSize: "14px",
            color: "#64748b",
            lineHeight: 1.5,
          }}
        >
          Thank you,<br />
          <strong style={{ color: "#1d4ed8" }}>Wrenchwork</strong>
        </p>
      </div>

      {/* Email Footer */}
      <div
        style={{
          maxWidth: "600px",
          margin: "24px auto 0",
          textAlign: "center",
          fontSize: "12px",
          color: "#94a3b8",
        }}
      >
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} Wrenchwork. All rights reserved.
        </p>
      </div>
    </div>
  )
}
