import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SidebarWrapper } from "@/components/sidebar-wrapper"
import { TopBarHider } from "@/components/topbar-hider"

interface AppLayoutProps {
  children: React.ReactNode
}

export default async function AppLayout({
  children,
}: AppLayoutProps) {
  const headersList = await headers()

  const session = await auth.api.getSession({
    headers: headersList,
  })

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <SidebarProvider>
      <TopBarHider />
      <SidebarWrapper />
      <main className="flex min-h-screen w-full flex-1 flex-col">
        {children}
      </main>
    </SidebarProvider>
  )
}
