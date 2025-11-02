import type { Session, User } from "better-auth/types"

declare module "better-auth/types" {
  interface User {
    privacyPolicyAccepted: boolean
    privacyPolicyVersion?: string
    privacyPolicyAcceptedAt?: string
  }
}
