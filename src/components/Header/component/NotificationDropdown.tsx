"use client";
import React, { useState, useRef, useEffect } from "react";
import { Bell, Check, Trash2, TableOfContents, CheckCircle,Package,SquareUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

const notifications = [
  {
    title: "Sarah Johnson completed onboarding",
    message:
      "New Marketing Specialist Sarah Johnson (sarah.johnson@company.com) has completed onboarding process. Please verify her documents and approve her account access.",
    time: "5 minutes ago",
    action: true,
    read: false,
    icon: <SquareUserRound className="text-blue-600" size={24} />,
  },
  {
    title: "Contract requires your approval",
    message:
      "Client contract #CT-2024-0156 with TechCorp Inc. (value: $45,000) is ready for final approval. Legal team has completed review.",
    time: "12 minutes ago",
    action: true,
    read: false,
    icon: <SquareUserRound className="text-blue-600" size={24} />,
  },
  {
    title: "Leave request needs approval",
    message:
      "Mike Chen requested vacation leave from Dec 23-30, 2024 (5 business days). Team coverage arranged with Jennifer.",
    time: "30 minutes ago",
    action: false,
    read: true,
    icon: <Package className="text-yellow-600" size={24} />,
  }
];

export const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !(ref.current as any).contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="icons"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell size={18} />
        <span className="absolute -top-[0.3rem] -right-[0.5rem] border border-white bg-red text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
          8
        </span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[370px] bg-white shadow rounded-md z-50">
          <div className="flex items-start flex-col justify-between gap-2 px-4 py-3 border-b">
            <div className="flex justify-between items-center w-full">
              <span className="font-semibold text-lg">Notifications</span>
              <span className="text-xs font-bold text-[#787878] bg-[#EBFEFF] px-2 py-1 rounded-lg">
                8 new
              </span>
            </div>
            <div className="flex gap-3">
              <Button variant="icons" className="text-xs p-4 h-4">
                <Check size={15} />
                Mark All Read
              </Button>
              <Button variant="destructive" className="text-xs p-4 h-4">
                <Trash2 size={15} />
                Clear All
              </Button>
            </div>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {notifications.map((note, idx) => (
              <div
                key={idx}
                    className={`flex gap-3 p-4 border-b ${
                  note.read
                    ? "bg-white text-gray-800"
                    : "bg-yellow-100 text-gray-900"
                }`}
              >
                <div className="pt-1">{note.icon}</div>
                <div className="flex-1">
                     <div className="flex items-start justify-between">
                         <p className="font-semibold text-sm mb-1">{note.title}</p>
                             {!note.read ? (
                      <span className="w-2 h-2 rounded-full bg-blue-600 mt-1"></span>
                    ) : (
                      <CheckCircle className="text-blue-600" size={16} />
                    )}
                     </div>
                     
                <p className="text-sm text-gray-700 mb-2">{note.message}</p>
                {note.action && (
                  <Button variant="icons" className="text-sm mb-2 px-4 h-8">
                    <TableOfContents />
                    Take Action
                  </Button>
                )}
                <p className="text-xs text-gray-500">{note.time}</p>
                </div>
               
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
