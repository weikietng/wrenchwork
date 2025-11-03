"use client"

import Link from "next/link"
import Image from "next/image"
import { useParams, usePathname } from "next/navigation"
import {
  Home,
  Users,
  Car,
  Wrench,
  Calendar,
  Settings,
  BarChart3,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { GarageSwitcher } from "@/components/garage-switcher"
import { SidebarUserMenu } from "@/components/sidebar-user-menu"
import { ModeToggle } from "@/components/custom-ui/theme-changer"

interface DashboardSidebarProps {
  userRole?: "owner" | "admin" | "mechanic" | "member"
}

export function DashboardSidebar({ userRole }: DashboardSidebarProps) {
  const params = useParams()
  const pathname = usePathname()
  const garageId = params?.garageId as string | undefined

  const isAdminOrOwner = userRole === "owner" || userRole === "admin"

  const navItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: garageId ? `/app/${garageId}/dashboard` : "/app",
    },
    {
      title: "Customers",
      icon: Users,
      href: garageId ? `/app/${garageId}/customers` : "#",
    },
    {
      title: "Vehicles",
      icon: Car,
      href: garageId ? `/app/${garageId}/vehicles` : "#",
    },
    {
      title: "Jobs",
      icon: Wrench,
      href: garageId ? `/app/${garageId}/jobs` : "#",
    },
    {
      title: "Schedule",
      icon: Calendar,
      href: garageId ? `/app/${garageId}/schedule` : "#",
    },
    {
      title: "Reports",
      icon: BarChart3,
      href: garageId ? `/app/${garageId}/reports` : "#",
    },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b p-4">
        <Link href="/app" className="flex items-center gap-2 hover:opacity-80 group-data-[collapsible=icon]:justify-center">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center">
            <Image
              src="/icon.png"
              alt="Wrenchwork"
              width={32}
              height={32}
              className="h-full w-full object-contain"
            />
          </div>
          <span className="text-lg font-semibold text-primary group-data-[collapsible=icon]:hidden">
            Wrenchwork
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Garage</SidebarGroupLabel>
          <SidebarGroupContent>
            <GarageSwitcher />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdminOrOwner && garageId && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === `/app/${garageId}/settings`}
                  >
                    <Link href={`/app/${garageId}/settings`}>
                      <Settings className="h-4 w-4" />
                      <span>Garage Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t p-3">
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <div className="flex-1 min-w-0 group-data-[collapsible=icon]:flex-none">
            <SidebarUserMenu />
          </div>
          <div className="flex-shrink-0 group-data-[collapsible=icon]:hidden">
            <ModeToggle />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
