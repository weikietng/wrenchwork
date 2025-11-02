"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, LogOut, Settings, UserRound } from "lucide-react"

import { LoginForm } from "@/components/login-form"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"

export function AuthAvatar() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [loginOpen, setLoginOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const { data: session, isPending } = authClient.useSession()
  const user = session?.user ?? null

  useEffect(() => {
    if (user) {
      setLoginOpen(false)
    }
  }, [user])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!loginOpen) return
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setLoginOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [loginOpen])

  const initials = (user?.name?.trim()?.[0] ?? user?.email?.trim()?.[0] ?? "").toUpperCase()

  async function handleSignOut() {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login")
          },
        },
      })
    } finally {
      setMenuOpen(false)
      router.refresh()
    }
  }

  const avatarButton = (
    <button
      type="button"
      className="flex size-9 items-center justify-center overflow-hidden rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {isPending ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      ) : user ? (
        user.image ? (
          <Image
            src={user.image}
            alt={user.name ?? user.email ?? "Account"}
            width={36}
            height={36}
            className="size-full object-cover"
          />
        ) : initials ? (
          <span className="text-sm font-semibold uppercase text-foreground">{initials}</span>
        ) : (
          <UserRound className="size-5" aria-hidden="true" />
        )
      ) : (
        <UserRound className="size-5" aria-hidden="true" />
      )}
    </button>
  )

  return (
    <div className="relative" ref={containerRef}>
      {user ? (
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>{avatarButton}</DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.name ?? user.email ?? "Signed in"}
                </p>
                {user.email ? (
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                ) : null}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center gap-2">
                <Settings className="size-4" aria-hidden="true" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault()
                void handleSignOut()
              }}
              className="text-destructive focus:text-destructive"
            >
              <LogOut className="size-4" aria-hidden="true" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setLoginOpen((prev) => !prev)}
            className="flex size-9 items-center justify-center overflow-hidden rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <UserRound className="size-5" aria-hidden="true" />
            )}
          </button>
          {loginOpen ? (
            <div className="absolute right-0 z-50 mt-3 w-80 animate-in fade-in-0 zoom-in-95 rounded-lg border bg-popover p-2 shadow-lg">
              <LoginForm
                className="w-full"
                onSuccess={() => {
                  setLoginOpen(false)
                  router.refresh()
                }}
              />
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}
