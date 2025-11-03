"use client"

import { useState, useMemo } from "react"
import { Check, X } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
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
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { analyzePassword } from "@/lib/password"
import { cn } from "@/lib/utils"

export default function AccountSettingsPage() {
  const { data: session } = authClient.useSession()
  const user = session?.user

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [formMessage, setFormMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  const passwordAnalysis = useMemo(
    () => analyzePassword(newPassword),
    [newPassword]
  )

  const strengthPercentage = Math.min(
    Math.max((passwordAnalysis.strength.id / 3) * 100, 0),
    100
  )

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setFieldErrors({})
    setFormMessage(null)

    try {
      // Validate
      const errors: Record<string, string> = {}

      if (!currentPassword) {
        errors.currentPassword = "Current password is required"
      }

      if (!passwordAnalysis.isValid) {
        errors.newPassword = "Password does not meet requirements"
      }

      if (newPassword !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match"
      }

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors)
        return
      }

      const { error } = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      })

      if (error) {
        if (error.message?.toLowerCase().includes("current password")) {
          setFieldErrors({ currentPassword: "Current password is incorrect" })
        } else {
          setFormMessage({
            type: "error",
            text: error.message || "Failed to change password",
          })
        }
        return
      }

      setFormMessage({
        type: "success",
        text: "Password changed successfully!",
      })

      // Clear form
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (error) {
      console.error("Failed to change password:", error)
      setFormMessage({
        type: "error",
        text: "Failed to change password. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div>
          <h1 className="text-lg font-semibold">Account Settings</h1>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="mx-auto w-full max-w-4xl space-y-6">
          <p className="text-muted-foreground">
            Manage your account information and security settings
          </p>

          {formMessage && (
            <div
              className={cn(
                "rounded-lg border p-4 text-sm",
                formMessage.type === "success"
                  ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-600"
                  : "border-destructive/40 bg-destructive/5 text-destructive"
              )}
            >
              {formMessage.text}
            </div>
          )}

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Your basic account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Name</div>
                <div className="text-sm text-muted-foreground">{user?.name || "Not set"}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Email</div>
                <div className="text-sm text-muted-foreground">{user?.email}</div>
              </div>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <Field data-invalid={Boolean(fieldErrors.currentPassword)}>
                  <FieldLabel htmlFor="currentPassword">Current Password</FieldLabel>
                  <FieldContent>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                    <FieldError
                      errors={
                        fieldErrors.currentPassword
                          ? [{ message: fieldErrors.currentPassword }]
                          : undefined
                      }
                    />
                  </FieldContent>
                </Field>

                <Field data-invalid={Boolean(fieldErrors.newPassword)}>
                  <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                  <FieldContent>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      disabled={isSubmitting}
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
                        fieldErrors.newPassword
                          ? [{ message: fieldErrors.newPassword }]
                          : undefined
                      }
                    />
                  </FieldContent>
                </Field>

                <Field data-invalid={Boolean(fieldErrors.confirmPassword)}>
                  <FieldLabel htmlFor="confirmPassword">Confirm New Password</FieldLabel>
                  <FieldContent>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isSubmitting}
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

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Changing..." : "Change Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
