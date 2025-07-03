"use client";

import { useState } from "react";
import {
  NotificationBell,
  NotificationPermissionRequest
} from "@/components/notifications";
import {
  useNotifications,
  useMarkAllNotificationsRead,
  useClearAllNotifications
} from "@/hooks/notifications";
import { useNotificationContext } from "@/providers/NotificationProvider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function NotificationsDemo() {
  const [showPermissionRequest, setShowPermissionRequest] = useState(false);
  const { isPermissionGranted, deviceToken, initializeFCM } =
    useNotificationContext();
  const { notifications, pagination, summary, isLoading, refetch } =
    useNotifications({
      page: 1,
      limit: 10
    });
  const { markAllAsRead, isLoading: isMarkingAll } =
    useMarkAllNotificationsRead();
  const { clearAll, isLoading: isClearing } = useClearAllNotifications();

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
    refetch();
  };

  const handleClearAll = async () => {
    await clearAll();
    refetch();
  };

  const handleRequestPermission = async () => {
    const granted = await initializeFCM();
    if (granted) {
      setShowPermissionRequest(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notifications Demo</h1>
        <NotificationBell />
      </div>

      {/* Permission Status */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Permission Status</CardTitle>
          <CardDescription>
            Current status of notification permissions and FCM setup
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Badge variant={isPermissionGranted ? "default" : "destructive"}>
              {isPermissionGranted ? "Granted" : "Not Granted"}
            </Badge>
            <span className="text-sm text-gray-600">
              {isPermissionGranted
                ? "Notifications are enabled"
                : "Notifications are disabled"}
            </span>
          </div>

          {deviceToken && (
            <div className="bg-gray-100 p-3 rounded">
              <p className="text-sm font-medium">Device Token:</p>
              <p className="text-xs text-gray-600 break-all">{deviceToken}</p>
            </div>
          )}

          {!isPermissionGranted && (
            <Button onClick={() => setShowPermissionRequest(true)}>
              Request Permission
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Notification Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Summary</CardTitle>
          <CardDescription>Overview of your notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {summary.totalCount}
              </div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {summary.unreadCount}
              </div>
              <div className="text-sm text-gray-600">Unread</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {summary.readCount}
              </div>
              <div className="text-sm text-gray-600">Read</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Actions</CardTitle>
          <CardDescription>Manage your notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button
              onClick={handleMarkAllAsRead}
              disabled={isMarkingAll || summary.unreadCount === 0}
            >
              {isMarkingAll ? "Marking..." : "Mark All as Read"}
            </Button>
            <Button
              variant="destructive"
              onClick={handleClearAll}
              disabled={isClearing || summary.totalCount === 0}
            >
              {isClearing ? "Clearing..." : "Clear All"}
            </Button>
            <Button variant="outline" onClick={() => refetch()}>
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>Your latest notifications</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No notifications found
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg ${
                    !notification.isRead
                      ? "bg-blue-50 border-blue-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4
                          className={`font-medium ${
                            !notification.isRead
                              ? "text-gray-900"
                              : "text-gray-600"
                          }`}
                        >
                          {notification.title}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {notification.priority}
                        </Badge>
                        {!notification.isRead && (
                          <Badge variant="default" className="text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>
                          {new Date(
                            notification.createdAt
                          ).toLocaleDateString()}
                        </span>
                        <span>{notification.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Permission Request Modal */}
      {showPermissionRequest && (
        <NotificationPermissionRequest
          onComplete={() => setShowPermissionRequest(false)}
          onSkip={() => setShowPermissionRequest(false)}
        />
      )}
    </div>
  );
}
