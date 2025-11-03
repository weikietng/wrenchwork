"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Check, ChevronsUpDown, Plus, Building2 } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import type { GarageWithRole } from "@/types/garage"

interface GarageSwitcherProps {
  className?: string
}

export function GarageSwitcher({ className }: GarageSwitcherProps) {
  const router = useRouter()
  const params = useParams()
  const garageId = params?.garageId as string | undefined

  const [open, setOpen] = useState(false)
  const [garages, setGarages] = useState<GarageWithRole[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedGarage, setSelectedGarage] = useState<GarageWithRole | null>(null)

  useEffect(() => {
    fetchGarages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (garageId && garages.length > 0) {
      const garage = garages.find((g) => g.id === garageId)
      if (garage) {
        setSelectedGarage(garage)
      }
    } else if (garages.length > 0 && !selectedGarage) {
      // Default to first garage
      setSelectedGarage(garages[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [garageId, garages])

  async function fetchGarages() {
    try {
      const response = await fetch("/api/v1/garages")
      
      // Handle 401 - Redirect to login
      if (response.status === 401) {
        router.push("/login?error=session_expired")
        return
      }

      // Handle 403 - Access denied
      if (response.status === 403) {
        console.error("Access denied to garages")
        setLoading(false)
        return
      }

      const data = await response.json()

      if (data.success) {
        setGarages(data.garages)
      } else {
        console.error("Failed to fetch garages:", data.message)
        // Show error to user if needed
        if (data.error) {
          console.error("Error details:", data.error)
        }
      }
    } catch (error) {
      console.error("Failed to fetch garages:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      console.error("Error details:", errorMessage)
    } finally {
      setLoading(false)
    }
  }

  function handleGarageSelect(garage: GarageWithRole) {
    setSelectedGarage(garage)
    setOpen(false)
    router.push(`/app/${garage.id}/dashboard`)
  }

  function handleCreateGarage() {
    setOpen(false)
    router.push("/garages/create")
  }

  if (loading) {
    return (
      <div className={cn("px-2", className)}>
        <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
      </div>
    )
  }

  if (garages.length === 0) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={handleCreateGarage}>
            <Plus />
            <span>Create Garage</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <SidebarMenuButton
              role="combobox"
              aria-expanded={open}
              className="w-full"
              size="lg"
            >
              {selectedGarage?.picture ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selectedGarage.picture}
                  alt={selectedGarage.name}
                  className="h-8 w-8 shrink-0 rounded object-cover"
                />
              ) : (
                <Building2 className="h-8 w-8" />
              )}
              <span>{selectedGarage?.name || "Select garage"}</span>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <div className="max-h-[300px] overflow-y-auto">
            {garages.map((garage) => (
              <button
                key={garage.id}
                onClick={() => handleGarageSelect(garage)}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent",
                  selectedGarage?.id === garage.id && "bg-accent"
                )}
              >
                <Check
                  className={cn(
                    "h-4 w-4 shrink-0",
                    selectedGarage?.id === garage.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {garage.picture ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={garage.picture}
                    alt={garage.name}
                    className="h-8 w-8 shrink-0 rounded object-cover"
                  />
                ) : (
                  <Building2 className="h-8 w-8 shrink-0 text-muted-foreground" />
                )}
                <div className="flex flex-1 flex-col items-start">
                  <span className="font-medium">{garage.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">
                    {garage.userRole}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div className="border-t p-1">
            <button
              onClick={handleCreateGarage}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
            >
              <Plus className="h-4 w-4" />
              Create New Garage
            </button>
          </div>
          </PopoverContent>
        </Popover>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
