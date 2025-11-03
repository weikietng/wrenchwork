# Security Documentation

## Overview

Wrenchwork implements multiple layers of security to protect against common vulnerabilities and ensure proper multi-tenant isolation.

## 🔒 Security Measures

### 1. SQL Injection Prevention

#### Parameterized Queries
All database queries use parameterized statements to prevent SQL injection:

```typescript
// ✅ SAFE - Using parameterized queries
await sql`SELECT * FROM garage WHERE id = ${garageId}`

// ❌ UNSAFE - Never do this
await sql(`SELECT * FROM garage WHERE id = '${garageId}'`)
```

#### Column Name Whitelisting
For dynamic UPDATE queries, we use a whitelist of allowed columns:

```typescript
const ALLOWED_COLUMNS = {
  name: "name",
  email: "email",
  phoneNumber: "phoneNumber",
  location: "location",
  picture: "picture",
} as const
```

#### UUID Validation
All garage IDs are validated to ensure they match UUID format:

```typescript
function validateGarageId(garageId: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(garageId)
}
```

### 2. Row-Level Security (RLS)

#### Two-Layer RLS Implementation

WrenchWork implements RLS at **both** the application and database layers:

**Application Layer (TypeScript)**
- Permission checks in API routes
- Role-based access control
- See `src/lib/garage-security.ts`

**Database Layer (PostgreSQL)**
- PostgreSQL RLS policies on tables
- Automatic data filtering by user context
- See `docs/DATABASE_RLS.md` for details

#### Permission-Based Access Control

Every API endpoint checks user permissions before allowing access:

| Role | Read | Write | Delete | Manage Members | Manage Settings |
|------|------|-------|--------|----------------|-----------------|
| **Owner** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Admin** | ✅ | ✅ | ❌ | ✅ | ✅ |
| **Mechanic** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Member** | ❌ | ❌ | ❌ | ❌ | ❌ |

#### Implementation

```typescript
// Check if user has specific permission
await requireGaragePermission(userId, garageId, "canManageSettings")

// Check if user has specific role
await requireGarageRole(userId, garageId, ["owner", "admin"])
```

### 3. Authentication

#### Better Auth Integration
- Session-based authentication on all protected routes
- Secure password hashing (bcrypt)
- Email verification required
- Rate limiting on auth endpoints

```typescript
const session = await auth.api.getSession({
  headers: req.headers,
})

if (!session?.user) {
  return NextResponse.json(
    { success: false, message: "Unauthorized" },
    { status: 401 }
  )
}
```

### 4. Input Validation

#### Zod Schema Validation
All user input is validated using Zod schemas:

```typescript
const createGarageSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phoneNumber: z.string().min(1),
  countryCode: z.string().min(1),
  address: garageAddressSchema,
  picture: z.string().optional(),
})
```

### 5. Multi-Tenant Isolation

#### Database-Level Isolation
- All queries filter by `garage_member` table
- Users can only access garages they're members of
- Cascade deletes ensure data consistency

```sql
SELECT g.* FROM garage g
INNER JOIN garage_member gm ON g.id = gm."garageId"
WHERE g.id = ${garageId} AND gm."userId" = ${userId}
```

### 6. Data Privacy

#### Image Storage
- Images stored as base64 strings (max 5MB)
- Validated file types (images only)
- No external image hosting required

#### Timestamps
- All timestamps stored in UTC (ISO 8601)
- Server-side generation (not client-dependent)
- Prevents time-based attacks

### 7. API Security Best Practices

#### HTTP Status Codes
- `401 Unauthorized` - No valid session
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource doesn't exist or no access
- `400 Bad Request` - Invalid input/format

#### Error Messages
- Generic messages to prevent information leakage
- Detailed errors only in development logs
- No stack traces exposed to clients

```typescript
// ✅ GOOD - Generic message
{ success: false, message: "Garage not found or access denied" }

// ❌ BAD - Reveals too much
{ success: false, message: "User 123 does not have access to garage 456" }
```

## 🛡️ Security Checklist

### Before Deploying

- [ ] All environment variables set securely
- [ ] Database connection uses SSL
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] CSP headers set
- [ ] HTTPS enforced
- [ ] Session secrets rotated
- [ ] Database backups enabled
- [ ] Audit logging enabled

### Regular Maintenance

- [ ] Review access logs weekly
- [ ] Update dependencies monthly
- [ ] Rotate secrets quarterly
- [ ] Security audit annually
- [ ] Penetration testing as needed

## 🚨 Reporting Security Issues

If you discover a security vulnerability, please email:
**weikietng@gmail.com**

Do not create public GitHub issues for security vulnerabilities.

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Better Auth Security](https://www.better-auth.com/docs/concepts/security)
- [Neon Security](https://neon.tech/docs/security/security-overview)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/security)

## 🔐 Security Headers

Recommended security headers for production:

```typescript
// next.config.mjs
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]
```

---

**Last Updated:** November 3, 2025
**Version:** 1.0.0
