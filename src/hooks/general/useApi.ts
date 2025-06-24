"use client";

import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  UseQueryResult,
  UseMutationResult
} from "@tanstack/react-query";
import { useAuthStore } from "@/stores/useAuthStore";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiError extends Error {
  error?: string;
  status?: number;
}

const fetchWithAuth = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const { accessToken, setAccessToken, clearAuth } = useAuthStore.getState();

  if (!accessToken) {
    throw new Error("No access token available");
  }

  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${accessToken}`);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers
    }
  );

  if (response.status === 401) {
    // Token expired, try to refresh
    try {
      const refreshResponse = await fetch("/api/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ accessToken })
      });

      if (!refreshResponse.ok) {
        throw new Error("Failed to refresh token");
      }
      const refreshData = await refreshResponse.json();
      console.log("refreshResponse", refreshData);
      const {
        data: { accessToken: newAccessToken }
      } = refreshData;
      setAccessToken(newAccessToken);

      // Retry the original request with new token
      headers.set("Authorization", `Bearer ${newAccessToken}`);
      const retryResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
        {
          ...options,
          headers
        }
      );

      if (!retryResponse.ok) {
        throw new Error(await retryResponse.text());
      }

      // Handle 204 No Content response
      if (retryResponse.status === 204) {
        return {} as T;
      }

      return retryResponse.json();
    } catch (error) {
      clearAuth();
      throw new Error("Session expired. Please login again.");
    }
  }

  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(
      errorData.message || "An error occurred"
    ) as ApiError;
    error.error = errorData.message;
    error.status = response.status;
    throw error;
  }

  // Handle 204 No Content response
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
};

interface UseApiOptions<TData, TVariables, TError> {
  method?: HttpMethod;
  queryOptions?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">;
  mutationOptions?: Omit<
    UseMutationOptions<TData, TError, TVariables>,
    "mutationFn"
  >;
}

export function useApi<
  TData = unknown,
  TVariables = unknown,
  TError = ApiError
>(
  endpoint: string,
  options: UseApiOptions<TData, TVariables, TError> = {}
):
  | UseQueryResult<TData, TError>
  | UseMutationResult<TData, TError, TVariables> {
  const { method = "GET", queryOptions, mutationOptions } = options;

  if (method === "GET") {
    return useQuery<TData, TError>({
      queryKey: [endpoint],
      queryFn: () => fetchWithAuth<TData>(endpoint),
      ...queryOptions
    });
  }

  return useMutation<TData, TError, TVariables>({
    mutationFn: (data) =>
      fetchWithAuth<TData>(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }),
    ...mutationOptions
  });
}
