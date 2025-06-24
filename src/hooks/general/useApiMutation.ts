import { useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

interface UseApiMutationResult<T> {
  mutate: (data: any) => Promise<T>;
  isLoading: boolean;
  error: Error | null;
}

export function useApiMutation<T>(endpoint: string): UseApiMutationResult<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const accessToken = useAuthStore((s) => s.accessToken);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const mutate = async (data: any): Promise<T> => {
    try {
      setIsLoading(true);
      setError(null);

      // Get current token
      let token = accessToken;
      if (!token) {
        throw new Error("No access token available");
      }

      // Create FormData if data contains files
      const isFormData = data instanceof FormData;
      const body = isFormData ? data : JSON.stringify(data);

      // Make the request
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
        {
          method: "POST",
          headers: isFormData
            ? {
                Authorization: `Bearer ${token}`
              }
            : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
          body
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          clearAuth();
          window.location.replace("/login");
          throw new Error("Session expired");
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
      }

      const result = await response.json();
      return result.data as T;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
}
