import { NextResponse } from "next/server"

import type { ZodError } from "zod"

import { auth } from "@/lib/auth"
import { signupSchema, type SignupInput } from "@/lib/validation"

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

type FieldErrors = Record<string, string>

type SignupResponse =
  | { success: true; message: string }
  | { success: false; message: string; errors?: FieldErrors }

function buildValidationErrors(error: ZodError<SignupInput>): FieldErrors {
  const fieldErrors: FieldErrors = {}

  const flattened = error.flatten()

  for (const [key, messages] of Object.entries(flattened.fieldErrors)) {
    if (messages?.length) {
      fieldErrors[key] = messages[0] ?? ""
    }
  }

  if (flattened.formErrors?.length) {
    fieldErrors._form = flattened.formErrors[0] ?? "Invalid submission"
  }

  return fieldErrors
}

export async function POST(req: Request) {
  let payload: unknown

  try {
    payload = await req.json()
  } catch {
    const body: SignupResponse = {
      success: false,
      message: "Invalid JSON payload",
    }

    return NextResponse.json(body, { status: 400 })
  }

  const parsed = signupSchema.safeParse(payload)

  if (!parsed.success) {
    const errors = buildValidationErrors(parsed.error)

    const body: SignupResponse = {
      success: false,
      message: "Please fix the highlighted fields",
      errors,
    }

    return NextResponse.json(body, { status: 422 })
  }

  const data = parsed.data as SignupInput & {
    privacyPolicyVersion?: string
    privacyPolicyAcceptedAt?: string
  }

  const { name, email, password, privacyPolicyVersion, privacyPolicyAcceptedAt } = data

  try {
    const headers = Object.fromEntries(req.headers.entries())

    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: `${appUrl}/verify-email`,
        // Store privacy policy acceptance in user table
        privacyPolicyAccepted: true,
        privacyPolicyVersion: privacyPolicyVersion ?? "1.0",
        privacyPolicyAcceptedAt: privacyPolicyAcceptedAt ?? new Date().toISOString(),
      } as typeof auth.api.signUpEmail extends (args: { body: infer B }) => unknown ? B : never,
      headers,
    })

    const body: SignupResponse = {
      success: true,
      message: "Account created. Check your email to verify before signing in.",
    }

    return NextResponse.json(body, { status: 201 })
  } catch (error) {
    console.error("Sign up failed", error)

    const message =
      error instanceof Error
        ? error.message || "Unable to create account"
        : "Unable to create account"

    const status =
      typeof error === "object" && error && "code" in error && error.code === "EMAIL_ALREADY_IN_USE"
        ? 409
        : 400

    const body: SignupResponse = {
      success: false,
      message,
      errors:
        typeof error === "object" && error && "code" in error && error.code === "EMAIL_ALREADY_IN_USE"
          ? { email: "Email is already registered" }
          : undefined,
    }

    return NextResponse.json(body, { status })
  }
}
