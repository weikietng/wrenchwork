"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

interface GarageLayoutProps {
  children: React.ReactNode
}

export default function GarageLayout({
  children,
}: GarageLayoutProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex min-h-screen w-full flex-1 flex-col">
        {children}
      </main>
    </SidebarProvider>
  )
}
