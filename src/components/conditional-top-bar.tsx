"use client"

import { usePathname } from "next/navigation"
import { TopBar } from "@/components/custom-ui/top-bar"

export function ConditionalTopBar() {
  const pathname = usePathname()
  
  // Hide TopBar on /app routes
  if (pathname.startsWith("/app")) {
    return null
  }
  
  return <TopBar />
}
