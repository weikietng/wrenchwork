"use client"

import Link from "next/link"
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
import { AuthAvatar } from "@/components/custom-ui/auth-avatar"

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
      href: garageId ? `/dashboard/${garageId}` : "/dashboard",
    },
    {
      title: "Customers",
      icon: Users,
      href: garageId ? `/dashboard/${garageId}/customers` : "#",
    },
    {
      title: "Vehicles",
      icon: Car,
      href: garageId ? `/dashboard/${garageId}/vehicles` : "#",
    },
    {
      title: "Jobs",
      icon: Wrench,
      href: garageId ? `/dashboard/${garageId}/jobs` : "#",
    },
    {
      title: "Schedule",
      icon: Calendar,
      href: garageId ? `/dashboard/${garageId}/schedule` : "#",
    },
    {
      title: "Reports",
      icon: BarChart3,
      href: garageId ? `/dashboard/${garageId}/reports` : "#",
    },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b p-4">
        <Link href="/dashboard" className="text-lg font-semibold hover:text-primary">
          Wrenchwork
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
                    isActive={pathname === `/dashboard/${garageId}/settings`}
                  >
                    <Link href={`/dashboard/${garageId}/settings`}>
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

      <SidebarFooter className="border-t p-4">
        <AuthAvatar />
      </SidebarFooter>
    </Sidebar>
  )
}
