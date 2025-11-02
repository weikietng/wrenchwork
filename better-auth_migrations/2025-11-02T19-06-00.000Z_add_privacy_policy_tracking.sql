-- Add privacy policy acceptance tracking to user table

-- Add columns for privacy policy tracking
alter table "user" 
  add column "privacyPolicyAccepted" boolean default false not null,
  add column "privacyPolicyVersion" text,
  add column "privacyPolicyAcceptedAt" timestamptz;

-- Create index for compliance queries (e.g., find users who haven't accepted latest version)
create index "user_privacyPolicyVersion_idx" on "user" ("privacyPolicyVersion");

-- Optional: Add comment for documentation
comment on column "user"."privacyPolicyAccepted" is 'Whether user has accepted the privacy policy';
comment on column "user"."privacyPolicyVersion" is 'Version of privacy policy accepted (e.g., "1.0", "2.0")';
comment on column "user"."privacyPolicyAcceptedAt" is 'Timestamp when user accepted the privacy policy';
