"use client";

import { NotificationBell } from "@/components/notifications";
import { useAuthStore } from "@/stores/useAuthStore";

export function HeaderWithNotifications() {
  const { user } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">Your App</h1>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </a>
            <a href="/profile" className="text-gray-600 hover:text-gray-900">
              Profile
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Only show notification bell if user is authenticated */}
          {user && <NotificationBell />}

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Welcome, {user?.email}
            </span>
            <button className="text-sm text-red-600 hover:text-red-700">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
