"use client"

import Link from "next/link"
import Image from "next/image"
import { ModeToggle } from "@/components/custom-ui/theme-changer"

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
          <Image
            src="/wrenchwork.png"
            alt="Wrenchwork logo"
            width={120}
            height={28}
            className="h-15 w-auto"
            priority
          />
          <span className="sr-only">Home</span>
        </Link>
        <ModeToggle />
      </div>
    </header>
  )
}
