-- Enable Row-Level Security (RLS) on garage and garage_member tables
-- This provides database-level security in addition to application-level checks

-- Enable RLS on garage table
ALTER TABLE garage ENABLE ROW LEVEL SECURITY;

-- Enable RLS on garage_member table
ALTER TABLE garage_member ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- GARAGE TABLE POLICIES
-- ============================================================================

-- Policy: Users can only SELECT garages they are members of
CREATE POLICY "Users can view garages they are members of"
ON garage
FOR SELECT
USING (
  id IN (
    SELECT "garageId" 
    FROM garage_member 
    WHERE "userId" = current_setting('app.current_user_id', true)::text
  )
);

-- Policy: Users can INSERT garages (they become the owner automatically)
CREATE POLICY "Users can create garages"
ON garage
FOR INSERT
WITH CHECK (
  "ownerId" = current_setting('app.current_user_id', true)::text
);

-- Policy: Only owners and admins can UPDATE garages
CREATE POLICY "Owners and admins can update garages"
ON garage
FOR UPDATE
USING (
  id IN (
    SELECT "garageId" 
    FROM garage_member 
    WHERE "userId" = current_setting('app.current_user_id', true)::text
    AND role IN ('owner', 'admin')
  )
)
WITH CHECK (
  id IN (
    SELECT "garageId" 
    FROM garage_member 
    WHERE "userId" = current_setting('app.current_user_id', true)::text
    AND role IN ('owner', 'admin')
  )
);

-- Policy: Only owners can DELETE garages
CREATE POLICY "Only owners can delete garages"
ON garage
FOR DELETE
USING (
  id IN (
    SELECT "garageId" 
    FROM garage_member 
    WHERE "userId" = current_setting('app.current_user_id', true)::text
    AND role = 'owner'
  )
);

-- ============================================================================
-- GARAGE_MEMBER TABLE POLICIES
-- ============================================================================

-- Policy: Users can view garage members for garages they belong to
CREATE POLICY "Users can view members of their garages"
ON garage_member
FOR SELECT
USING (
  "garageId" IN (
    SELECT "garageId" 
    FROM garage_member 
    WHERE "userId" = current_setting('app.current_user_id', true)::text
  )
);

-- Policy: Owners and admins can add new members
CREATE POLICY "Owners and admins can add members"
ON garage_member
FOR INSERT
WITH CHECK (
  "garageId" IN (
    SELECT "garageId" 
    FROM garage_member 
    WHERE "userId" = current_setting('app.current_user_id', true)::text
    AND role IN ('owner', 'admin')
  )
);

-- Policy: Owners and admins can update member roles
CREATE POLICY "Owners and admins can update members"
ON garage_member
FOR UPDATE
USING (
  "garageId" IN (
    SELECT "garageId" 
    FROM garage_member 
    WHERE "userId" = current_setting('app.current_user_id', true)::text
    AND role IN ('owner', 'admin')
  )
)
WITH CHECK (
  "garageId" IN (
    SELECT "garageId" 
    FROM garage_member 
    WHERE "userId" = current_setting('app.current_user_id', true)::text
    AND role IN ('owner', 'admin')
  )
);

-- Policy: Owners and admins can remove members
CREATE POLICY "Owners and admins can remove members"
ON garage_member
FOR DELETE
USING (
  "garageId" IN (
    SELECT "garageId" 
    FROM garage_member 
    WHERE "userId" = current_setting('app.current_user_id', true)::text
    AND role IN ('owner', 'admin')
  )
);

-- ============================================================================
-- NOTES
-- ============================================================================

-- To use these policies, your application must set the current user ID before queries:
-- 
-- In your application code (before executing queries):
-- await sql`SET LOCAL app.current_user_id = ${userId}`
-- 
-- This tells PostgreSQL which user is making the request, and the RLS policies
-- will automatically filter/restrict data based on that user's permissions.
--
-- Benefits:
-- 1. Defense in depth - even if application logic fails, DB enforces security
-- 2. Protection against SQL injection - DB won't return unauthorized data
-- 3. Audit trail - DB logs show which user accessed what
-- 4. Consistency - same security rules apply regardless of how DB is accessed
