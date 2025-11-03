"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export function SidebarWrapper() {
  const params = useParams()
  const garageId = params?.garageId as string | undefined
  const [userRole, setUserRole] = useState<"owner" | "admin" | "mechanic" | "member" | undefined>()

  useEffect(() => {
    if (garageId) {
      // Fetch user role for this garage
      fetch(`/api/v1/garages/${garageId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.garage) {
            setUserRole(data.garage.userRole)
          }
        })
        .catch(console.error)
    }
  }, [garageId])

  return <DashboardSidebar userRole={userRole} />
}
