import { useAuthStore } from "@/stores/useAuthStore";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Keep track of ongoing refresh attempts
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;
let refreshAttempts = 0;
const MAX_REFRESH_ATTEMPTS = 1;

/**
 * Fetch wrapper that automatically handles token refresh and attaches the access token
 */
export const authFetch = async (
  input: RequestInfo,
  init: RequestInit = {}
): Promise<Response> => {
  const getUrl = (input: RequestInfo): string => {
    if (typeof input === "string" && input.startsWith("/")) {
      return `${API_BASE_URL}${input}`;
    }
    return input.toString();
  };

  const tryFetch = async (token: string) => {
    return fetch(getUrl(input), {
      ...init,
      headers: {
        ...init.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
  };

  // Get current access token from store
  let currentToken = useAuthStore.getState().accessToken;

  // If no access token or we've exceeded refresh attempts, redirect to login
  if (!currentToken) {
    if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
      refreshAttempts = 0;
      window.location.href = "/login";
      throw new Error("Session expired. Please login again.");
    }

    // If a refresh is already in progress, wait for it
    if (isRefreshing && refreshPromise) {
      try {
        currentToken = await refreshPromise;
      } catch (error) {
        refreshAttempts++;
        window.location.href = "/login";
        throw new Error("Session expired. Please login again.");
      }
    } else {
      // Start a new refresh attempt
      isRefreshing = true;
      refreshAttempts++;
      refreshPromise = (async () => {
        try {
          const refreshRes = await fetch("/api/refresh-token", {
            method: "POST",
            credentials: "include"
          });

          if (!refreshRes.ok) {
            throw new Error("Failed to refresh token");
          }

          const data = await refreshRes.json();
          if (!data.data?.accessToken) {
            throw new Error("No access token received from refresh");
          }

          useAuthStore.getState().setAccessToken(data.data.accessToken);
          return data.data.accessToken;
        } catch (error) {
          window.location.href = "/login";
          throw error;
        } finally {
          isRefreshing = false;
          refreshPromise = null;
        }
      })();

      try {
        currentToken = await refreshPromise;
      } catch (error) {
        throw new Error("Session expired. Please login again.");
      }
    }
  }

  // At this point, currentToken should be defined
  if (!currentToken) {
    throw new Error("Failed to obtain access token");
  }

  // Make the original request with the access token
  const res = await tryFetch(currentToken);

  // If we get a 401, try to refresh the token and retry
  if (res.status === 401) {
    if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
      refreshAttempts = 0;
      window.location.href = "/login";
      throw new Error("Session expired. Please login again.");
    }

    // If a refresh is already in progress, wait for it
    if (isRefreshing && refreshPromise) {
      try {
        currentToken = await refreshPromise;
      } catch (error) {
        refreshAttempts++;
        window.location.href = "/login";
        throw new Error("Session expired. Please login again.");
      }
    } else {
      // Start a new refresh attempt
      isRefreshing = true;
      refreshAttempts++;
      refreshPromise = (async () => {
        try {
          const refreshRes = await fetch("/api/refresh-token", {
            method: "POST",
            credentials: "include"
          });

          if (!refreshRes.ok) {
            throw new Error("Failed to refresh token");
          }

          const data = await refreshRes.json();
          if (!data.data?.accessToken) {
            throw new Error("No access token received from refresh");
          }

          useAuthStore.getState().setAccessToken(data.data.accessToken);
          return data.data.accessToken;
        } catch (error) {
          window.location.href = "/login";
          throw error;
        } finally {
          isRefreshing = false;
          refreshPromise = null;
        }
      })();

      try {
        currentToken = await refreshPromise;
        // Retry the original request with the new token
        return tryFetch(currentToken);
      } catch (error) {
        throw new Error("Session expired. Please login again.");
      }
    }
  }

  return res;
};
