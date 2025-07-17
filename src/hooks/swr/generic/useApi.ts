"use client";

import { env } from "@/configs";
import { useMemo } from "react";
import useSWR, { SWRConfiguration } from "swr";

// Generic interfaces that can be extended for different APIs
export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ApiResponse<T> {
  data: T[];
  meta: {
    pagination?: PaginationMeta;
  };
}

// Generic hook options interface
export interface UseApiOptions {
  page?: number;
  pageSize?: number;
  sort?: string | string[];
  populate?: string;
  filters?: Record<string, unknown>;
  enabled?: boolean;
  fields?: string[];
  status?: "published" | "draft";
}

// Utility function to build query parameters
export const buildApiQuery = (options: UseApiOptions): string => {
  const {
    page = 1,
    pageSize = 10,
    sort = "createdAt:desc",
    populate = "*",
    filters = {},
    fields = [],
    status,
  } = options;

  const params = new URLSearchParams({
    "pagination[page]": page.toString(),
    "pagination[pageSize]": pageSize.toString(),
    populate,
    ...Object.entries(filters).reduce((acc, [key, value]) => {
      acc[`filters[${key}]`] = String(value);
      return acc;
    }, {} as Record<string, string>),
  });

  // Handle multiple sort fields
  if (Array.isArray(sort)) {
    sort.forEach((sortField, index) => {
      params.append(`sort[${index}]`, sortField);
    });
  } else {
    params.append("sort", sort);
  }

  // Handle fields selection
  if (fields.length > 0) {
    fields.forEach((field, index) => {
      params.append(`fields[${index}]`, field);
    });
  }

  // Handle publication state
  if (status) {
    params.append("status", status);
  }

  return params.toString();
};

// Generic SWR hook for any API endpoint
export const useApi = <T extends BaseEntity>(
  endpoint: string,
  options: UseApiOptions = {},
  configs: SWRConfiguration = {}
) => {
  const { enabled = true } = options;

  const query = useMemo(() => buildApiQuery(options), [options]);

  const { data, error, isLoading, mutate } = useSWR<ApiResponse<T>>(
    enabled ? `${env.STRAPI_URL}/api/${endpoint}?${query}` : null,
    configs
  );

  return {
    data: data?.data || [],
    meta: data?.meta,
    error,
    isLoading,
    mutate,
  };
};

// Hook for single entity by ID
export const useApiById = <T extends BaseEntity>(
  endpoint: string,
  id: string,
  options: Omit<UseApiOptions, "page" | "pageSize" | "sort"> = {},
  configs: SWRConfiguration = {}
) => {
  const { enabled = true, populate = "*", fields = [], status } = options;

  const query = useMemo(() => {
    const params = new URLSearchParams({
      populate,
      ...Object.entries(options.filters || {}).reduce((acc, [key, value]) => {
        acc[`filters[${key}]`] = String(value);
        return acc;
      }, {} as Record<string, string>),
    });

    if (fields.length > 0) {
      fields.forEach((field, index) => {
        params.append(`fields[${index}]`, field);
      });
    }

    if (status) {
      params.append("status", status);
    }

    return params.toString();
  }, [options]);

  const { data, error, isLoading, mutate } = useSWR<{ data: T }>(
    enabled ? `${env.STRAPI_URL}/api/${endpoint}/${id}?${query}` : null,
    configs
  );

  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
  };
};
