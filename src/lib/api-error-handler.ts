import { useRouter } from "next/navigation"

export interface ApiError {
  success: false
  message: string
  errors?: Record<string, string>
}

export interface ApiResponse<T = unknown> {
  success: boolean
  message?: string
  data?: T
  errors?: Record<string, string>
}

/**
 * Handle API errors gracefully
 * Redirects to login on 401, shows error message on 403
 */
export async function handleApiResponse<T>(
  response: Response,
  router?: ReturnType<typeof useRouter>
): Promise<{ data: T | null; error: string | null }> {
  try {
    const data = await response.json()

    // Handle 401 - Unauthorized (session expired or not logged in)
    if (response.status === 401) {
      if (router) {
        router.push("/login?error=session_expired")
      } else if (typeof window !== "undefined") {
        window.location.href = "/login?error=session_expired"
      }
      return {
        data: null,
        error: "Your session has expired. Please log in again.",
      }
    }

    // Handle 403 - Forbidden (insufficient permissions)
    if (response.status === 403) {
      return {
        data: null,
        error: data.message || "You don't have permission to perform this action.",
      }
    }

    // Handle 404 - Not Found
    if (response.status === 404) {
      return {
        data: null,
        error: data.message || "The requested resource was not found.",
      }
    }

    // Handle other errors
    if (!response.ok) {
      return {
        data: null,
        error: data.message || "An error occurred. Please try again.",
      }
    }

    // Success
    return {
      data: data as T,
      error: null,
    }
  } catch (error) {
    console.error("API Error:", error)
    return {
      data: null,
      error: "Failed to communicate with the server. Please try again.",
    }
  }
}

/**
 * Custom hook for API calls with error handling
 */
export function useApiErrorHandler() {
  const router = useRouter()

  const handleResponse = async <T,>(response: Response) => {
    return handleApiResponse<T>(response, router)
  }

  return { handleResponse }
}
