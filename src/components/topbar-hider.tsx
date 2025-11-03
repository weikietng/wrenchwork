"use client"

import { useEffect } from "react"

export function TopBarHider() {
  useEffect(() => {
    document.body.classList.add("hide-topbar")
    return () => {
      document.body.classList.remove("hide-topbar")
    }
  }, [])

  return null
}
