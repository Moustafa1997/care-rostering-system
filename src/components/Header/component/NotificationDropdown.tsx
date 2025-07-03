"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Check,
  Trash2,
  TableOfContents,
  CheckCircle,
  Package,
  SquareUserRound,
  Info,
  AlertTriangle,
  XCircle,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import {
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
  useClearAllNotifications
} from "@/hooks/notifications/useNotificationActions";
import { Notification } from "@/types/notification";
import { formatDistanceToNow } from "date-fns";

// Icon mapping utility
const getNotificationIcon = (type: string, priority: string) => {
  const iconProps = { size: 24 };

  switch (type) {
    case "success":
      return <CheckCircle2 className="text-green-600" {...iconProps} />;
    case "warning":
      return <AlertTriangle className="text-yellow-600" {...iconProps} />;
    case "error":
      return <XCircle className="text-red-600" {...iconProps} />;
    case "info":
    default:
      // Use priority to determine color for info type
      switch (priority) {
        case "high":
          return <Info className="text-red-600" {...iconProps} />;
        case "medium":
          return <Info className="text-yellow-600" {...iconProps} />;
        default:
          return <Info className="text-blue-600" {...iconProps} />;
      }
  }
};

export const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();

  // Get notifications data with optimistic updates enabled
  const {
    notifications,
    summary,
    isLoading,
    refetch,
    addOptimisticNotification
  } = useNotifications({
    limit: 10,
    enableOptimisticUpdates: true
  });

  // Get action hooks
  const { markAsRead } = useMarkNotificationRead();
  const { markAllAsRead, isLoading: isMarkingAll } =
    useMarkAllNotificationsRead();
  const { clearAll, isLoading: isClearing } = useClearAllNotifications();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !(ref.current as any).contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = async (notification: Notification) => {
    if (!notification.isRead) {
      await markAsRead(notification._id);
      refetch();
    }
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
    refetch();
  };

  const handleClearAll = async () => {
    await clearAll();
    refetch();
  };

  const handleActionClick = (notification: Notification) => {
    // Handle action redirect based on notification metadata
    if (notification.actionUrl) {
      router.replace(notification.actionUrl);
    }

    // Mark as read when action is taken
    if (!notification.isRead) {
      handleMarkAsRead(notification);
    }

    // Close dropdown
    setIsOpen(false);
  };

  const unreadCount = summary.unreadCount;

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="icons"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-[0.3rem] -right-[0.5rem] border border-white bg-red text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow animate-pulse">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[370px] bg-white shadow rounded-md z-50">
          <div className="flex items-start flex-col justify-between gap-2 px-4 py-3 border-b">
            <div className="flex justify-between items-center w-full">
              <span className="font-semibold text-lg">Notifications</span>
              {unreadCount > 0 && (
                <span className="text-xs font-bold text-[#787878] bg-[#EBFEFF] px-2 py-1 rounded-lg">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                variant="icons"
                className="text-xs p-4 h-4"
                onClick={handleMarkAllAsRead}
                disabled={isMarkingAll || unreadCount === 0}
              >
                <Check size={15} />
                Mark All Read
              </Button>
              <Button
                variant="destructive"
                className="text-xs p-4 h-4"
                onClick={handleClearAll}
                disabled={isClearing || notifications.length === 0}
              >
                <Trash2 size={15} />
                Clear All
              </Button>
            </div>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`flex gap-3 p-4 border-b ${
                    notification.isRead
                      ? "bg-white text-gray-800"
                      : "bg-yellow-100 text-gray-900"
                  } ${notification._id.startsWith("test-") ? "border-l-4 border-l-blue-500" : ""}`}
                >
                  <div className="pt-1">
                    {getNotificationIcon(
                      notification.type,
                      notification.priority
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <p className="font-semibold text-sm mb-1">
                        {notification.title}
                        {notification._id.startsWith("test-") && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            Optimistic
                          </span>
                        )}
                      </p>
                      {!notification.isRead ? (
                        <span className="w-2 h-2 rounded-full bg-blue-600 mt-1"></span>
                      ) : (
                        <CheckCircle className="text-blue-600" size={16} />
                      )}
                    </div>

                    <p className="text-sm text-gray-700 mb-2">
                      {notification.body}
                    </p>
                    {notification.actionUrl && (
                      <Button
                        variant="icons"
                        className="text-sm mb-2 px-4 h-8"
                        onClick={() => handleActionClick(notification)}
                      >
                        <TableOfContents />
                        Take Action
                      </Button>
                    )}
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
