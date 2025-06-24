"use client";

import { useState } from "react";
import { AUTH_ENDPOINTS, Role } from "@/utils/authEndpoints";

interface UpdatePasswordResponse {
  status: "success" | "fail";
  message: string;
}

export interface UseUpdatePasswordResult {
  updatePassword: (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => Promise<void>;
  loading: boolean;
  error: Error | null;
  data: UpdatePasswordResponse | null;
}

export function useUpdatePassword(role: Role): UseUpdatePasswordResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<UpdatePasswordResponse | null>(null);

  const updatePassword = async (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const resp = await fetch(AUTH_ENDPOINTS[role].updatePassword, {
        method: "POST", // or PUT/PATCH if backend expects it
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword })
      });

      const json: UpdatePasswordResponse = await resp.json();

      if (json.status !== "success") {
        throw new Error(json.message || "Update password failed");
      }

      setData(json);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err);
      else setError(new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return { updatePassword, loading, error, data };
}
