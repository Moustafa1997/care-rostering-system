// Browser compatibility utilities for FCM notifications

export interface BrowserInfo {
  name: string;
  version: string;
  isBrave: boolean;
  isChrome: boolean;
  isFirefox: boolean;
  isSafari: boolean;
  isEdge: boolean;
  supportsServiceWorker: boolean;
  supportsPushManager: boolean;
  supportsNotifications: boolean;
  notificationPermission: NotificationPermission;
}

export const detectBrowser = (): BrowserInfo => {
  // Check if we're in a browser environment
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    // Return default values for server-side rendering
    return {
      name: "unknown",
      version: "unknown",
      isBrave: false,
      isChrome: false,
      isFirefox: false,
      isSafari: false,
      isEdge: false,
      supportsServiceWorker: false,
      supportsPushManager: false,
      supportsNotifications: false,
      notificationPermission: "denied"
    };
  }

  const userAgent = navigator.userAgent;
  let name = "unknown";
  let version = "unknown";
  let isBrave = false;
  let isChrome = false;
  let isFirefox = false;
  let isSafari = false;
  let isEdge = false;

  // Detect Brave (must be checked before Chrome)
  if (userAgent.includes("Brave")) {
    name = "brave";
    isBrave = true;
    // Extract version from Brave user agent
    const braveMatch = userAgent.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/);
    if (braveMatch) {
      version = braveMatch[1];
    }
  } else if (userAgent.includes("Chrome")) {
    name = "chrome";
    isChrome = true;
    const chromeMatch = userAgent.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/);
    if (chromeMatch) {
      version = chromeMatch[1];
    }
  } else if (userAgent.includes("Firefox")) {
    name = "firefox";
    isFirefox = true;
    const firefoxMatch = userAgent.match(/Firefox\/(\d+\.\d+)/);
    if (firefoxMatch) {
      version = firefoxMatch[1];
    }
  } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    name = "safari";
    isSafari = true;
    const safariMatch = userAgent.match(/Version\/(\d+\.\d+)/);
    if (safariMatch) {
      version = safariMatch[1];
    }
  } else if (userAgent.includes("Edge")) {
    name = "edge";
    isEdge = true;
    const edgeMatch = userAgent.match(/Edge\/(\d+\.\d+\.\d+)/);
    if (edgeMatch) {
      version = edgeMatch[1];
    }
  }

  return {
    name,
    version,
    isBrave,
    isChrome,
    isFirefox,
    isSafari,
    isEdge,
    supportsServiceWorker: "serviceWorker" in navigator,
    supportsPushManager: "PushManager" in window,
    supportsNotifications: "Notification" in window,
    notificationPermission:
      "Notification" in window ? Notification.permission : "denied"
  };
};

export const getBraveTroubleshootingSteps = (): string[] => {
  return [
    "1. **Disable Brave Shields**: Click the Brave Shields icon in the address bar and set it to 'Down' for this site",
    "2. **Allow Notifications**: Go to Site Settings > Notifications > Allow",
    "3. **Check Brave Settings**: Open brave://settings/content/notifications and ensure notifications are enabled",
    "4. **Disable Extensions**: Temporarily disable ad blockers or privacy extensions",
    "5. **Check Site Permissions**: Go to brave://settings/content/siteDetails and ensure this site has notification permissions",
    "6. **Restart Browser**: Sometimes a browser restart is needed after changing settings"
  ];
};

export const getChromeTroubleshootingSteps = (): string[] => {
  return [
    "1. **Check Site Settings**: Click the lock icon in the address bar > Site Settings > Notifications > Allow",
    "2. **Check Browser Settings**: Go to chrome://settings/content/notifications and ensure notifications are enabled",
    "3. **Disable Extensions**: Temporarily disable ad blockers or privacy extensions",
    "4. **Check Site Permissions**: Go to chrome://settings/content/siteDetails and ensure this site has notification permissions"
  ];
};

export const getTroubleshootingSteps = (browserInfo: BrowserInfo): string[] => {
  if (browserInfo.isBrave) {
    return getBraveTroubleshootingSteps();
  } else if (browserInfo.isChrome) {
    return getChromeTroubleshootingSteps();
  } else {
    return [
      "1. **Check Browser Settings**: Ensure notifications are enabled in your browser settings",
      "2. **Check Site Permissions**: Allow notifications for this site",
      "3. **Disable Extensions**: Temporarily disable ad blockers or privacy extensions",
      "4. **Update Browser**: Ensure you're using the latest version of your browser"
    ];
  }
};

export const checkServiceWorkerRegistration = async (): Promise<{
  isRegistered: boolean;
  error?: string;
}> => {
  try {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return { isRegistered: false, error: "Not in browser environment" };
    }

    if (!("serviceWorker" in navigator)) {
      return { isRegistered: false, error: "Service Worker not supported" };
    }

    const registration = await navigator.serviceWorker.getRegistration(
      "/firebase-messaging-sw.js"
    );
    return { isRegistered: !!registration };
  } catch (error) {
    return {
      isRegistered: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};

export const registerServiceWorker = async (): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return { success: false, error: "Not in browser environment" };
    }

    if (!("serviceWorker" in navigator)) {
      return { success: false, error: "Service Worker not supported" };
    }

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );
    console.log("Service Worker registered successfully:", registration);
    return { success: true };
  } catch (error) {
    console.error("Service Worker registration failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};

export const getBrowserCompatibilityStatus = (): {
  isCompatible: boolean;
  issues: string[];
  recommendations: string[];
} => {
  // Check if we're in a browser environment
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return {
      isCompatible: false,
      issues: ["Not in browser environment"],
      recommendations: ["This function should only be called in the browser"]
    };
  }

  const browserInfo = detectBrowser();
  const issues: string[] = [];
  const recommendations: string[] = [];

  // Check basic compatibility
  if (!browserInfo.supportsServiceWorker) {
    issues.push("Service Worker not supported");
  }

  if (!browserInfo.supportsPushManager) {
    issues.push("Push Manager not supported");
  }

  if (!browserInfo.supportsNotifications) {
    issues.push("Notifications not supported");
  }

  // Browser-specific checks
  if (browserInfo.isBrave) {
    if (browserInfo.notificationPermission === "denied") {
      issues.push("Brave Shields may be blocking notifications");
      recommendations.push("Disable Brave Shields for this site");
    }
    recommendations.push("Check brave://settings/content/notifications");
  }

  if (browserInfo.isSafari) {
    issues.push("Safari has limited support for web push notifications");
    recommendations.push(
      "Consider using Chrome or Firefox for better notification support"
    );
  }

  const isCompatible = issues.length === 0;

  return {
    isCompatible,
    issues,
    recommendations
  };
};
