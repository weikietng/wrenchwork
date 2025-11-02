"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { AuthAvatar } from "@/components/custom-ui/auth-avatar"
import { ModeToggle } from "@/components/custom-ui/theme-changer"
import { authClient } from "@/lib/auth-client"

export function TopBar() {
  const pathname = usePathname()
  const hideAuthControls = pathname === "/login" || pathname === "/signup"
  const { data: session } = authClient.useSession()
  const isLoggedIn = !!session?.user

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4">
        <Link href={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2 font-semibold text-foreground">
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
          {!hideAuthControls ? <AuthAvatar /> : null}
        </div>
      </div>
    </header>
  )
}
