"use client";

import { useState } from "react";
import { AUTH_ENDPOINTS, Role } from "@/utils/authEndpoints";

interface ForgotPasswordResponse {
  status: "success" | "fail";
  message: string;
}

export interface UseForgotPasswordResult {
  forgotPassword: (email: string) => Promise<void>;
  loading: boolean;
  error: Error | null;
  data: ForgotPasswordResponse | null;
}

export function useForgotPassword(
  role: "admin" | "manager"
): UseForgotPasswordResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<ForgotPasswordResponse | null>(null);

  const forgotPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const endpoint = "/auth/forgot-password";
      const fullUrl = `${baseUrl}${endpoint}`;

      const resp = await fetch(fullUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role })
      });

      const json: ForgotPasswordResponse = await resp.json();

      if (json.status !== "success") {
        // Backend returned fail status, throw error with message
        throw new Error(json.message || "Forgot password failed");
      }

      setData(json);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err);
      else setError(new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return { forgotPassword, loading, error, data };
}
