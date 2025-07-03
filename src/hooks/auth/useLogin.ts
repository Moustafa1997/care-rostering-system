/* eslint-disable no-console */
"use client";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/useAuthStore";
import { useToast } from "@/hooks/use-toast";

interface LoginResponse {
  accessToken: string;
  message: string;
  user: {
    _id: string;
    email: string;
    role: string;
  };
}

export function useLogin() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const { success, error: showError } = useToast();

  const mutation = useMutation({
    mutationFn: async ({
      email,
      password,
      role
    }: {
      email: string;
      password: string;
      role: "admin" | "manager";
    }) => {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
        credentials: "include"
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(JSON.stringify(errorData));
      }

      return res.json();
    },
    onSuccess: (data: LoginResponse) => {
      // Map the user data to match the User interface
      const userData = {
        _id: data.user._id,
        email: data.user.email,
        role: data.user.role
      };
      console.log("Login successful, user data:", userData);
      console.log(
        "Current device token before login:",
        useAuthStore.getState().deviceToken
      );

      // Store user data and token
      setUser(userData);
      setAccessToken(data.accessToken);

      // Show success message
      success("Login successful! Redirecting...");

      // Redirect based on role
      const userRole = data.user.role.toLowerCase();
      const redirectPath =
        userRole === "manager" ? "/dashboard/admin" : "/dashboard/manager";

      window.location.href = redirectPath;
    },
    onError: (error) => {
      clearAuth();
      let errorMessage = "Failed to login. Please try again.";

      if (error instanceof Error) {
        try {
          const errorData = JSON.parse(error.message);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = error.message;
        }
      }

      showError(errorMessage);
      throw error;
    }
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending
  };
}
