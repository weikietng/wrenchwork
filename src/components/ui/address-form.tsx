"use client"

import * as React from "react"
import { Country, State, City, type IState, type ICity } from "country-state-city"
import { Check, ChevronsUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { cn } from "@/lib/utils"

export interface AddressFormData {
  addressLine1: string
  addressLine2?: string
  city?: string
  state: string
  country: string
  postalCode?: string
}

export interface AddressFormProps {
  value: AddressFormData
  onChange: (value: AddressFormData) => void
  errors?: {
    addressLine1?: string[]
    addressLine2?: string[]
    city?: string[]
    state?: string[]
    country?: string[]
    postalCode?: string[]
  }
}

export function AddressForm({ value, onChange, errors }: AddressFormProps) {
  const [states, setStates] = React.useState<IState[]>([])
  const [cities, setCities] = React.useState<ICity[]>([])
  const [countryOpen, setCountryOpen] = React.useState(false)

  const countries = Country.getAllCountries()

  // Update states when country changes
  React.useEffect(() => {
    if (value.country) {
      const countryStates = State.getStatesOfCountry(value.country)
      setStates(countryStates)
      
      // Reset state and city if country changed
      if (value.state && !countryStates.find((s) => s.isoCode === value.state)) {
        onChange({ ...value, state: "", city: "" })
      }
    } else {
      setStates([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.country])

  // Update cities when state changes
  React.useEffect(() => {
    if (value.country && value.state) {
      const stateCities = City.getCitiesOfState(value.country, value.state)
      setCities(stateCities)
      
      // Reset city if state changed
      if (value.city && !stateCities.find((c) => c.name === value.city)) {
        onChange({ ...value, city: "" })
      }
    } else {
      setCities([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.country, value.state])

  return (
    <div className="space-y-4">
      {/* Address Line 1 */}
      <Field>
        <FieldLabel htmlFor="addressLine1">Address Line 1 *</FieldLabel>
        <FieldContent>
          <Input
            id="addressLine1"
            value={value.addressLine1}
            onChange={(e) => onChange({ ...value, addressLine1: e.target.value })}
            placeholder="123 Main Street"
            required
          />
          <FieldError errors={errors?.addressLine1?.map(e => ({ message: e }))} />
        </FieldContent>
      </Field>

      {/* Address Line 2 */}
      <Field>
        <FieldLabel htmlFor="addressLine2">Address Line 2</FieldLabel>
        <FieldContent>
          <Input
            id="addressLine2"
            value={value.addressLine2 || ""}
            onChange={(e) => onChange({ ...value, addressLine2: e.target.value })}
            placeholder="Apartment, suite, unit, etc. (optional)"
          />
          <FieldError errors={errors?.addressLine2?.map(e => ({ message: e }))} />
        </FieldContent>
      </Field>

      {/* Country */}
      <Field>
        <FieldLabel htmlFor="country">Country *</FieldLabel>
        <FieldContent>
          <Popover open={countryOpen} onOpenChange={setCountryOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={countryOpen}
                className="w-full justify-start font-normal"
              >
                {value.country ? (
                  <>
                    <span className="text-lg mr-2">
                      {countries.find((c) => c.isoCode === value.country)?.flag}
                    </span>
                    <span>{countries.find((c) => c.isoCode === value.country)?.name}</span>
                  </>
                ) : (
                  <span className="text-muted-foreground">Select country...</span>
                )}
                <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search country..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No country found.</CommandEmpty>
                  <CommandGroup className="max-h-[300px] overflow-auto">
                    {countries.map((country) => (
                      <CommandItem
                        key={country.isoCode}
                        value={`${country.name} ${country.isoCode}`}
                        onSelect={() => {
                          onChange({ ...value, country: country.isoCode, state: "", city: "" })
                          setCountryOpen(false)
                        }}
                        className="flex items-center gap-2"
                      >
                        <Check
                          className={cn(
                            "h-4 w-4",
                            value.country === country.isoCode ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <span className="text-lg">{country.flag}</span>
                        <span>{country.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FieldError errors={errors?.country?.map(e => ({ message: e }))} />
        </FieldContent>
      </Field>

      {/* State/Province */}
      <Field>
        <FieldLabel htmlFor="state">State/Province *</FieldLabel>
        <FieldContent>
          <Select
            value={value.state}
            onValueChange={(state: string) => onChange({ ...value, state, city: "" })}
            disabled={!value.country || states.length === 0}
          >
            <SelectTrigger id="state">
              <SelectValue placeholder="Select state/province" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError errors={errors?.state?.map(e => ({ message: e }))} />
          {!value.country && (
            <FieldDescription>Please select a country first</FieldDescription>
          )}
        </FieldContent>
      </Field>

      {/* City */}
      <Field>
        <FieldLabel htmlFor="city">City</FieldLabel>
        <FieldContent>
          {cities.length > 0 ? (
            <Select
              value={value.city || ""}
              onValueChange={(city: string) => onChange({ ...value, city })}
              disabled={!value.state}
            >
              <SelectTrigger id="city">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.name} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              id="city"
              value={value.city || ""}
              onChange={(e) => onChange({ ...value, city: e.target.value })}
              placeholder="Enter city name"
              disabled={!value.state}
            />
          )}
          <FieldError errors={errors?.city?.map(e => ({ message: e }))} />
          {!value.state && (
            <FieldDescription>Please select a state/province first</FieldDescription>
          )}
        </FieldContent>
      </Field>

      {/* Postal Code */}
      <Field>
        <FieldLabel htmlFor="postalCode">Postal Code / ZIP</FieldLabel>
        <FieldContent>
          <Input
            id="postalCode"
            value={value.postalCode || ""}
            onChange={(e) => onChange({ ...value, postalCode: e.target.value })}
            placeholder="Enter postal code (if applicable)"
          />
          <FieldError errors={errors?.postalCode?.map(e => ({ message: e }))} />
          <FieldDescription>
            Leave blank if your country doesn&apos;t use postal codes
          </FieldDescription>
        </FieldContent>
      </Field>
    </div>
  )
}
