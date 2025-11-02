"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Check, Loader2, X } from "lucide-react"

import { analyzePassword } from "@/lib/password"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type FieldErrors = Record<string, string | undefined>

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formMessage, setFormMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  const passwordAnalysis = useMemo(
    () => analyzePassword(formValues.password),
    [formValues.password]
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setFieldErrors({})
    setFormMessage(null)

    try {
      const response = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formValues,
          acceptedPrivacyPolicy,
          privacyPolicyVersion: "1.0",
          privacyPolicyAcceptedAt: new Date().toISOString(),
        }),
      })

      const data = (await response.json()) as {
        success: boolean
        message: string
        errors?: FieldErrors
      }

      if (!response.ok) {
        setFieldErrors(data.errors ?? {})
        setFormMessage({ type: "error", text: data.message })
        return
      }

      setFormMessage({ type: "success", text: data.message })
      setFormValues({ name: "", email: "", password: "", confirmPassword: "" })
      setFieldErrors({})
    } catch (error) {
      console.error("Signup request failed", error)
      setFormMessage({
        type: "error",
        text: "We couldn’t create your account. Please try again shortly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const strengthPercentage = Math.min(
    Math.max((passwordAnalysis.strength.id / 3) * 100, 0),
    100
  )

  return (
    <form
      className={cn(
        "flex flex-col gap-6 text-left",
        "max-w-sm",
        className
      )}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold">Create your account</h1>
        <p className="text-muted-foreground text-sm">
          Fill in the details below to start managing your garages.
        </p>
      </div>

      {formMessage ? (
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
      ) : null}

      <Field data-invalid={Boolean(fieldErrors.name)}>
        <FieldLabel htmlFor="name">Full Name</FieldLabel>
        <FieldContent>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={formValues.name}
            onChange={handleChange}
            aria-invalid={Boolean(fieldErrors.name)}
            autoComplete="name"
            required
          />
          <FieldError
            errors={
              fieldErrors.name
                ? [{ message: fieldErrors.name }]
                : undefined
            }
          />
        </FieldContent>
      </Field>

      <Field data-invalid={Boolean(fieldErrors.email)}>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <FieldContent>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            value={formValues.email}
            onChange={handleChange}
            aria-invalid={Boolean(fieldErrors.email)}
            autoComplete="email"
            required
          />
          <FieldDescription>
            We&apos;ll email you a link to verify your account.
          </FieldDescription>
          <FieldError
            errors={
              fieldErrors.email
                ? [{ message: fieldErrors.email }]
                : undefined
            }
          />
        </FieldContent>
      </Field>

      <Field data-invalid={Boolean(fieldErrors.password)}>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <FieldContent>
          <Input
            id="password"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            aria-invalid={Boolean(fieldErrors.password)}
            autoComplete="new-password"
            required
          />
          <div className="space-y-2">
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  strengthPercentage < 40 && "bg-destructive",
                  strengthPercentage >= 40 && strengthPercentage < 75 && "bg-amber-500",
                  strengthPercentage >= 75 && "bg-emerald-500"
                )}
                style={{ width: `${strengthPercentage}%` }}
              />
            </div>
            <ul className="space-y-1 text-sm">
              {passwordAnalysis.requirements.map((requirement) => (
                <li
                  key={requirement.key}
                  className="flex items-center gap-2"
                >
                  {requirement.satisfied ? (
                    <Check className="size-4 text-emerald-500" />
                  ) : (
                    <X className="size-4 text-destructive" />
                  )}
                  <span
                    className={cn(
                      requirement.satisfied
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
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
            value={formValues.confirmPassword}
            onChange={handleChange}
            aria-invalid={Boolean(fieldErrors.confirmPassword)}
            autoComplete="new-password"
            required
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

      <Field data-invalid={!acceptedPrivacyPolicy && isSubmitting}>
        <div className="flex items-start gap-3">
          <Checkbox
            id="privacy-policy"
            checked={acceptedPrivacyPolicy}
            onCheckedChange={(checked) => setAcceptedPrivacyPolicy(checked === true)}
            required
            aria-invalid={!acceptedPrivacyPolicy && isSubmitting}
          />
          <label
            htmlFor="privacy-policy"
            className="text-sm leading-relaxed text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the{" "}
            <Link
              href="/terms"
              target="_blank"
              className="text-primary underline-offset-4 hover:underline"
            >
              Terms of Service
            </Link>
            {" "}and{" "}
            <Link
              href="/privacy"
              target="_blank"
              className="text-primary underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
          </label>
        </div>
        {!acceptedPrivacyPolicy && isSubmitting ? (
          <FieldError
            errors={[
              { message: "You must accept the Privacy Policy to create an account" },
            ]}
          />
        ) : null}
      </Field>

      <div className="space-y-3">
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || !acceptedPrivacyPolicy}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Creating account…
            </>
          ) : (
            "Create Account"
          )}
        </Button>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  )
}
