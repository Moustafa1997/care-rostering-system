"use client";

import { useState } from "react";

interface ResetPasswordResponse {
  status: "success" | "fail" | "error";
  message: string;
  error?: {
    errors: Record<string, { message: string }>;
  };
}

export interface UseResetPasswordResult {
  resetPassword: (
    token: string,
    newPassword: string,
    confirmPassword: string
  ) => Promise<ResetPasswordResponse>;
  loading: boolean;
  error: Error | null;
  data: ResetPasswordResponse | null;
}

export function useResetPassword(
  role: "admin" | "manager"
): UseResetPasswordResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<ResetPasswordResponse | null>(null);

  const resetPassword = async (
    token: string,
    newPassword: string,
    confirmPassword: string
  ): Promise<ResetPasswordResponse> => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const endpoint = "/auth/reset-password";
      const fullUrl = `${baseUrl}${endpoint}`;

      const resp = await fetch(fullUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword, confirmPassword, role })
      });

      const json: ResetPasswordResponse = await resp.json();
      console.log("reset", json);

      if (json.status === "error" || json.status === "fail") {
        // Extract specific validation error messages from the backend
        let errorMessage = json.message || "Reset password failed";

        if (json.error?.errors) {
          // Extract the first validation error message
          const firstError = Object.values(json.error.errors)[0] as any;
          if (firstError?.message) {
            errorMessage = firstError.message;
          }
        }

        throw new Error(errorMessage);
      }

      setData(json);
      return json;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err);
      else setError(new Error("Unknown error"));
      throw err; // Re-throw the error so the component can catch it
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, error, data };
}
