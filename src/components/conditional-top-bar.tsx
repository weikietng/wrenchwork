"use client"

import { usePathname } from "next/navigation"
import { TopBar } from "@/components/custom-ui/top-bar"
import { authClient } from "@/lib/auth-client"

export function ConditionalTopBar() {
  const pathname = usePathname()
  const { data: session } = authClient.useSession()
  const isLoggedIn = !!session?.user
  
  // Hide TopBar on /app routes or when logged in (covers 404 too)
  if (pathname.startsWith("/app") || isLoggedIn) {
    return null
  }
  
  return <TopBar />
}
