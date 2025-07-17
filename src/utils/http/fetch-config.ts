export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
}

export const DEFAULT_OPTIONS: RequestInit = {
  headers: DEFAULT_HEADERS,
  credentials: "include",
  cache: "no-store",
}

export const FETCH_TIMEOUT = 10000 // 10 seconds

export const API_ERROR_MESSAGES = {
  TIMEOUT: "Request timeout",
  NETWORK: "Network error",
  UNAUTHORIZED: "Unauthorized access",
  SERVER: "Server error",
  UNKNOWN: "Unknown error occurred",
} as const
