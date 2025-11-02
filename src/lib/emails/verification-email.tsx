import * as React from "react"

interface VerificationEmailProps {
  firstName?: string | null
  verificationUrl: string
}

export function VerificationEmail({
  firstName,
  verificationUrl,
}: VerificationEmailProps) {
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
            src="https://i.imgur.com/6qiUSYr.png"
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
          Verify your email to get started
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
          Hi {safeName}, your access to <strong>Wrenchwork</strong> — your cloud-based garage management system — is just one step away!
        </p>
        
        <p
          style={{
            fontSize: "16px",
            marginBottom: "32px",
            color: "#334155",
            lineHeight: 1.6,
          }}
        >
          Confirm your email address below to activate your account and start managing jobs, tracking parts, and scheduling maintenance with ease.
        </p>

        {/* CTA Button */}
        <a
          href={verificationUrl}
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
          Confirm my email
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
          This link will expire in 24 hours. If the button above doesn&apos;t work, copy and paste this link into your browser:
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
          {verificationUrl}
        </div>

        {/* Footer */}
        <p
          style={{
            fontSize: "14px",
            color: "#64748b",
            lineHeight: 1.5,
            marginBottom: "24px",
          }}
        >
          If you didn&apos;t request a Wrenchwork account, you can safely ignore this email.
        </p>

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
