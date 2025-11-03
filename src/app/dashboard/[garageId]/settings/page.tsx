"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Upload, X } from "lucide-react"
import { isValidPhoneNumber, getCountries, getCountryCallingCode } from "libphonenumber-js"
import { GarageSkeleton } from "@/components/garage-skeleton"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { PhoneInputComponent } from "@/components/ui/phone-input"
import { AddressForm, type AddressFormData } from "@/components/ui/address-form"
import { cn } from "@/lib/utils"
import type { GarageWithRole } from "@/types/garage"

type FieldErrors = Record<string, string | undefined>

// Helper to convert phone country code (+353) to country ISO code (IE)
const getCountryCodeFromCallingCode = (callingCode: string): string => {
  const cleanCode = callingCode.replace("+", "")
  const countries = getCountries()
  
  for (const country of countries) {
    try {
      const countryCallingCode = getCountryCallingCode(country as Parameters<typeof getCountryCallingCode>[0])
      if (countryCallingCode === cleanCode) {
        return country
      }
    } catch {
      continue
    }
  }
  
  return "US" // Default fallback
}

export default function GarageSettingsPage() {
  const params = useParams()
  const router = useRouter()
  const garageId = params?.garageId as string

  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formMessage, setFormMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  const [garage, setGarage] = useState<GarageWithRole | null>(null)
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
  })

  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [phoneCountryCode, setPhoneCountryCode] = useState<string>("+1")
  const [address, setAddress] = useState<AddressFormData>({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  })

  const [picture, setPicture] = useState<string | null>(null)
  const [picturePreview, setPicturePreview] = useState<string | null>(null)

  useEffect(() => {
    fetchGarage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [garageId])

  async function fetchGarage() {
    try {
      const response = await fetch(`/api/v1/garages/${garageId}`)
      
      // Handle 401 - Redirect to login
      if (response.status === 401) {
        router.push("/login?error=session_expired")
        return
      }

      // Handle 403 - Access denied
      if (response.status === 403) {
        setFormMessage({
          type: "error",
          text: "You don't have permission to access this garage's settings",
        })
        setLoading(false)
        return
      }

      // Handle 404 - Not found
      if (response.status === 404) {
        setFormMessage({
          type: "error",
          text: "Garage not found or you don't have access to it",
        })
        setLoading(false)
        return
      }

      const data = await response.json()

      if (data.success) {
        const garageData = data.garage
        setGarage(garageData)

        // Set phone number and country code separately
        setPhoneNumber(garageData.phoneNumber || "")
        setPhoneCountryCode(garageData.phoneCountryCode || "+1")

        // Set address data
        setAddress({
          addressLine1: garageData.addressLine1 || "",
          addressLine2: garageData.addressLine2 || "",
          city: garageData.city || "",
          state: garageData.state || "",
          country: garageData.country || "",
          postalCode: garageData.postalCode || "",
        })

        setFormValues({
          name: garageData.name,
          email: garageData.email,
        })

        if (garageData.picture) {
          setPicture(garageData.picture)
          setPicturePreview(garageData.picture)
        }
      } else {
        const errorMessage = data.error 
          ? `${data.message}: ${data.error}` 
          : data.message || "Failed to load garage details"
        setFormMessage({
          type: "error",
          text: errorMessage,
        })
      }
    } catch (error) {
      console.error("Failed to fetch garage:", error)
      const errorMessage = error instanceof Error 
        ? `Network error: ${error.message}` 
        : "Failed to load garage details"
      setFormMessage({
        type: "error",
        text: errorMessage,
      })
    } finally {
      setLoading(false)
    }
  }

  const validateField = (name: string, value: string) => {
    try {
      if (name === "name") {
        if (!value || value.trim().length === 0) {
          setFieldErrors(prev => ({ ...prev, name: "Garage name is required" }))
        } else if (value.length > 100) {
          setFieldErrors(prev => ({ ...prev, name: "Name is too long (max 100 characters)" }))
        } else {
          setFieldErrors(prev => ({ ...prev, name: undefined }))
        }
      } else if (name === "email") {
        if (!value || value.trim().length === 0) {
          setFieldErrors(prev => ({ ...prev, email: "Email is required" }))
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setFieldErrors(prev => ({ ...prev, email: "Invalid email address" }))
        } else {
          setFieldErrors(prev => ({ ...prev, email: undefined }))
        }
      }
    } catch {
      // Ignore validation errors during typing
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setFormMessage({
        type: "error",
        text: "Image size must be less than 5MB",
      })
      return
    }

    if (!file.type.startsWith("image/")) {
      setFormMessage({
        type: "error",
        text: "Please upload a valid image file",
      })
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setPicture(base64String)
      setPicturePreview(base64String)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setPicture(null)
    setPicturePreview(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFieldErrors({})
    setFormMessage(null)

    try {
      // Phone number and country code are already separate
      // No parsing needed!

      const response = await fetch(`/api/v1/garages/${garageId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formValues.name,
          email: formValues.email,
          phoneCountryCode,
          phoneNumber,
          address: {
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2 || null,
            city: address.city || null,
            state: address.state,
            country: address.country,
            postalCode: address.postalCode || null,
          },
          picture,
        }),
      })

      // Handle 401 - Redirect to login
      if (response.status === 401) {
        router.push("/login?error=session_expired")
        return
      }

      // Handle 403 - Access denied
      if (response.status === 403) {
        setFormMessage({
          type: "error",
          text: "You don't have permission to update this garage",
        })
        return
      }

      const data = await response.json()

      if (!response.ok) {
        setFieldErrors(data.errors ?? {})
        const errorMessage = data.error 
          ? `${data.message}: ${data.error}` 
          : data.message || "Failed to update garage"
        setFormMessage({ type: "error", text: errorMessage })
        return
      }

      setFormMessage({ type: "success", text: data.message })
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: "smooth" })
      
      // Refresh the page data
      setTimeout(() => {
        router.refresh()
      }, 1000)
    } catch (error) {
      console.error("Failed to update garage:", error)
      const errorMessage = error instanceof Error 
        ? `Network error: ${error.message}` 
        : "Failed to update garage. Please try again."
      setFormMessage({
        type: "error",
        text: errorMessage,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <GarageSkeleton />
  }

  if (!garage || (garage.userRole !== "owner" && garage.userRole !== "admin")) {
    return (
      <div className="container mx-auto p-6">
        <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-6 text-center">
          <h2 className="text-xl font-semibold text-destructive">Access Denied</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            You don&apos;t have permission to access garage settings.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div>
          <h1 className="text-lg font-semibold">Garage Settings</h1>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="mx-auto w-full max-w-4xl space-y-6">
          <p className="text-muted-foreground">
            Manage your garage information and preferences
          </p>

          {formMessage && (
            <div
              className={cn(
                "rounded-lg border p-4 text-sm",
                formMessage.type === "success"
                  ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-600"
                  : "border-destructive/40 bg-destructive/5 text-destructive"
              )}
            >
              {formMessage.text}
            </div>
          )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Garage Picture */}
          <Field>
            <FieldLabel>Garage Picture</FieldLabel>
            <FieldContent>
              <div className="flex items-center gap-4">
                {picturePreview ? (
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={picturePreview}
                      alt="Garage preview"
                      className="h-24 w-24 rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
                <div className="text-sm text-muted-foreground">
                  <p>Upload a logo or picture for your garage</p>
                  <p className="text-xs">Max size: 5MB</p>
                </div>
              </div>
            </FieldContent>
          </Field>

          {/* Garage Name */}
          <Field data-invalid={Boolean(fieldErrors.name)}>
            <FieldLabel htmlFor="name">Garage Name</FieldLabel>
            <FieldContent>
              <Input
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                required
              />
              <FieldError
                errors={fieldErrors.name ? [{ message: fieldErrors.name }] : undefined}
              />
            </FieldContent>
          </Field>

          {/* Email */}
          <Field data-invalid={Boolean(fieldErrors.email)}>
            <FieldLabel htmlFor="email">Business Email</FieldLabel>
            <FieldContent>
              <Input
                id="email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                required
              />
              <FieldDescription>
                If you don&apos;t have a business email, use the email address of the person in charge
              </FieldDescription>
              <FieldError
                errors={fieldErrors.email ? [{ message: fieldErrors.email }] : undefined}
              />
            </FieldContent>
          </Field>

          {/* Phone Number */}
          <Field data-invalid={Boolean(fieldErrors.phoneNumber)}>
            <FieldLabel htmlFor="phoneNumber">Phone Number *</FieldLabel>
            <FieldContent>
              <PhoneInputComponent
                value={phoneNumber}
                onChange={(value) => {
                  setPhoneNumber(value || "")
                  // Validate phone number
                  if (value && phoneCountryCode) {
                    const fullNumber = `${phoneCountryCode}${value}`
                    if (!isValidPhoneNumber(fullNumber)) {
                      setFieldErrors(prev => ({ ...prev, phoneNumber: "Invalid phone number for selected country" }))
                    } else {
                      setFieldErrors(prev => ({ ...prev, phoneNumber: undefined }))
                    }
                  } else if (!value) {
                    setFieldErrors(prev => ({ ...prev, phoneNumber: "Phone number is required" }))
                  }
                }}
                onCountryChange={(code: string) => {
                  setPhoneCountryCode(code)
                  // Re-validate phone number with new country code
                  if (phoneNumber) {
                    const fullNumber = `${code}${phoneNumber}`
                    if (!isValidPhoneNumber(fullNumber)) {
                      setFieldErrors(prev => ({ ...prev, phoneNumber: "Invalid phone number for selected country" }))
                    } else {
                      setFieldErrors(prev => ({ ...prev, phoneNumber: undefined }))
                    }
                  }
                }}
                placeholder="Enter phone number"
                defaultCountry={garage?.phoneCountryCode ? getCountryCodeFromCallingCode(garage.phoneCountryCode) : "US"}
              />
              <FieldDescription>
                If you don&apos;t have a business phone number, use the contact number of the person in charge
              </FieldDescription>
              <FieldError
                errors={
                  fieldErrors.phoneNumber ? [{ message: fieldErrors.phoneNumber }] : undefined
                }
              />
            </FieldContent>
          </Field>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Address</h3>
            <AddressForm
              value={address}
              onChange={setAddress}
              errors={{
                addressLine1: fieldErrors["address.addressLine1"] ? [fieldErrors["address.addressLine1"]] : undefined,
                addressLine2: fieldErrors["address.addressLine2"] ? [fieldErrors["address.addressLine2"]] : undefined,
                city: fieldErrors["address.city"] ? [fieldErrors["address.city"]] : undefined,
                state: fieldErrors["address.state"] ? [fieldErrors["address.state"]] : undefined,
                country: fieldErrors["address.country"] ? [fieldErrors["address.country"]] : undefined,
                postalCode: fieldErrors["address.postalCode"] ? [fieldErrors["address.postalCode"]] : undefined,
              }}
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/dashboard/${garageId}`)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
        </div>
      </div>
    </>
  )
}
