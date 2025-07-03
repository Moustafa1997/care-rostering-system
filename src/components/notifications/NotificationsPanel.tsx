"use client";

import { useState } from "react";
import { X, Check, Trash2, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import {
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
  useClearAllNotifications
} from "@/hooks/notifications/useNotificationActions";
import { Notification } from "@/types/notification";
import { formatDistanceToNow } from "date-fns";

interface NotificationsPanelProps {
  onClose: () => void;
}

export function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { notifications, pagination, summary, isLoading, refetch } =
    useNotifications({
      page: currentPage,
      limit: 10
    });

  const { markAsRead } = useMarkNotificationRead();
  const { markAllAsRead, isLoading: isMarkingAll } =
    useMarkAllNotificationsRead();
  const { clearAll, isLoading: isClearing } = useClearAllNotifications();

  const handleMarkAsRead = async (notification: Notification) => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      default:
        return "ℹ️";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="absolute right-0 top-12 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          {summary.unreadCount > 0 && (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
              {summary.unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {summary.unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              disabled={isMarkingAll}
              className="text-xs"
            >
              <CheckCheck className="h-4 w-4 mr-1" />
              Mark all read
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-64 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-center text-gray-500">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No notifications</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  !notification.isRead ? "bg-blue-50" : ""
                }`}
                onClick={() => handleMarkAsRead(notification)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg">
                    {getNotificationIcon(notification.type)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p
                        className={`text-sm font-medium ${
                          !notification.isRead
                            ? "text-gray-900"
                            : "text-gray-600"
                        }`}
                      >
                        {notification.title}
                      </p>
                      <span
                        className={`text-xs font-medium ${getPriorityColor(notification.priority)}`}
                      >
                        {notification.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true
                        })}
                      </span>
                      {!notification.isRead && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {summary.totalCount} total • {summary.unreadCount} unread
          </div>
          <div className="flex items-center gap-2">
            {pagination.hasPrev && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                className="text-xs"
              >
                Previous
              </Button>
            )}
            {pagination.hasNext && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                className="text-xs"
              >
                Next
              </Button>
            )}
            {summary.totalCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                disabled={isClearing}
                className="text-xs text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear all
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
