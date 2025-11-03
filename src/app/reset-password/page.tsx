"use client"

import { useState, useMemo, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { analyzePassword } from "@/lib/password"

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  const passwordAnalysis = useMemo(
    () => analyzePassword(password),
    [password]
  )

  const strengthPercentage = Math.min(
    Math.max((passwordAnalysis.strength.id / 3) * 100, 0),
    100
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    setFieldErrors({})

    // Validate
    const errors: Record<string, string> = {}

    if (!passwordAnalysis.isValid) {
      errors.password = "Password does not meet requirements"
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    if (!token) {
      setMessage({
        type: "error",
        text: "Invalid or missing reset token. Please request a new password reset link.",
      })
      return
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setIsLoading(true)

    try {
      const { error } = await authClient.resetPassword({
        newPassword: password,
        token,
      })

      if (error) {
        setMessage({
          type: "error",
          text: error.message || "Failed to reset password. The link may have expired.",
        })
        return
      }

      setMessage({
        type: "success",
        text: "Password reset successfully! Redirecting to login...",
      })

      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err) {
      console.error("Reset password error:", err)
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Invalid Reset Link</CardTitle>
            <CardDescription>
              This password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/forgot-password">Request new reset link</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Reset your password</CardTitle>
            <CardDescription>
              Enter your new password below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                {message && (
                  <div
                    className={`rounded-md p-3 text-sm ${
                      message.type === "success"
                        ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
                        : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <Field data-invalid={Boolean(fieldErrors.password)}>
                  <FieldLabel htmlFor="password">New Password</FieldLabel>
                  <FieldContent>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      aria-invalid={Boolean(fieldErrors.password)}
                      autoComplete="new-password"
                      required
                      disabled={isLoading}
                    />
                    <div className="space-y-2">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full transition-all duration-300"
                          style={{
                            width: `${strengthPercentage}%`,
                            backgroundColor:
                              strengthPercentage < 33
                                ? "#ef4444"
                                : strengthPercentage < 66
                                ? "#f59e0b"
                                : "#10b981",
                          }}
                        />
                      </div>
                      <ul className="space-y-1 text-sm">
                        {passwordAnalysis.requirements.map((requirement) => (
                          <li
                            key={requirement.key}
                            className="flex items-center gap-2"
                          >
                            {requirement.satisfied ? (
                              <Check className="h-4 w-4 text-emerald-600" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span
                              className={
                                requirement.satisfied
                                  ? "text-emerald-600"
                                  : "text-muted-foreground"
                              }
                            >
                              {requirement.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <FieldError
                      errors={
                        fieldErrors.password
                          ? [{ message: fieldErrors.password }]
                          : undefined
                      }
                    />
                  </FieldContent>
                </Field>

                <Field data-invalid={Boolean(fieldErrors.confirmPassword)}>
                  <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                  <FieldContent>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      aria-invalid={Boolean(fieldErrors.confirmPassword)}
                      autoComplete="new-password"
                      required
                      disabled={isLoading}
                    />
                    <FieldError
                      errors={
                        fieldErrors.confirmPassword
                          ? [{ message: fieldErrors.confirmPassword }]
                          : undefined
                      }
                    />
                  </FieldContent>
                </Field>

                <Field>
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? "Resetting..." : "Reset password"}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}
