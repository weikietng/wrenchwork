"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { ModeToggle } from "@/components/custom-ui/theme-changer"
import { Button } from "@/components/ui/button"

export function TopBar() {
  const pathname = usePathname()
  const hideAuthControls = pathname === "/login" || pathname === "/signup"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
          <Image
            src="/icon.png"
            alt="Wrenchwork logo"
            width={120}
            height={28}
            className="h-12 w-auto"
            priority
          />
          <h1 className="text-2xl font-bold text-primary">Wrenchwork</h1>
          <span className="sr-only">Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          {!hideAuthControls && (
            <Button asChild>
              <Link href="/login">Log In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
