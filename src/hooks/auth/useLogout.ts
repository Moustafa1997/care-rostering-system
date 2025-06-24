import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

export function useLogout() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  async function logout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/logout", {
        method: "POST"
      });
      if (!res.ok) {
        throw new Error("Logout failed");
      }

      // Clear both access token and user data
      clearAuth();

      setLoading(false);
      // Redirect to login page or homepage after logout
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setLoading(false);
    }
  }

  return { logout, isLoading, error };
}
