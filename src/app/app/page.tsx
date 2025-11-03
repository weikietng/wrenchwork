import { headers } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"

import { auth } from "@/lib/auth"
import { sql, withRLS } from "@/lib/db"
import { Button } from "@/components/ui/button"

export default async function AppPage() {
  const headersList = await headers()
  const session = await auth.api.getSession({
    headers: headersList,
  })

  // Layout already handles auth, so we know user is logged in here
  if (!session?.user) {
    redirect("/login")
  }

  // Get user's garages (with RLS context)
  const garages = await withRLS(session.user.id, async () => {
    return await sql`
      SELECT 
        g.*,
        gm.role as "userRole"
      FROM garage g
      INNER JOIN garage_member gm ON g.id = gm."garageId"
      WHERE gm."userId" = ${session.user.id}
      ORDER BY g."createdAt" DESC
      LIMIT 1
    `
  })

  // If user has garages, redirect to the first one
  if (garages.length > 0) {
    redirect(`/app/${garages[0].id}/dashboard`)
  }

  // No garages - show onboarding
  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md space-y-6 text-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome to Wrenchwork</h1>
          <p className="mt-2 text-muted-foreground">
            Get started by creating your first garage
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <svg
            className="mx-auto h-16 w-16 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <h2 className="mt-4 text-xl font-semibold">Create Your Garage</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Set up your garage profile to start managing customers, vehicles, and jobs
          </p>
        </div>

        <Button asChild size="lg" className="w-full">
          <Link href="/garages/create">Create Garage</Link>
        </Button>
      </div>
    </div>
  )
}
