import { ApiError, clientFetch } from "@/utils/http";
import { SWRConfiguration } from "swr";

export const globalSWRConfig: SWRConfiguration = {
  fetcher: (url: string) => clientFetch.get(url),
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  shouldRetryOnError: (error) => {
    if (error instanceof ApiError) {
      return error.status >= 500;
    }
    return true;
  },
  onError: (error) => {
    if (error instanceof ApiError) {
      console.error(error.message);
    }
  },
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    // Type safety check
    if (!(error instanceof ApiError)) {
      // For non-ApiError, retry up to 3 times
      if (retryCount >= 3) return;
      setTimeout(() => revalidate({ retryCount }), 5000);
      return;
    }

    // Handle specific HTTP status codes
    if (error.status === 404) return; // Don't retry 404 errors

    if (retryCount >= 3) return; // Max retry limit

    if (error.status === 401) {
      // Handle 401 Unauthorized - redirect to login or refresh token
      // You can implement your auth logic here
      console.warn("Unauthorized request, redirecting to login...");
      // Example: window.location.href = '/login';
      return; // Don't retry 401 errors
    }

    // Retry other errors with exponential backoff
    setTimeout(() => revalidate({ retryCount }), 5000);
  },
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  dedupingInterval: 2000,
  focusThrottleInterval: 5000,
  loadingTimeout: 3000,
};
