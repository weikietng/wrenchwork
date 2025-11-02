import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth"

type VerifyResponse =
  | { success: true; message: string }
  | { success: false; message: string }

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token")

  if (!token) {
    const body: VerifyResponse = {
      success: false,
      message: "Missing verification token.",
    }

    return NextResponse.json(body, { status: 400 })
  }

  try {
    await auth.api.verifyEmail({
      query: { token },
      headers: Object.fromEntries(req.headers),
    })

    const body: VerifyResponse = {
      success: true,
      message: "Email verified successfully. You can now sign in.",
    }

    return NextResponse.json(body, { status: 200 })
  } catch (error) {
    console.error("Verify email failed", error)

    const message =
      error instanceof Error
        ? error.message || "We couldn’t verify your email."
        : "We couldn’t verify your email."

    const body: VerifyResponse = {
      success: false,
      message,
    }

    return NextResponse.json(body, { status: 400 })
  }
}
