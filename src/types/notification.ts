export interface Notification {
  _id: string;
  title: string;
  body: string;
  type: "info" | "success" | "warning" | "error";
  priority: "low" | "medium" | "high";
  isRead: boolean;
  userId: string;
  userRole: string;
  actionUrl: string;
  createdAt: string;
  updatedAt: string;
  readAt: string | null;
}

export interface NotificationPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface NotificationSummary {
  unreadCount: number;
}

export interface NotificationsResponse {
  success: boolean;
  data: {
    notifications: Notification[];
    pagination: NotificationPagination;
    metadata: NotificationSummary;
  };
  message: string;
}

export interface RegisterDeviceRequest {
  fcmToken: string;
  deviceType: "web" | "android" | "ios";
}

export interface RegisterDeviceResponse {
  success: boolean;
  message: string;
  data?: {
    device: {
      id: string;
      fcmToken: string;
      deviceType: "web" | "android" | "ios";
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface UnregisterDeviceResponse {
  success: boolean;
  message: string;
}
