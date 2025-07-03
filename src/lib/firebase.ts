import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

console.log(
  "%c🔥 FIREBASE MODULE LOADED - DEPLOYMENT CONFIRMED! 🔥",
  "background: red; color: white; font-size: 20px; padding: 10px; border-radius: 5px;"
);
console.log(
  "%c🚀 This proves our changes are being deployed! 🚀",
  "background: green; color: white; font-size: 16px; padding: 8px; border-radius: 5px;"
);
console.log(
  "%c📅 Deployed at: " + new Date().toISOString(),
  "background: blue; color: white; font-size: 14px; padding: 6px; border-radius: 5px;"
);

// Create a visible deployment indicator on the page
if (typeof window !== "undefined") {
  setTimeout(() => {
    const deploymentDiv = document.createElement("div");
    deploymentDiv.innerHTML = `
      <div style="
        position: fixed;
        top: 10px;
        right: 10px;
        background: linear-gradient(45deg, #ff0000, #00ff00, #0000ff);
        color: white;
        padding: 15px;
        border-radius: 10px;
        font-weight: bold;
        font-size: 14px;
        z-index: 9999;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        animation: pulse 2s infinite;
      ">
        🚀 DEPLOYMENT CONFIRMED! 🚀<br>
        Firebase Module Loaded<br>
        ${new Date().toLocaleTimeString()}
      </div>
      <style>
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      </style>
    `;
    document.body.appendChild(deploymentDiv);

    // Remove after 10 seconds
    setTimeout(() => {
      if (deploymentDiv.parentNode) {
        deploymentDiv.parentNode.removeChild(deploymentDiv);
      }
    }, 10000);
  }, 1000);
}

console.log("🔥 Firebase module loaded");
console.log("🔥 initializeApp function:", typeof initializeApp);
console.log("🔥 getMessaging function:", typeof getMessaging);
console.log("🔥 getToken function:", typeof getToken);

const firebaseConfig = {
  apiKey: "AIzaSyAbWfFU50dbQV9Knty7yLxyuaxibD49kEk",
  authDomain: "care-rostering-system.firebaseapp.com",
  projectId: "care-rostering-system",
  storageBucket: "care-rostering-system.firebasestorage.app",
  messagingSenderId: "168907132698",
  appId: "1:168907132698:web:d974c7b2ed9d5a379fa6a3",
  measurementId: "G-58N9M2ZLDP"
};

console.log("🔥 firebaseConfig created:", firebaseConfig);
console.log("🔥 firebaseConfig.projectId:", firebaseConfig.projectId);

// Test object creation
const testObject = {
  test: "value",
  number: 123,
  nested: { key: "value" }
};
console.log("🔥 testObject created:", testObject);
console.log("🔥 testObject.test:", testObject.test);

// Browser detection utility
const detectBrowser = () => {
  const userAgent = navigator.userAgent;

  if (userAgent.includes("Brave")) {
    return "brave";
  } else if (userAgent.includes("Chrome")) {
    return "chrome";
  } else if (userAgent.includes("Firefox")) {
    return "firefox";
  } else if (userAgent.includes("Safari")) {
    return "safari";
  } else if (userAgent.includes("Edge")) {
    return "edge";
  }

  return "unknown";
};

// Check if service worker is supported and available
const isServiceWorkerSupported = () => {
  return "serviceWorker" in navigator && "PushManager" in window;
};

// Check if notifications are supported
const isNotificationSupported = () => {
  return "Notification" in window;
};

// Initialize Firebase
let app;
try {
  console.log("Raw firebaseConfig object:", firebaseConfig);
  console.log("firebaseConfig type:", typeof firebaseConfig);
  console.log("firebaseConfig keys:", Object.keys(firebaseConfig));
  console.log("firebaseConfig.projectId:", firebaseConfig.projectId);
  console.log("firebaseConfig.apiKey:", firebaseConfig.apiKey);

  // Test with inline config to see if the issue is with the object
  const testConfig = {
    apiKey: "AIzaSyAbWfFU50dbQV9Knty7yLxyuaxibD49kEk",
    authDomain: "care-rostering-system.firebaseapp.com",
    projectId: "care-rostering-system",
    storageBucket: "care-rostering-system.firebasestorage.app",
    messagingSenderId: "168907132698",
    appId: "1:168907132698:web:d974c7b2ed9d5a379fa6a3",
    measurementId: "G-58N9M2ZLDP"
  };

  console.log("Test config object:", testConfig);
  console.log("Test config.projectId:", testConfig.projectId);

  app = initializeApp(firebaseConfig);
  console.log("Firebase initialized successfully");
  console.log("Firebase config:", {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    apiKey: firebaseConfig.apiKey ? "present" : "missing",
    appId: firebaseConfig.appId,
    measurementId: firebaseConfig.measurementId
  });
} catch (error) {
  console.error("Failed to initialize Firebase:", error);
  console.error("Firebase config that failed:", firebaseConfig);
  throw error;
}

// Initialize Firebase Cloud Messaging
let messaging: any = null;

if (typeof window !== "undefined") {
  const browser = detectBrowser();
  console.log("Detected browser:", browser);

  // Check for required features
  if (!isServiceWorkerSupported()) {
    console.warn(
      "Service Worker or Push Manager not supported in this browser"
    );
  }

  if (!isNotificationSupported()) {
    console.warn("Notifications not supported in this browser");
  }

  // Brave-specific checks
  if (browser === "brave") {
    console.log("Brave browser detected - applying compatibility fixes");

    // Check if Brave's shields are blocking push notifications
    if (Notification.permission === "denied") {
      console.warn(
        "Brave shields may be blocking notifications. Please check Brave settings."
      );
    }
  }

  try {
    messaging = getMessaging(app);
  } catch (error) {
    console.error("Failed to initialize Firebase Messaging:", error);
  }
}

export { messaging };

// Request permission and get token with enhanced error handling
export const requestNotificationPermission = async (): Promise<
  string | null
> => {
  try {
    if (!messaging) {
      console.warn("Messaging not available");
      return null;
    }

    const browser = detectBrowser();

    // Brave-specific handling
    if (browser === "brave") {
      console.log("Requesting notification permission in Brave browser");

      // Check if service worker is registered
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.getRegistration(
            "/firebase-messaging-sw.js"
          );
          if (!registration) {
            console.warn("Firebase service worker not registered in Brave");
            // Try to register the service worker
            try {
              await navigator.serviceWorker.register(
                "/firebase-messaging-sw.js"
              );
              console.log("Service worker registered successfully in Brave");
            } catch (swError) {
              console.error(
                "Failed to register service worker in Brave:",
                swError
              );
            }
          }
        } catch (error) {
          console.error("Error checking service worker registration:", error);
        }
      }
    }

    // Request permission
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.warn("Notification permission denied");

      // Brave-specific guidance
      if (browser === "brave") {
        console.warn("In Brave browser, please check:");
        console.warn(
          "1. Brave Shields settings (disable for this site if needed)"
        );
        console.warn("2. Site settings > Notifications > Allow");
        console.warn("3. brave://settings/content/notifications");
      }

      return null;
    }

    // Get token with retry logic for Brave
    let token: string | null = null;
    let retryCount = 0;
    const maxRetries = browser === "brave" ? 3 : 1;

    while (!token && retryCount < maxRetries) {
      try {
        console.log("Attempting to get FCM token...");
        const vapidKey =
          process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY ||
          "BFdSRjyrAzq8lJF5PicWS1nBRUdlhiFUT3kq0h4X9XIrZtKAdaQu-cFIoZKNkqSJGSHxvTreBQSWqImE8Y0KTzU";
        console.log("VAPID Key being used:", vapidKey);

        token = await getToken(messaging, {
          vapidKey: vapidKey
        });

        if (token) {
          console.log(
            "FCM Token obtained successfully:",
            token.substring(0, 20) + "..."
          );
          break;
        }
      } catch (error: any) {
        retryCount++;
        console.error(
          `Error getting FCM token (attempt ${retryCount}):`,
          error
        );

        // Log detailed error information
        if (error.code) {
          console.error("Error code:", error.code);
        }
        if (error.message) {
          console.error("Error message:", error.message);
        }
        if (error.details) {
          console.error("Error details:", error.details);
        }

        if (browser === "brave" && retryCount < maxRetries) {
          console.log(`Retrying in 2 seconds... (${retryCount}/${maxRetries})`);
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }
    }

    if (!token) {
      console.error("Failed to get FCM token after all attempts");

      if (browser === "brave") {
        console.error("Brave browser FCM troubleshooting:");
        console.error("1. Disable Brave Shields for this site");
        console.error("2. Allow notifications in site settings");
        console.error("3. Check if any extensions are blocking push services");
      }
    }

    return token;
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
};

// Handle foreground messages
export const onMessageListener = (onNewMessage?: () => void) => {
  if (!messaging) {
    console.warn("Messaging not available - cannot set up message listener");
    return () => {};
  }

  return onMessage(messaging, (payload) => {
    console.log("Message received in foreground:", payload);

    // Show notification even when app is in foreground
    if (payload.notification) {
      const { title, body, icon } = payload.notification;

      new Notification(title || "New Notification", {
        body,
        icon: icon || "/favicon.ico",
        badge: "/favicon.ico",
        tag: "fcm-notification"
      });
    }

    // Trigger callback to refetch notifications
    if (onNewMessage) {
      onNewMessage();
    }

    // Dispatch custom event for global notification refetch with enhanced data
    const event = new CustomEvent("fcm-new-message", {
      detail: {
        payload,
        timestamp: Date.now(),
        notificationData: payload.data || {},
        // Include optimistic notification data if available
        optimisticNotification: payload.notification
          ? {
              _id: `temp-${Date.now()}`,
              title: payload.notification.title || "New Notification",
              body: payload.notification.body || "",
              type: payload.data?.type || "info",
              priority: payload.data?.priority || "medium",
              isRead: false,
              createdAt: new Date().toISOString(),
              actionUrl: payload.data?.actionUrl || "",
              userId: payload.data?.userId || "",
              userRole: payload.data?.userRole || ""
            }
          : null
      }
    });
    window.dispatchEvent(event);
  });
};
