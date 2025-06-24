"use client";

import { useState, useRef, useEffect } from "react";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { Staff } from "@/types/staff";

interface ActionDropdownProps {
  // data: Staff;
  data: any;
  onView?: (data: Staff) => void;
  onEdit?: (data: Staff) => void;
  onDelete?: (data: Staff) => void;
}

const options = ["View", "Edit", "Delete"];

export default function ActionDropdown({
  data,
  onView,
  onEdit,
  onDelete
}: ActionDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setOpen(!open);

  const handleAction = (action: string) => {
    switch (action) {
      case "Delete":
        onDelete?.(data);
        break;
    }
    setOpen(false);
  };

  // Create navigation links
  const getStaffDetailLink = (staff: Staff, mode: "edit" | "view") => {
    const params = new URLSearchParams({
      mode,
      staffId: staff._id
    });
    return `/dashboard/admin/team/staff-detail?${params.toString()}`;
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown}>
        <EllipsisVertical className="cursor-pointer" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-md rounded-md z-50">
          <Link
            href={getStaffDetailLink(data, "view")}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            View
          </Link>
          <Link
            href={getStaffDetailLink(data, "edit")}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Edit
          </Link>
          <button
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => handleAction("Delete")}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
