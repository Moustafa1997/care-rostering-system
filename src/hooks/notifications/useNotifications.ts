import { useApi } from "@/hooks/general/useApi";
import { NotificationsResponse, Notification } from "@/types/notification";
import { useMemo, useEffect, useState, useCallback } from "react";
import { UseQueryResult } from "@tanstack/react-query";

interface UseNotificationsOptions {
  page?: number;
  limit?: number;
  type?: string;
  priority?: string;
  isRead?: boolean;
  autoRefetchOnNewMessage?: boolean;
  enableOptimisticUpdates?: boolean;
}

export function useNotifications(options: UseNotificationsOptions = {}) {
  const {
    page = 1,
    limit = 20,
    type,
    priority,
    isRead,
    autoRefetchOnNewMessage = true,
    enableOptimisticUpdates = true
  } = options;

  // State for optimistic notifications
  const [optimisticNotifications, setOptimisticNotifications] = useState<
    Notification[]
  >([]);

  const endpoint = useMemo(() => {
    const params = new URLSearchParams();

    params.set("page", String(page));
    params.set("limit", String(limit));

    if (type) {
      params.set("type", type);
    }

    if (priority) {
      params.set("priority", priority);
    }

    if (isRead !== undefined) {
      params.set("isRead", String(isRead));
    }

    const queryString = params.toString();
    return `/notifications${queryString ? `?${queryString}` : ""}`;
  }, [page, limit, type, priority, isRead]);

  const result = useApi<NotificationsResponse>(endpoint, {
    method: "GET",
    queryOptions: {
      retry: 1,
      refetchOnWindowFocus: false,
      gcTime: 0,
      staleTime: 0
    }
  }) as UseQueryResult<NotificationsResponse>;

  // Add optimistic notification
  const addOptimisticNotification = useCallback(
    (notification: Notification) => {
      console.log("addOptimisticNotification called with:", notification);
      console.log("enableOptimisticUpdates:", enableOptimisticUpdates);

      if (enableOptimisticUpdates) {
        console.log("Adding optimistic notification...");
        setOptimisticNotifications((prev) => {
          const newNotifications = [notification, ...prev];
          console.log("New optimistic notifications:", newNotifications);
          return newNotifications;
        });

        // Remove optimistic notification after 5 seconds or when data refetches
        setTimeout(() => {
          console.log("Removing optimistic notification:", notification._id);
          setOptimisticNotifications((prev) =>
            prev.filter((n) => n._id !== notification._id)
          );
        }, 5000);
      }
    },
    [enableOptimisticUpdates]
  );

  // Clear optimistic notifications when data refetches
  const clearOptimisticNotifications = useCallback(() => {
    setOptimisticNotifications([]);
  }, []);

  // Listen for FCM new message events and auto-refetch
  useEffect(() => {
    if (!autoRefetchOnNewMessage) return;

    const handleNewMessage = (event: CustomEvent) => {
      console.log("FCM new message received, refetching notifications");

      // Add optimistic notification if available
      if (event.detail?.optimisticNotification && enableOptimisticUpdates) {
        addOptimisticNotification(event.detail.optimisticNotification);
      }

      // Refetch after a short delay to allow backend to process
      setTimeout(() => {
        result.refetch();
        clearOptimisticNotifications();
      }, 1000);
    };

    // Listen for messages from service worker (background messages)
    const handleServiceWorkerMessage = (event: MessageEvent) => {
      if (event.data?.type === "fcm-new-message") {
        console.log("Service worker FCM message received:", event.data);

        // Add optimistic notification if available
        if (
          event.data.detail?.optimisticNotification &&
          enableOptimisticUpdates
        ) {
          addOptimisticNotification(event.data.detail.optimisticNotification);
        }

        // Refetch after a short delay to allow backend to process
        setTimeout(() => {
          result.refetch();
          clearOptimisticNotifications();
        }, 1000);
      }
    };

    window.addEventListener(
      "fcm-new-message",
      handleNewMessage as EventListener
    );

    // Listen for messages from service worker
    navigator.serviceWorker?.addEventListener(
      "message",
      handleServiceWorkerMessage
    );

    return () => {
      window.removeEventListener(
        "fcm-new-message",
        handleNewMessage as EventListener
      );
      navigator.serviceWorker?.removeEventListener(
        "message",
        handleServiceWorkerMessage
      );
    };
  }, [
    result.refetch,
    autoRefetchOnNewMessage,
    enableOptimisticUpdates,
    addOptimisticNotification,
    clearOptimisticNotifications
  ]);

  // Combine server data with optimistic notifications
  const combinedNotifications = useMemo(() => {
    const serverNotifications = result.data?.data?.notifications ?? [];
    console.log("Server notifications:", serverNotifications);
    console.log("Optimistic notifications:", optimisticNotifications);

    if (optimisticNotifications.length === 0) {
      console.log(
        "No optimistic notifications, returning server notifications"
      );
      return serverNotifications;
    }

    // Filter out optimistic notifications that are now in server data
    const filteredOptimistic = optimisticNotifications.filter(
      (opt) => !serverNotifications.some((server) => server._id === opt._id)
    );

    const combined = [...filteredOptimistic, ...serverNotifications];
    console.log("Combined notifications:", combined);
    return combined;
  }, [result.data?.data?.notifications, optimisticNotifications]);

  // Calculate optimistic unread count
  const optimisticUnreadCount = useMemo(() => {
    const serverUnreadCount = result.data?.data?.metadata?.unreadCount ?? 0;
    const optimisticUnreadCount = optimisticNotifications.length;
    const total = serverUnreadCount + optimisticUnreadCount;

    console.log("Unread count calculation:", {
      serverUnreadCount,
      optimisticUnreadCount,
      total
    });

    return total;
  }, [result.data?.data?.metadata?.unreadCount, optimisticNotifications]);

  return {
    notifications: combinedNotifications,
    pagination: result.data?.data?.pagination ?? {
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false
    },
    summary: {
      ...result.data?.data?.metadata,
      unreadCount: optimisticUnreadCount
    },
    isLoading: result.isPending,
    error: result.error,
    refetch: result.refetch,
    addOptimisticNotification,
    clearOptimisticNotifications
  };
}
