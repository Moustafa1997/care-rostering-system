const fs = require("fs");
const path = require("path");

// Read environment variables
const envPath = path.join(process.cwd(), ".env.local");
let envVars = {};

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const [key, value] = line.split("=");
    if (key && value) {
      envVars[key.trim()] = value.trim();
    }
  });
}

// Generate service worker content
const swContent = `// Firebase messaging service worker
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyAbWfFU50dbQV9Knty7yLxyuaxibD49kEk',
  authDomain: 'care-rostering-system.firebaseapp.com',
  projectId: 'care-rostering-system',
  storageBucket: 'care-rostering-system.firebasestorage.app',
  messagingSenderId: '168907132698',
  appId: '1:168907132698:web:d974c7b2ed9d5a379fa6a3',
  measurementId: 'G-58N9M2ZLDP'
});

console.log('Service Worker: Firebase initialized with config:', {
  projectId: 'care-rostering-system',
  authDomain: 'care-rostering-system.firebaseapp.com',
  apiKey: 'present',
  appId: '1:168907132698:web:d974c7b2ed9d5a379fa6a3',
  measurementId: 'G-58N9M2ZLDP'
});

const messaging = firebase.messaging();
console.log('Service Worker: Firebase messaging initialized');

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);

  const notificationTitle = payload.notification?.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: payload.notification?.icon || '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'fcm-notification',
    data: payload.data || {},
    actions: [
      {
        action: 'open',
        title: 'Open App'
      },
      {
        action: 'close',
        title: 'Close'
      }
    ]
  };

  // Show the notification
  self.registration.showNotification(notificationTitle, notificationOptions);

  // Also dispatch event to foreground app for real-time updates
  // This ensures optimistic updates work even for background messages
  if (payload.notification) {
    const optimisticNotification = {
      _id: \`real-\${Date.now()}\`,
      title: payload.notification.title || 'New Notification',
      body: payload.notification.body || '',
      type: payload.data?.type || 'info',
      priority: payload.data?.priority || 'medium',
      isRead: false,
      createdAt: new Date().toISOString(),
      actionUrl: payload.data?.actionUrl || '',
      userId: payload.data?.userId || '',
      userRole: payload.data?.userRole || ''
    };

    // Try to notify foreground clients
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      clientList.forEach((client) => {
        client.postMessage({
          type: 'fcm-new-message',
          detail: {
            payload,
            timestamp: Date.now(),
            notificationData: payload.data || {},
            optimisticNotification
          }
        });
      });
    });
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);

  event.notification.close();

  if (event.action === 'open' || !event.action) {
    // Open the app when notification is clicked
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
        // Check if there's already a window/tab open with the target URL
        for (const client of clientList) {
          if (client.url.includes('/dashboard') && 'focus' in client) {
            return client.focus();
          }
        }
        
        // If no window/tab is open, open a new one
        if (clients.openWindow) {
          return clients.openWindow('/dashboard');
        }
      })
    );
  }
});

// Handle notification close
self.addEventListener('notificationclose', (event) => {
  console.log('Notification closed:', event);
});
`;

// Write the service worker file
const swPath = path.join(process.cwd(), "public", "firebase-messaging-sw.js");
fs.writeFileSync(swPath, swContent);

console.log("Service worker generated successfully!");
