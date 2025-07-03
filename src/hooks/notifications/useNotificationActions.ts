import { useApi } from "@/hooks/general/useApi";
import { useToast } from "@/hooks/use-toast";
import { UseMutationResult } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";

interface MarkReadResponse {
  success: boolean;
  message: string;
}

interface MarkAllReadResponse {
  success: boolean;
  message: string;
}

interface ClearAllResponse {
  success: boolean;
  message: string;
}

export function useMarkNotificationRead() {
  const { success, error: showError } = useToast();
  const [endpoint, setEndpoint] = useState<string>("");

  const result = useApi<MarkReadResponse>(endpoint, {
    method: "PATCH",
    mutationOptions: {
      onSuccess: () => {
        success("Notification marked as read");
      },
      onError: (error) => {
        console.error("Mark as read error:", error);
        showError("Failed to mark notification as read");
      }
    }
  }) as UseMutationResult<MarkReadResponse, any, void>;

  const markAsRead = async (notificationId: string) => {
    if (!notificationId) {
      console.error("No notification ID provided");
      return;
    }

    try {
      console.log("Marking notification as read:", notificationId);
      const markReadEndpoint = `/notifications/mark-read/${notificationId}`;
      console.log("Setting endpoint to:", markReadEndpoint);
      setEndpoint(markReadEndpoint);
      // Wait for the endpoint to be set before mutating
      await new Promise((resolve) => setTimeout(resolve, 0));
      console.log("Calling mutate for notification:", notificationId);
      await result.mutate();
      console.log("Mark as read mutation completed");
    } catch (error) {
      console.error("Error in markAsRead:", error);
      showError("Failed to mark notification as read");
      throw error;
    }
  };

  return {
    markAsRead,
    isLoading: result.isPending,
    error: result.error
  };
}

export function useMarkAllNotificationsRead() {
  const { success, error: showError } = useToast();

  const result = useApi<MarkAllReadResponse>("/notifications/mark-all-read", {
    method: "PATCH",
    mutationOptions: {
      onSuccess: () => {
        success("All notifications marked as read");
      },
      onError: (error) => {
        console.error("Mark all as read error:", error);
        showError("Failed to mark all notifications as read");
      }
    }
  }) as UseMutationResult<MarkAllReadResponse, any, void>;

  const markAllAsRead = async () => {
    try {
      console.log("Marking all notifications as read");
      await result.mutateAsync();
      console.log("Mark all as read completed");
    } catch (error) {
      console.error("Error in markAllAsRead:", error);
      showError("Failed to mark all notifications as read");
      throw error;
    }
  };

  return {
    markAllAsRead,
    isLoading: result.isPending,
    error: result.error
  };
}

export function useClearAllNotifications() {
  const { success, error: showError } = useToast();

  const result = useApi<ClearAllResponse>("/notifications/clear-all", {
    method: "DELETE",
    mutationOptions: {
      onSuccess: () => {
        success("All notifications cleared");
      },
      onError: (error) => {
        console.error("Clear all error:", error);
        showError("Failed to clear all notifications");
      }
    }
  }) as UseMutationResult<ClearAllResponse, any, void>;

  const clearAll = async () => {
    try {
      console.log("Clearing all notifications");
      await result.mutateAsync();
      console.log("Clear all completed");
    } catch (error) {
      console.error("Error in clearAll:", error);
      showError("Failed to clear all notifications");
      throw error;
    }
  };

  return {
    clearAll,
    isLoading: result.isPending,
    error: result.error
  };
}
