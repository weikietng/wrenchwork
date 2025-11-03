"use client"

import * as React from "react"
import { parsePhoneNumber, getCountries, getCountryCallingCode } from "libphonenumber-js"
import { Country } from "country-state-city"
import { Check, ChevronsUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export interface PhoneInputProps {
  value?: string
  onChange?: (value: string | undefined) => void
  onCountryChange?: (countryCode: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  defaultCountry?: string
}

// Get country name from country code
const getCountryName = (countryCode: string): string => {
  const countryData = Country.getAllCountries().find(c => c.isoCode === countryCode)
  return countryData?.name || countryCode
}

// Convert country code to flag emoji
const getCountryFlag = (countryCode: string): string => {
  if (!countryCode || countryCode.length !== 2) return "🏳️"
  
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0))
  
  return String.fromCodePoint(...codePoints)
}

export const PhoneInputComponent = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, onCountryChange, placeholder = "Enter phone number", disabled, className, defaultCountry = "US" }, ref) => {
    const [countryOpen, setCountryOpen] = React.useState(false)
    const [selectedCountry, setSelectedCountry] = React.useState(defaultCountry)
    const [phoneNumber, setPhoneNumber] = React.useState("")

    const countries = getCountries()

    // Update selected country when defaultCountry changes
    React.useEffect(() => {
      setSelectedCountry(defaultCountry)
    }, [defaultCountry])

    // Parse existing value
    React.useEffect(() => {
      if (value) {
        // If value starts with +, it's international format - parse it
        if (value.startsWith("+")) {
          try {
            const parsed = parsePhoneNumber(value)
            if (parsed) {
              setSelectedCountry(parsed.country || defaultCountry)
              setPhoneNumber(parsed.nationalNumber)
            }
          } catch {
            setPhoneNumber(value)
          }
        } else {
          // It's already just the national number
          setPhoneNumber(value)
        }
      } else {
        setPhoneNumber("")
      }
    }, [value, defaultCountry])

    const handleCountryChange = (country: string) => {
      setSelectedCountry(country)
      setCountryOpen(false)
      
      // Notify parent of country change
      const callingCode = getCountryCallingCode(country as Parameters<typeof getCountryCallingCode>[0])
      onCountryChange?.(`+${callingCode}`)
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newNumber = e.target.value.replace(/\D/g, "") // Only digits
      setPhoneNumber(newNumber)
      
      // Only output the national number, NOT the full international format
      onChange?.(newNumber)
    }

    const callingCode = selectedCountry ? getCountryCallingCode(selectedCountry as Parameters<typeof getCountryCallingCode>[0]) : ""

    return (
      <div className={cn("flex gap-2", className)}>
        <Popover open={countryOpen} onOpenChange={setCountryOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={countryOpen}
              disabled={disabled}
              className="w-[140px] justify-start font-normal"
            >
              <span className="text-lg mr-1">{getCountryFlag(selectedCountry)}</span>
              <span className="text-xs text-muted-foreground">+{callingCode}</span>
              <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search country..." className="h-9" />
              <CommandList>
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup className="max-h-[300px] overflow-auto">
                  {countries.map((country) => {
                    const code = getCountryCallingCode(country as Parameters<typeof getCountryCallingCode>[0])
                    const name = getCountryName(country)
                    return (
                      <CommandItem
                        key={country}
                        value={`${name} ${country} ${code}`}
                        onSelect={() => handleCountryChange(country)}
                        className="flex items-center gap-2"
                      >
                        <Check
                          className={cn(
                            "h-4 w-4",
                            selectedCountry === country ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <span className="text-lg">{getCountryFlag(country)}</span>
                        <span className="flex-1">{name}</span>
                        <span className="text-xs text-muted-foreground">+{code}</span>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="relative flex-1">
          <Input
            ref={ref}
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full"
          />
        </div>
      </div>
    )
  }
)

PhoneInputComponent.displayName = "PhoneInput"
