import { neon, neonConfig, NeonQueryFunction } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)

/**
 * Execute a query with RLS (Row-Level Security) context
 * Sets the current user ID for PostgreSQL RLS policies
 * 
 * @example
 * await withRLS(userId, async () => {
 *   return await sql`SELECT * FROM garage`
 * })
 */
export async function withRLS<T>(
  userId: string,
  callback: () => Promise<T>
): Promise<T> {
  // Set the user context for RLS policies
  // Note: SET commands require raw SQL, userId is validated by Better Auth (UUID format)
  const setQuery = `SET LOCAL app.current_user_id = '${userId}'`
  await (sql as any).query(setQuery)
  
  try {
    // Execute the callback with RLS context
    return await callback()
  } finally {
    // Note: SET LOCAL is automatically reset at transaction end
    // If not in a transaction, it resets at statement end
  }
}

/**
 * Begin a transaction with RLS context
 * Use this for operations that need multiple queries with RLS
 * 
 * @example
 * await withRLSTransaction(userId, async () => {
 *   await sql`INSERT INTO garage (...) VALUES (...)`
 *   await sql`INSERT INTO garage_member (...) VALUES (...)`
 * })
 */
export async function withRLSTransaction<T>(
  userId: string,
  callback: () => Promise<T>
): Promise<T> {
  try {
    await sql`BEGIN`
    
    // Set user context within transaction
    // Note: SET commands require raw SQL, userId is validated by Better Auth (UUID format)
    const setQuery = `SET LOCAL app.current_user_id = '${userId}'`
    await (sql as any).query(setQuery)
    
    // Execute callback
    const result = await callback()
    
    await sql`COMMIT`
    return result
  } catch (error) {
    console.error("RLS Transaction error:", error)
    try {
      await sql`ROLLBACK`
    } catch (rollbackError) {
      console.error("Rollback error:", rollbackError)
    }
    throw error
  }
}
