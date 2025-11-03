import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { sql, withRLS, withRLSTransaction } from "@/lib/db"
import { createGarageSchema } from "@/lib/validations/garage"
import { formatAddress } from "@/types/garage"

// GET /api/v1/garages - Get all garages user has access to
export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    })

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }

    // Get all garages the user is a member of (with RLS context)
    const garages = await withRLS(session.user.id, async () => {
      return await sql`
        SELECT 
          g.*,
          gm.role as "userRole"
        FROM garage g
        INNER JOIN garage_member gm ON g.id = gm."garageId"
        WHERE gm."userId" = ${session.user.id}
        ORDER BY g."createdAt" DESC
      `
    })

    return NextResponse.json({
      success: true,
      garages,
    })
  } catch (error) {
    console.error("Error fetching garages:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("Error details:", errorMessage)
    return NextResponse.json(
      { success: false, message: "Failed to fetch garages", error: errorMessage },
      { status: 500 }
    )
  }
}

// POST /api/v1/garages - Create a new garage
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    })

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const result = createGarageSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: result.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, phoneNumber, phoneCountryCode, address, picture } = result.data

    const garageId = crypto.randomUUID()
    const memberId = crypto.randomUUID()
    const now = new Date().toISOString()

    // Create garage and add owner as member in a transaction (with RLS context)
    const garage = await withRLSTransaction(session.user.id, async () => {
      // Insert garage
      await sql`
        INSERT INTO garage (
          id, name, picture, email, 
          "addressLine1", "addressLine2", city, state, country, "postalCode",
          "phoneNumber", "phoneCountryCode", 
          "ownerId", "createdAt", "updatedAt"
        ) VALUES (
          ${garageId},
          ${name},
          ${picture || null},
          ${email},
          ${address.addressLine1},
          ${address.addressLine2 || null},
          ${address.city || null},
          ${address.state},
          ${address.country},
          ${address.postalCode || null},
          ${phoneNumber},
          ${phoneCountryCode},
          ${session.user.id},
          ${now},
          ${now}
        )
      `

      // Add owner as garage member with 'owner' role
      await sql`
        INSERT INTO garage_member (
          id, "garageId", "userId", role, "createdAt", "updatedAt"
        ) VALUES (
          ${memberId},
          ${garageId},
          ${session.user.id},
          'owner',
          ${now},
          ${now}
        )
      `

      // Fetch the created garage with role
      const garages = await sql`
        SELECT 
          g.*,
          gm.role as "userRole"
        FROM garage g
        INNER JOIN garage_member gm ON g.id = gm."garageId"
        WHERE g.id = ${garageId} AND gm."userId" = ${session.user.id}
      `

      return garages[0]
    })

    return NextResponse.json({
      success: true,
      message: "Garage created successfully",
      garage,
    })
  } catch (error) {
    console.error("Error creating garage:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("Error details:", errorMessage)
    return NextResponse.json(
      { success: false, message: "Failed to create garage", error: errorMessage },
      { status: 500 }
    )
  }
}
