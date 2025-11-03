import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { sql, withRLS } from "@/lib/db"
import { redirect } from "next/navigation"
import type { Garage } from "@/types/garage"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

interface DashboardPageProps {
  params: Promise<{ garageId: string }>
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { garageId } = await params
  const headersList = await headers()

  const session = await auth.api.getSession({
    headers: headersList,
  })

  if (!session?.user) {
    redirect("/login")
  }

  // Fetch garage details (with RLS context)
  const garages = await withRLS(session.user.id, async () => {
    return await sql`
      SELECT g.* FROM garage g
      INNER JOIN garage_member gm ON g.id = gm."garageId"
      WHERE g.id = ${garageId} AND gm."userId" = ${session.user.id}
    `
  })
  const garage = garages[0] as Garage

  if (!garage) {
    redirect("/dashboard")
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">{garage.name}</h1>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <p className="text-muted-foreground">Welcome to your garage dashboard</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Total Customers</h3>
            <p className="mt-2 text-3xl font-bold">0</p>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Active Jobs</h3>
            <p className="mt-2 text-3xl font-bold">0</p>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Vehicles</h3>
            <p className="mt-2 text-3xl font-bold">0</p>
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold">Getting Started</h2>
          <p className="mt-2 text-muted-foreground">
            Your garage is set up! Start by adding customers and vehicles to begin managing your operations.
          </p>
        </div>
      </div>
    </>
  )
}
