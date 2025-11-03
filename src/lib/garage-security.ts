import { sql } from "@/lib/db"

export type GarageRole = "owner" | "admin" | "mechanic" | "member"

export interface GaragePermissions {
  canRead: boolean
  canWrite: boolean
  canDelete: boolean
  canManageMembers: boolean
  canManageSettings: boolean
}

/**
 * Get user's role and permissions for a specific garage
 * Implements Row-Level Security (RLS)
 */
export async function getUserGarageAccess(
  userId: string,
  garageId: string
): Promise<{ role: GarageRole; permissions: GaragePermissions } | null> {
  const members = await sql`
    SELECT role FROM garage_member
    WHERE "garageId" = ${garageId} AND "userId" = ${userId}
  `
  const member = members[0] as { role: GarageRole } | undefined

  if (!member) {
    return null
  }

  const permissions = getPermissionsForRole(member.role)

  return {
    role: member.role,
    permissions,
  }
}

/**
 * Define permissions for each role
 */
function getPermissionsForRole(role: GarageRole): GaragePermissions {
  switch (role) {
    case "owner":
      return {
        canRead: true,
        canWrite: true,
        canDelete: true,
        canManageMembers: true,
        canManageSettings: true,
      }
    case "admin":
      return {
        canRead: true,
        canWrite: true,
        canDelete: false, // Only owner can delete
        canManageMembers: true,
        canManageSettings: true,
      }
    case "mechanic":
      return {
        canRead: true,
        canWrite: false, // Can't modify garage settings
        canDelete: false,
        canManageMembers: false,
        canManageSettings: false,
      }
    case "member":
      return {
        canRead: false, // Members have limited read access
        canWrite: false,
        canDelete: false,
        canManageMembers: false,
        canManageSettings: false,
      }
    default:
      return {
        canRead: false,
        canWrite: false,
        canDelete: false,
        canManageMembers: false,
        canManageSettings: false,
      }
  }
}

/**
 * Check if user has specific permission for a garage
 * Throws error if access is denied
 */
export async function requireGaragePermission(
  userId: string,
  garageId: string,
  permission: keyof GaragePermissions
): Promise<GarageRole> {
  const access = await getUserGarageAccess(userId, garageId)

  if (!access) {
    throw new Error("GARAGE_NOT_FOUND")
  }

  if (!access.permissions[permission]) {
    throw new Error("INSUFFICIENT_PERMISSIONS")
  }

  return access.role
}

/**
 * Check if user has any of the specified roles
 */
export async function requireGarageRole(
  userId: string,
  garageId: string,
  allowedRoles: GarageRole[]
): Promise<GarageRole> {
  const access = await getUserGarageAccess(userId, garageId)

  if (!access) {
    throw new Error("GARAGE_NOT_FOUND")
  }

  if (!allowedRoles.includes(access.role)) {
    throw new Error("INSUFFICIENT_PERMISSIONS")
  }

  return access.role
}

/**
 * Validate that garageId is a valid UUID format
 * Prevents SQL injection through garageId parameter
 */
export function validateGarageId(garageId: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(garageId)
}
