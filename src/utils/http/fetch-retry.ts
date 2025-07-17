import { ApiError } from "./fetch-utils"

interface RetryConfig {
  maxRetries?: number
  delayMs?: number
  shouldRetry?: (error: Error) => boolean
}

const DEFAULT_RETRY_CONFIG: Required<RetryConfig> = {
  maxRetries: 3,
  delayMs: 1000,
  shouldRetry: (error: Error) => {
    if (error instanceof ApiError) {
      // Don't retry on 401, 403, 404, etc.
      return error.status >= 500
    }
    return true
  },
}

export const withRetry = async <T>(
  fn: () => Promise<T>,
  config: RetryConfig = {}
): Promise<T> => {
  const { maxRetries, delayMs, shouldRetry } = {
    ...DEFAULT_RETRY_CONFIG,
    ...config,
  }

  let lastError: Error = new Error("Unknown error occurred")

  const handleError = (error: Error, attempt: number) => {
    lastError = error
    if (!shouldRetry(error) || attempt === maxRetries - 1) {
      throw error
    }
  }

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      if (error instanceof Error) {
        handleError(error, attempt)
      } else {
        throw new Error("Unknown error occurred")
      }

      await new Promise((resolve) =>
        setTimeout(resolve, delayMs * Math.pow(2, attempt))
      )
    }
  }

  throw lastError
}
