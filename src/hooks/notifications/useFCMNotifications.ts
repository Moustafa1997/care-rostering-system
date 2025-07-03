import { useEffect, useState, useRef } from "react";
import {
  requestNotificationPermission,
  onMessageListener
} from "@/lib/firebase";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  useRegisterDevice,
  useUnregisterDevice
} from "./useDeviceRegistration";
import { useToast } from "@/hooks/use-toast";
import {
  detectBrowser,
  getTroubleshootingSteps,
  checkServiceWorkerRegistration,
  registerServiceWorker,
  getBrowserCompatibilityStatus
} from "@/utils/browserCompatibility";

export function useFCMNotifications() {
  const [isPermissionGranted, setIsPermissionGranted] = useState<
    boolean | null
  >(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [browserInfo, setBrowserInfo] = useState(detectBrowser());
  const [compatibilityStatus, setCompatibilityStatus] = useState(
    getBrowserCompatibilityStatus()
  );
  const { success, error: showError } = useToast();
  const initializationRef = useRef(false);
  const tokenRegistrationRef = useRef(false);

  const { deviceToken, setDeviceToken } = useAuthStore();
  const { registerDevice, isLoading: isRegistering } = useRegisterDevice();
  const { unregisterDevice, isLoading: isUnregistering } =
    useUnregisterDevice();

  // Subscribe to auth store hydration state
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const user = useAuthStore((state) => state.user);

  // Debug: Log device token state on mount
  useEffect(() => {
    console.log("FCM Hook - Device token state:", {
      deviceToken: deviceToken ? deviceToken.substring(0, 20) + "..." : "null",
      isHydrated,
      user: user ? user.email : "null",
      isInitialized,
      browser: browserInfo.name,
      compatibility: compatibilityStatus.isCompatible
    });
  }, [
    deviceToken,
    isHydrated,
    user,
    isInitialized,
    browserInfo,
    compatibilityStatus
  ]);

  // Initialize FCM and request permission
  const initializeFCM = async (): Promise<boolean> => {
    // Prevent multiple initializations
    if (initializationRef.current) {
      console.log("FCM initialization already in progress, skipping...");
      return isPermissionGranted === true;
    }

    try {
      initializationRef.current = true;
      console.log("Starting FCM initialization...");

      // Check browser compatibility first
      if (!compatibilityStatus.isCompatible) {
        console.warn(
          "Browser compatibility issues detected:",
          compatibilityStatus.issues
        );
        showError(
          `Browser compatibility issues: ${compatibilityStatus.issues.join(", ")}`
        );

        // Show troubleshooting steps for Brave
        if (browserInfo.isBrave) {
          const steps = getTroubleshootingSteps(browserInfo);
          console.log("Brave troubleshooting steps:", steps);
        }

        return false;
      }

      if (!("Notification" in window)) {
        showError("This browser does not support notifications");
        return false;
      }

      // Check service worker registration for Brave
      if (browserInfo.isBrave) {
        console.log("Checking service worker registration for Brave...");
        const swStatus = await checkServiceWorkerRegistration();

        if (!swStatus.isRegistered) {
          console.log(
            "Service worker not registered, attempting to register..."
          );
          const registrationResult = await registerServiceWorker();

          if (!registrationResult.success) {
            console.error(
              "Failed to register service worker:",
              registrationResult.error
            );
            showError(
              "Failed to initialize notifications. Please check browser settings."
            );
            return false;
          }
        }
      }

      // Check if permission is already granted
      if (Notification.permission === "granted") {
        setIsPermissionGranted(true);
        console.log("Notification permission already granted");

        // Get the current device token from the store
        const currentDeviceToken = useAuthStore.getState().deviceToken;
        console.log(
          "Current device token from store:",
          currentDeviceToken
            ? currentDeviceToken.substring(0, 20) + "..."
            : "null"
        );

        // If we already have a device token in the store, use it and register if needed
        if (currentDeviceToken) {
          console.log(
            "Using existing device token from auth store:",
            currentDeviceToken.substring(0, 20) + "..."
          );

          // Only register device if we haven't already registered this token
          if (!tokenRegistrationRef.current) {
            console.log("Registering existing device token with backend...");
            tokenRegistrationRef.current = true;
            await registerDevice(currentDeviceToken);
          } else {
            console.log(
              "Device token already registered, skipping registration"
            );
          }

          return true;
        } else {
          console.log(
            "No existing device token found in store, will request new one"
          );
        }
      } else {
        console.log(
          "Notification permission not granted, requesting permission..."
        );
      }

      // Request permission and get new token
      const token = await requestNotificationPermission();

      if (token) {
        console.log("New FCM token obtained:", token.substring(0, 20) + "...");
        setIsPermissionGranted(true);
        setDeviceToken(token);

        // Only register device if we haven't already registered this token
        if (!tokenRegistrationRef.current) {
          console.log("Registering new device token with backend...");
          tokenRegistrationRef.current = true;
          await registerDevice(token);
        }

        success("Notifications enabled successfully");
        return true;
      } else {
        setIsPermissionGranted(false);

        // Provide browser-specific error messages
        if (browserInfo.isBrave) {
          const steps = getTroubleshootingSteps(browserInfo);
          showError(
            "Notification permission denied. Please check Brave settings and try again."
          );
          console.log("Brave troubleshooting steps:", steps);
        } else {
          showError("Notification permission denied");
        }

        return false;
      }
    } catch (error) {
      console.error("Error initializing FCM:", error);
      setIsPermissionGranted(false);

      // Provide browser-specific error handling
      if (browserInfo.isBrave) {
        showError(
          "Failed to initialize notifications in Brave. Please check browser settings."
        );
        const steps = getTroubleshootingSteps(browserInfo);
        console.log("Brave troubleshooting steps:", steps);
      } else {
        showError("Failed to initialize notifications");
      }

      return false;
    } finally {
      initializationRef.current = false;
    }
  };

  // Handle foreground messages
  useEffect(() => {
    if (isPermissionGranted) {
      const unsubscribe = onMessageListener();
      return unsubscribe;
    }
  }, [isPermissionGranted]);

  // Auto-initialize on mount if user is authenticated
  useEffect(() => {
    if (user && isHydrated && !isInitialized && !initializationRef.current) {
      console.log("Auth store hydrated, initializing FCM...");
      initializeFCM().then(() => {
        setIsInitialized(true);
      });
    }
  }, [isInitialized, isHydrated, user]);

  // Handle logout - unregister device
  const handleLogout = async () => {
    try {
      if (deviceToken && !tokenRegistrationRef.current) {
        await unregisterDevice();
        setDeviceToken(null);
        tokenRegistrationRef.current = false;
      }
    } catch (error) {
      console.error("Error unregistering device:", error);
    }
  };

  return {
    isPermissionGranted,
    isInitialized,
    deviceToken,
    browserInfo,
    compatibilityStatus,
    initializeFCM,
    handleLogout,
    isRegistering,
    isUnregistering
  };
}
