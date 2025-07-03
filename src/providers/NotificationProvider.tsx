"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { useFCMNotifications } from "@/hooks/notifications/useFCMNotifications";
import { useAuthStore } from "@/stores/useAuthStore";
import { BrowserInfo } from "@/utils/browserCompatibility";

interface NotificationContextType {
  isPermissionGranted: boolean | null;
  isInitialized: boolean;
  deviceToken: string | null;
  browserInfo: BrowserInfo | null;
  compatibilityStatus: {
    isCompatible: boolean;
    issues: string[];
    recommendations: string[];
  } | null;
  initializeFCM: () => Promise<boolean>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();
  const {
    isPermissionGranted,
    isInitialized,
    deviceToken,
    browserInfo,
    compatibilityStatus,
    initializeFCM,
    handleLogout
  } = useFCMNotifications();

  const initializationAttemptedRef = useRef(false);

  // Auto-initialize FCM when user logs in (only once)
  useEffect(() => {
    if (user && !isInitialized && !initializationAttemptedRef.current) {
      initializationAttemptedRef.current = true;
      initializeFCM();
    }
  }, [user, isInitialized, initializeFCM]);

  // Reset initialization flag when user logs out
  useEffect(() => {
    if (!user) {
      initializationAttemptedRef.current = false;
    }
  }, [user]);

  // Handle logout cleanup when user becomes null
  useEffect(() => {
    if (!user && deviceToken) {
      handleLogout();
    }
  }, [user, deviceToken, handleLogout]);

  const value: NotificationContextType = {
    isPermissionGranted,
    isInitialized,
    deviceToken,
    browserInfo,
    compatibilityStatus,
    initializeFCM
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }
  return context;
}
