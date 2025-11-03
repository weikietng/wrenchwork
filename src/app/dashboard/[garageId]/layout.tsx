import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { sql, withRLS } from "@/lib/db"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
  params: Promise<{ garageId: string }>
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { garageId } = await params
  const headersList = await headers()

  const session = await auth.api.getSession({
    headers: headersList,
  })

  if (!session?.user) {
    redirect("/login")
  }

  // Check if user has access to this garage (with RLS context)
  const members = await withRLS(session.user.id, async () => {
    return await sql`
      SELECT role FROM garage_member
      WHERE "garageId" = ${garageId} AND "userId" = ${session.user.id}
    `
  })
  const member = members[0]

  if (!member) {
    redirect("/dashboard")
  }

  return (
    <SidebarProvider>
      <DashboardSidebar userRole={member.role} />
      <main className="flex min-h-screen w-full flex-1 flex-col">
        {children}
      </main>
    </SidebarProvider>
  )
}
