import { z } from "zod"

const emailString = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email address")
  .transform((value) => value.toLowerCase())

export const signupSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    email: emailString,
    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm your password"),
    acceptedPrivacyPolicy: z
      .boolean()
      .refine((val) => val === true, {
        message: "You must accept the Privacy Policy",
      }),
    privacyPolicyVersion: z.string().optional(),
    privacyPolicyAcceptedAt: z.string().optional(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords must match",
      })
    }

    if (!/[A-Z]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Include at least one uppercase letter",
      })
    }

    if (!/[a-z]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Include at least one lowercase letter",
      })
    }

    if (!/[0-9]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Include at least one number",
      })
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Include at least one symbol",
      })
    }
  })

export type SignupInput = z.infer<typeof signupSchema>

export const resendVerificationSchema = z.object({
  email: emailString,
})

export type ResendVerificationInput = z.infer<typeof resendVerificationSchema>
