import { ApiError, clientFetch } from "@/utils/http"
import { SWRConfiguration } from "swr"

export const globalSWRConfig: SWRConfiguration = {
  fetcher: (url: string) => clientFetch.get(url),
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  shouldRetryOnError: (error) => {
    if (error instanceof ApiError) {
      return error.status >= 500
    }
    return true
  },
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  dedupingInterval: 2000,
  focusThrottleInterval: 5000,
  loadingTimeout: 3000,
}
