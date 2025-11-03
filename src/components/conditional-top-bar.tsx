"use client"

import { usePathname } from "next/navigation"
import { TopBar } from "@/components/custom-ui/top-bar"
import { useEffect, useState } from "react"

export function ConditionalTopBar() {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const hideByOverride = typeof document !== "undefined" && document.body.classList.contains("hide-topbar")
  useEffect(() => setMounted(true), [])
  
  // Avoid SSR flicker: don't render until mounted
  if (!mounted) return null

  // Hide TopBar on /app routes or when explicitly overridden (e.g., 404)
  if (pathname?.startsWith("/app") || pathname?.includes("/app/") || hideByOverride) {
    return null
  }
  
  return <TopBar />
}
