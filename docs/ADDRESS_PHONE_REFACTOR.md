# Address & Phone Number Refactor - Complete ✅

## Summary
Refactored garage schema and forms to properly handle structured address and international phone numbers with validation.

## ✅ Completed

### 1. **Database Migration**
- File: `better-auth_migrations/2025-11-03T11-50-00.000Z_refactor_garage_address_phone.sql`
- Dropped: `location`, old `phoneNumber`
- Added: `addressLine1`, `addressLine2`, `city`, `state`, `country`, `postalCode`, `phoneNumber`, `phoneCountryCode`
- Indexes on `country` and `state`

### 2. **NPM Packages Installed**
```bash
npm install libphonenumber-js react-phone-number-input country-state-city postcode-validator
```

- **libphonenumber-js**: Phone validation & formatting
- **react-phone-number-input**: Phone input with country selector
- **country-state-city**: Politically neutral country/state/city data
- **postcode-validator**: Postal code validation (multi-country)

### 3. **TypeScript Types Updated**
- File: `src/types/garage.ts`
- Updated `Garage` interface with new fields
- Added `formatAddress()` and `formatPhoneNumber()` helpers

### 4. **Validation Schema**
- File: `src/lib/validations/garage.ts`
- Phone number validation with `libphonenumber-js`
- Postal code validation with `postcode-validator`
- Country code must be ISO 3166-1 alpha-2 (2 characters)
- Address line 2 and city are optional
- Postal code is optional (for countries without them)

### 5. **API Endpoints Updated**
- **Create Garage**: `src/app/api/v1/garages/route.ts`
  - Accepts structured address and phone fields
  - Validates with Zod schema
  
- **Update Garage**: `src/app/api/v1/garages/[garageId]/route.ts`
  - Updates individual address and phone fields
  - Maintains backward compatibility

### 6. **UI Components Created**

#### Phone Input Component
- File: `src/components/ui/phone-input.tsx`
- International phone input with country code selector
- Auto-formats as user types
- Validates phone numbers

#### Address Form Component
- File: `src/components/ui/address-form.tsx`
- Country selector (all countries with flags)
- Dynamic state/province dropdown (populated based on country)
- Dynamic city dropdown or input (based on availability)
- Postal code input with validation
- Address line 2 and city are optional

### 7. **Create Garage Page Updated**
- File: `src/app/garages/create/page.tsx`
- Uses `PhoneInputComponent`
- Uses `AddressForm` component
- Parses phone number to extract country code and national number
- Sends structured data to API

## 🔄 Still TODO

### Settings Page
- File: `src/app/dashboard/[garageId]/settings/page.tsx`
- Needs same updates as create page
- Load existing address and phone data
- Use same components

## 📋 Validation Rules

### Phone Number
- ✅ Must be valid for selected country
- ✅ Automatically formatted
- ✅ Country code extracted automatically

### Address
- ✅ Address Line 1: Required, max 200 chars
- ✅ Address Line 2: Optional, max 200 chars
- ✅ City: Optional, max 100 chars
- ✅ State/Province: Required, max 100 chars
- ✅ Country: Required, ISO 3166-1 alpha-2 (2 chars)
- ✅ Postal Code: Optional, max 20 chars, validated per country

### Special Cases
- Countries without postal codes: Leave blank
- Countries without states: Will show empty dropdown
- Cities: Auto-populated if available, otherwise manual input

## 🎨 UX Features

### Phone Input
- Country flag selector
- Auto-formatting as you type
- Validates in real-time
- Shows country calling code

### Address Form
- Country selector with flags
- State dropdown updates when country changes
- City dropdown updates when state changes
- Helpful descriptions for optional fields
- Validation errors shown inline

## 🔒 Security
- All validation on both frontend and backend
- SQL injection protection with parameterized queries
- XSS protection with proper escaping
- File upload validation (images only, max 5MB)

## 📊 Database Schema

```sql
-- New columns in garage table
addressLine1 text NOT NULL
addressLine2 text NULL
city text NULL
state text NOT NULL
country text NOT NULL  -- ISO 3166-1 alpha-2
postalCode text NULL
phoneNumber text NOT NULL  -- National number only
phoneCountryCode text NOT NULL  -- e.g., "+1"
```

---

**Status**: ✅ Create Garage Complete | ⏳ Settings Page Pending
**Last Updated**: November 3, 2025
