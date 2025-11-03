"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, LogOut, Settings, UserRound, ChevronUp } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"

export function SidebarUserMenu() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const { data: session, isPending } = authClient.useSession()
  const user = session?.user ?? null

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

  if (!user) {
    return null
  }

  return (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg border bg-card p-2 text-left transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:border-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:hover:bg-transparent"
        >
          <div className="flex size-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-background text-muted-foreground">
            {isPending ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : user.image ? (
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
            )}
          </div>
          <div className="flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-medium leading-none">
              {user.name ?? user.email ?? "User"}
            </p>
            {user.email && user.name && (
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            )}
          </div>
          <ChevronUp className="size-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="top" className="w-60">
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
          <Link href="/app/account" className="flex items-center gap-2">
            <Settings className="size-4" aria-hidden="true" />
            <span>Account Settings</span>
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
  )
}
