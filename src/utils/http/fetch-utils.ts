import { API_ERROR_MESSAGES, FETCH_TIMEOUT } from "./fetch-config"

export class ApiError extends Error {
  constructor(public status: number, message: string, public data?: unknown) {
    super(message)
    this.name = "ApiError"
  }
}

export const fetchWithTimeout = async (
  resource: RequestInfo,
  options: RequestInit = {}
): Promise<Response> => {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), FETCH_TIMEOUT)

  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(id)
    return response
  } catch (error) {
    clearTimeout(id)
    if (error instanceof Error && error.name === "AbortError") {
      throw new ApiError(408, API_ERROR_MESSAGES.TIMEOUT)
    }
    throw error
  }
}

export const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => {
      return { message: "Failed to parse error response" }
    })

    switch (response.status) {
      case 401:
        throw new ApiError(401, API_ERROR_MESSAGES.UNAUTHORIZED, errorData)
      case 500:
        throw new ApiError(500, API_ERROR_MESSAGES.SERVER, errorData)
      default:
        throw new ApiError(
          response.status,
          response.statusText || API_ERROR_MESSAGES.UNKNOWN,
          errorData
        )
    }
  }

  return response.json()
}
