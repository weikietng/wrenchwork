"use client"

import { usePathname } from "next/navigation"
import { TopBar } from "@/components/custom-ui/top-bar"

export function ConditionalTopBar() {
  const pathname = usePathname()
  const hideByOverride = typeof document !== "undefined" && document.body.classList.contains("hide-topbar")
  
  // Hide TopBar on /app routes or when explicitly overridden (e.g., 404)
  if (pathname.startsWith("/app") || hideByOverride) {
    return null
  }
  
  return <TopBar />
}
