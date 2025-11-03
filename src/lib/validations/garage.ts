import { z } from "zod"
import { isValidPhoneNumber } from "libphonenumber-js"

export const garageAddressSchema = z.object({
  addressLine1: z.string().min(1, "Address line 1 is required").max(200, "Address line 1 is too long"),
  addressLine2: z.string().max(200, "Address line 2 is too long").optional().nullable(),
  city: z.string().max(100, "City name is too long").optional().nullable(),
  state: z.string().min(1, "State/Province is required").max(100, "State name is too long"),
  country: z.string().min(2, "Country is required").max(2, "Country code must be 2 characters (ISO 3166-1 alpha-2)"),
  postalCode: z.string().max(20, "Postal code is too long").optional().nullable(),
})

export const createGarageSchema = z.object({
  name: z.string().min(1, "Garage name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address").max(255, "Email is too long"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  phoneCountryCode: z.string().min(1, "Country code is required"),
  address: garageAddressSchema,
  picture: z.string().optional(), // Base64 encoded image
}).refine((data) => {
  // Validate phone number with country code
  try {
    const fullNumber = `${data.phoneCountryCode}${data.phoneNumber}`
    return isValidPhoneNumber(fullNumber)
  } catch {
    return false
  }
}, {
  message: "Invalid phone number for the selected country",
  path: ["phoneNumber"],
})

export const updateGarageSchema = z.object({
  name: z.string().min(1, "Garage name is required").max(100, "Name is too long").optional(),
  email: z.string().email("Invalid email address").max(255, "Email is too long").optional(),
  phoneNumber: z.string().min(1, "Phone number is required").optional(),
  phoneCountryCode: z.string().min(1, "Country code is required").optional(),
  address: garageAddressSchema.optional(),
  picture: z.string().optional(),
}).refine((data) => {
  // Validate phone number if both fields are provided
  if (data.phoneNumber && data.phoneCountryCode) {
    try {
      const fullNumber = `${data.phoneCountryCode}${data.phoneNumber}`
      return isValidPhoneNumber(fullNumber)
    } catch {
      return false
    }
  }
  return true
}, {
  message: "Invalid phone number for the selected country",
  path: ["phoneNumber"],
})

export type CreateGarageInput = z.infer<typeof createGarageSchema>
export type UpdateGarageInput = z.infer<typeof updateGarageSchema>
