import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { sql, withRLS } from "@/lib/db"
import { updateGarageSchema } from "@/lib/validations/garage"
import { formatAddress } from "@/types/garage"
import { requireGaragePermission, validateGarageId } from "@/lib/garage-security"

// GET /api/v1/garages/[garageId] - Get specific garage details
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ garageId: string }> }
) {
  try {
    const { garageId } = await params
    
    // Validate garageId format to prevent SQL injection
    if (!validateGarageId(garageId)) {
      return NextResponse.json(
        { success: false, message: "Invalid garage ID format" },
        { status: 400 }
      )
    }

    const session = await auth.api.getSession({
      headers: req.headers,
    })

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }

    // RLS: Check if user has read permission (mechanics and above)
    try {
      await requireGaragePermission(session.user.id, garageId, "canRead")
    } catch (error) {
      const err = error as Error
      if (err.message === "GARAGE_NOT_FOUND") {
        return NextResponse.json(
          { success: false, message: "Garage not found or access denied" },
          { status: 404 }
        )
      }
      return NextResponse.json(
        { success: false, message: "Insufficient permissions" },
        { status: 403 }
      )
    }

    // Fetch garage with user's role (with RLS context)
    const garages = await withRLS(session.user.id, async () => {
      return await sql`
        SELECT 
          g.*,
          gm.role as "userRole"
        FROM garage g
        INNER JOIN garage_member gm ON g.id = gm."garageId"
        WHERE g.id = ${garageId} AND gm."userId" = ${session.user.id}
      `
    })

    return NextResponse.json({
      success: true,
      garage: garages[0],
    })
  } catch (error) {
    console.error("Error fetching garage:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("Error details:", errorMessage)
    return NextResponse.json(
      { success: false, message: "Failed to fetch garage", error: errorMessage },
      { status: 500 }
    )
  }
}

// PATCH /api/v1/garages/[garageId] - Update garage (admin/owner only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ garageId: string }> }
) {
  try {
    const { garageId } = await params
    
    // Validate garageId format to prevent SQL injection
    if (!validateGarageId(garageId)) {
      return NextResponse.json(
        { success: false, message: "Invalid garage ID format" },
        { status: 400 }
      )
    }

    const session = await auth.api.getSession({
      headers: req.headers,
    })

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }

    // RLS: Check if user has write permission (admin/owner only)
    try {
      await requireGaragePermission(session.user.id, garageId, "canManageSettings")
    } catch (error) {
      const err = error as Error
      if (err.message === "GARAGE_NOT_FOUND") {
        return NextResponse.json(
          { success: false, message: "Garage not found or access denied" },
          { status: 404 }
        )
      }
      return NextResponse.json(
        { success: false, message: "Only owners and admins can update garage settings" },
        { status: 403 }
      )
    }

    const body = await req.json()
    const validation = updateGarageSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const updates = validation.data

    // Check if there are any fields to update
    const hasUpdates = 
      updates.name !== undefined ||
      updates.email !== undefined ||
      (updates.phoneNumber && updates.phoneCountryCode) ||
      updates.address !== undefined ||
      updates.picture !== undefined

    if (!hasUpdates) {
      return NextResponse.json(
        { success: false, message: "No fields to update" },
        { status: 400 }
      )
    }

    // Add updatedAt timestamp
    const now = new Date().toISOString()

    // Build dynamic update query (with RLS context)
    const updatedGarage = await withRLS(session.user.id, async () => {
      // Since Neon doesn't support parameterized dynamic queries the same way,
      // we'll use individual updates with tagged template literals
      if (updates.name !== undefined) {
        await sql`UPDATE garage SET name = ${updates.name}, "updatedAt" = ${now} WHERE id = ${garageId}`
      }
      if (updates.email !== undefined) {
        await sql`UPDATE garage SET email = ${updates.email}, "updatedAt" = ${now} WHERE id = ${garageId}`
      }
      if (updates.phoneNumber && updates.phoneCountryCode) {
        await sql`
          UPDATE garage 
          SET "phoneNumber" = ${updates.phoneNumber}, 
              "phoneCountryCode" = ${updates.phoneCountryCode}, 
              "updatedAt" = ${now} 
          WHERE id = ${garageId}
        `
      }
      if (updates.address) {
        await sql`
          UPDATE garage 
          SET "addressLine1" = ${updates.address.addressLine1},
              "addressLine2" = ${updates.address.addressLine2 || null},
              city = ${updates.address.city || null},
              state = ${updates.address.state},
              country = ${updates.address.country},
              "postalCode" = ${updates.address.postalCode || null},
              "updatedAt" = ${now}
          WHERE id = ${garageId}
        `
      }
      if (updates.picture !== undefined) {
        await sql`UPDATE garage SET picture = ${updates.picture || null}, "updatedAt" = ${now} WHERE id = ${garageId}`
      }

      // Fetch updated garage
      const garages = await sql`
        SELECT * FROM garage WHERE id = ${garageId}
      `
      return garages[0]
    })

    return NextResponse.json({
      success: true,
      message: "Garage updated successfully",
      garage: updatedGarage,
    })
  } catch (error) {
    console.error("Error updating garage:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("Error details:", errorMessage)
    return NextResponse.json(
      { success: false, message: "Failed to update garage", error: errorMessage },
      { status: 500 }
    )
  }
}

// DELETE /api/v1/garages/[garageId] - Delete garage (owner only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ garageId: string }> }
) {
  try {
    const { garageId } = await params
    
    // Validate garageId format to prevent SQL injection
    if (!validateGarageId(garageId)) {
      return NextResponse.json(
        { success: false, message: "Invalid garage ID format" },
        { status: 400 }
      )
    }

    const session = await auth.api.getSession({
      headers: req.headers,
    })

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }

    // RLS: Check if user has delete permission (owner only)
    try {
      await requireGaragePermission(session.user.id, garageId, "canDelete")
    } catch (error) {
      const err = error as Error
      if (err.message === "GARAGE_NOT_FOUND") {
        return NextResponse.json(
          { success: false, message: "Garage not found or access denied" },
          { status: 404 }
        )
      }
      return NextResponse.json(
        { success: false, message: "Only the owner can delete the garage" },
        { status: 403 }
      )
    }

    // Delete garage (cascade will delete garage_member entries) (with RLS context)
    await withRLS(session.user.id, async () => {
      return await sql`
        DELETE FROM garage WHERE id = ${garageId}
      `
    })

    return NextResponse.json({
      success: true,
      message: "Garage deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting garage:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("Error details:", errorMessage)
    return NextResponse.json(
      { success: false, message: "Failed to delete garage", error: errorMessage },
      { status: 500 }
    )
  }
}
