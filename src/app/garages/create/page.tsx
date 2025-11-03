"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GarageSkeleton } from "@/components/garage-skeleton"
import { Upload, X } from "lucide-react"
import { parsePhoneNumber, isValidPhoneNumber } from "libphonenumber-js"
import { createGarageSchema } from "@/lib/validations/garage"

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

type FieldErrors = Record<string, string | undefined>

export default function CreateGaragePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formMessage, setFormMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

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

  const validateField = (name: string, value: any) => {
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
    } catch (error) {
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

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFormMessage({
        type: "error",
        text: "Image size must be less than 5MB",
      })
      return
    }

    // Validate file type
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

      const response = await fetch("/api/v1/garages", {
        method: "POST",
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

      const data = await response.json()

      if (!response.ok) {
        setFieldErrors(data.errors ?? {})
        const errorMessage = data.error 
          ? `${data.message}: ${data.error}` 
          : data.message || "Failed to create garage"
        setFormMessage({ type: "error", text: errorMessage })
        return
      }

      setFormMessage({ type: "success", text: data.message })

      // Show loading skeleton and redirect to the new garage dashboard
      setIsRedirecting(true)
      setTimeout(() => {
        router.push(`/dashboard/${data.garage.id}`)
        router.refresh()
      }, 500)
    } catch (error) {
      console.error("Failed to create garage:", error)
      const errorMessage = error instanceof Error 
        ? `Network error: ${error.message}` 
        : "Failed to create garage. Please try again."
      setFormMessage({
        type: "error",
        text: errorMessage,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading skeleton while redirecting
  if (isRedirecting) {
    return <GarageSkeleton />
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create Your Garage</h1>
          <p className="mt-2 text-muted-foreground">
            Set up your garage profile to start managing your business
          </p>
        </div>

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
            <FieldLabel>Garage Picture (Optional)</FieldLabel>
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
                placeholder="Joe's Auto Repair"
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
                placeholder="contact@joesauto.com"
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
                onCountryChange={(code) => {
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
                defaultCountry="US"
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
              {isSubmitting ? "Creating..." : "Create Garage"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
