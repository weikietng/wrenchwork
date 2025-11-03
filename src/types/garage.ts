export interface Garage {
  id: string
  name: string
  picture: string | null
  email: string
  addressLine1: string
  addressLine2: string | null
  city: string | null
  state: string
  country: string
  postalCode: string | null
  phoneNumber: string
  phoneCountryCode: string
  ownerId: string
  createdAt: Date
  updatedAt: Date
}

export interface GarageMember {
  id: string
  garageId: string
  userId: string
  role: "owner" | "admin" | "mechanic" | "member"
  createdAt: Date
  updatedAt: Date
}

export interface GarageWithRole extends Garage {
  userRole: "owner" | "admin" | "mechanic" | "member"
}

export interface GarageAddress {
  addressLine1: string
  addressLine2?: string | null
  city?: string | null
  state: string
  postalCode?: string | null
  country: string
}

export function formatAddress(garage: Garage): string {
  const parts = [
    garage.addressLine1,
    garage.addressLine2,
    garage.city,
    garage.state,
    garage.postalCode,
    garage.country,
  ].filter(Boolean)
  
  return parts.join(", ")
}

export function formatPhoneNumber(garage: Garage): string {
  return `${garage.phoneCountryCode} ${garage.phoneNumber}`
}
