import { withRetry } from "./fetch-retry";
import { fetchWithTimeout, handleResponse } from "./fetch-utils";
import { DEFAULT_OPTIONS } from "./fetch-config";
import { siteConfig } from "@/configs";

class ServerFetch {
  private async createAuthHeaders(requireAuth: boolean): Promise<HeadersInit> {
    if (!requireAuth) return { ...DEFAULT_OPTIONS.headers };
    return { ...DEFAULT_OPTIONS.headers };
  }

  private async request<T>(
    url: string,
    options: RequestInit = {},
    requireAuth: boolean = true
  ): Promise<T> {
    const headers = await this.createAuthHeaders(requireAuth);
    const fullUrl =
      url.startsWith("http") || url.startsWith("https")
        ? url
        : `${siteConfig.baseUrl}${url}`;

    return withRetry(async () => {
      const response = await fetchWithTimeout(fullUrl, {
        ...DEFAULT_OPTIONS,
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
        next: {
          revalidate: 0, // Disable cache by default for server fetch
        },
      });
      return handleResponse<T>(response);
    });
  }

  public get<T>(
    url: string,
    options: RequestInit = {},
    requireAuth: boolean = true
  ): Promise<T> {
    return this.request<T>(
      url,
      {
        ...options,
        method: "GET",
      },
      requireAuth
    );
  }

  public post<T>(
    url: string,
    data?: unknown,
    options: RequestInit = {},
    requireAuth: boolean = true
  ): Promise<T> {
    return this.request<T>(
      url,
      {
        ...options,
        method: "POST",
        body: JSON.stringify(data),
      },
      requireAuth
    );
  }

  public put<T>(
    url: string,
    data?: unknown,
    options: RequestInit = {},
    requireAuth: boolean = true
  ): Promise<T> {
    return this.request<T>(
      url,
      {
        ...options,
        method: "PUT",
        body: JSON.stringify(data),
      },
      requireAuth
    );
  }

  public delete<T>(
    url: string,
    options: RequestInit = {},
    requireAuth: boolean = true
  ): Promise<T> {
    return this.request<T>(
      url,
      {
        ...options,
        method: "DELETE",
      },
      requireAuth
    );
  }

  public patch<T>(
    url: string,
    data?: unknown,
    options: RequestInit = {},
    requireAuth: boolean = true
  ): Promise<T> {
    return this.request<T>(
      url,
      {
        ...options,
        method: "PATCH",
        body: JSON.stringify(data),
      },
      requireAuth
    );
  }
}

export const serverFetch = new ServerFetch();
