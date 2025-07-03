"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { NotificationsPanel } from "./NotificationsPanel";

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const { summary } = useNotifications({ limit: 1 }); // Just get summary

  const unreadCount = summary.unreadCount;

  return (
    <div className="relative">
      <Button
        variant="icons"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-[0.3rem] -right-[0.5rem] border border-white bg-red text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </Button>

      {isOpen && <NotificationsPanel onClose={() => setIsOpen(false)} />}
    </div>
  );
}
