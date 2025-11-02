"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const token = searchParams.get("token")

    if (!token) {
      setStatus("error")
      setMessage("Missing verification token.")
      return
    }

    async function verifyEmail() {
      try {
        const response = await fetch(`/api/v1/auth/verify-email?token=${encodeURIComponent(token!)}`)
        const data = await response.json()

        if (data.success) {
          setStatus("success")
          setMessage(data.message || "Email verified successfully!")
        } else {
          setStatus("error")
          setMessage(data.message || "Verification failed.")
        }
      } catch {
        setStatus("error")
        setMessage("Something went wrong. Please try again.")
      }
    }

    verifyEmail()
  }, [searchParams])

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        {status === "loading" && (
          <>
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <h1 className="text-2xl font-bold">Verifying your email...</h1>
            <p className="text-muted-foreground">Please wait while we confirm your email address.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <svg
                className="h-8 w-8 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">Email verified!</h1>
            <p className="text-muted-foreground">{message}</p>
            <div className="flex flex-col gap-3">
              <Button asChild className="w-full">
                <Link href="/login">Sign in to your account</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">Go to homepage</Link>
              </Button>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
              <svg
                className="h-8 w-8 text-red-600 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">Verification failed</h1>
            <p className="text-muted-foreground">{message}</p>
            <div className="flex flex-col gap-3">
              <Button asChild className="w-full">
                <Link href="/signup">Create a new account</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">Go to homepage</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
