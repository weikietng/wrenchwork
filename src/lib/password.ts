import { passwordStrength, type Result as PasswordStrengthResult } from "check-password-strength"

const strengthOptions = [
  {
    id: 0,
    value: "Too weak",
    minDiversity: 0,
    minLength: 0,
  },
  {
    id: 1,
    value: "Weak",
    minDiversity: 2,
    minLength: 8,
  },
  {
    id: 2,
    value: "Good",
    minDiversity: 3,
    minLength: 10,
  },
  {
    id: 3,
    value: "Strong",
    minDiversity: 4,
    minLength: 12,
  },
]

export const passwordRequirements = [
  {
    key: "length",
    label: "At least 8 characters",
    test: (password: string) => password.length >= 8,
  },
  {
    key: "upper",
    label: "At least one uppercase letter",
    test: (password: string) => /[A-Z]/.test(password),
  },
  {
    key: "lower",
    label: "At least one lowercase letter",
    test: (password: string) => /[a-z]/.test(password),
  },
  {
    key: "number",
    label: "At least one number",
    test: (password: string) => /[0-9]/.test(password),
  },
  {
    key: "symbol",
    label: "At least one symbol",
    test: (password: string) => /[^A-Za-z0-9]/.test(password),
  },
] as const

export function analyzePassword(password: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const strength = passwordStrength(password, strengthOptions as any)

  const requirements = passwordRequirements.map((requirement) => ({
    key: requirement.key,
    label: requirement.label,
    satisfied: requirement.test(password),
  }))

  const isValid = requirements.every((item) => item.satisfied)

  return {
    strength,
    requirements,
    isValid,
  }
}

export type PasswordAnalysis = ReturnType<typeof analyzePassword>
export type PasswordStrength = PasswordStrengthResult<typeof strengthOptions>
