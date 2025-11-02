-- Multi-tenancy schema for garage management

-- Garage table: each user can own/manage one or many garages
create table "garage" (
  "id" text not null primary key,
  "name" text not null,
  "picture" text,
  "email" text not null,
  "location" text not null,
  "phoneNumber" text not null,
  "ownerId" text not null references "user" ("id") on delete cascade,
  "createdAt" timestamptz default CURRENT_TIMESTAMP not null,
  "updatedAt" timestamptz default CURRENT_TIMESTAMP not null
);

-- Index for faster lookups by owner
create index "garage_ownerId_idx" on "garage" ("ownerId");

-- Optional: User-Garage relationship table for multi-user access (staff/employees)
-- This allows multiple users to have access to a garage beyond just the owner
create table "garage_member" (
  "id" text not null primary key,
  "garageId" text not null references "garage" ("id") on delete cascade,
  "userId" text not null references "user" ("id") on delete cascade,
  "role" text not null default 'member', -- e.g., 'owner', 'admin', 'mechanic', 'member'
  "createdAt" timestamptz default CURRENT_TIMESTAMP not null,
  "updatedAt" timestamptz default CURRENT_TIMESTAMP not null,
  unique ("garageId", "userId")
);

-- Indexes for garage_member table
create index "garage_member_garageId_idx" on "garage_member" ("garageId");
create index "garage_member_userId_idx" on "garage_member" ("userId");
