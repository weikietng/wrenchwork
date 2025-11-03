-- Refactor garage schema to properly handle address and phone number

-- Drop old columns
ALTER TABLE "garage" DROP COLUMN IF EXISTS "location";
ALTER TABLE "garage" DROP COLUMN IF EXISTS "phoneNumber";

-- Add new address fields
ALTER TABLE "garage" ADD COLUMN "addressLine1" text NOT NULL DEFAULT '';
ALTER TABLE "garage" ADD COLUMN "addressLine2" text;
ALTER TABLE "garage" ADD COLUMN "city" text;
ALTER TABLE "garage" ADD COLUMN "state" text NOT NULL DEFAULT '';
ALTER TABLE "garage" ADD COLUMN "country" text NOT NULL DEFAULT '';
ALTER TABLE "garage" ADD COLUMN "postalCode" text;

-- Add new phone number fields
ALTER TABLE "garage" ADD COLUMN "phoneNumber" text NOT NULL DEFAULT '';
ALTER TABLE "garage" ADD COLUMN "phoneCountryCode" text NOT NULL DEFAULT '';

-- Remove defaults after adding columns (for existing rows)
ALTER TABLE "garage" ALTER COLUMN "addressLine1" DROP DEFAULT;
ALTER TABLE "garage" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "garage" ALTER COLUMN "country" DROP DEFAULT;
ALTER TABLE "garage" ALTER COLUMN "phoneNumber" DROP DEFAULT;
ALTER TABLE "garage" ALTER COLUMN "phoneCountryCode" DROP DEFAULT;

-- Add indexes for common queries
CREATE INDEX "garage_country_idx" ON "garage" ("country");
CREATE INDEX "garage_state_idx" ON "garage" ("state");
