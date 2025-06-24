import React from "react";
import { SquarePen, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { Staff } from "@/types/staff";

interface CardViewProps {
  data: Staff[];
  loading?: boolean;
  onDelete?: (data: Staff) => void;
}

export default function CardView({ data, loading, onDelete }: CardViewProps) {
  console.log("CardView received data:", data);

  // Create navigation links
  const getStaffDetailLink = (staff: Staff, mode: "edit" | "view") => {
    const params = new URLSearchParams({
      mode,
      staffId: staff._id
    });
    return `/dashboard/admin/team/staff-detail?${params.toString()}`;
  };

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="text-center py-6">Loading...</div>
      ) : data.length === 0 ? (
        <div className="text-center py-6">No data found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((user, index) => {
            console.log("Rendering user:", user);
            return (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow space-y-2"
              >
                {/* Top Row: Name + Status + Actions */}
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-sm">
                    {user.basicDetails?.firstName || "N/A"}{" "}
                    {user.basicDetails?.lastName || ""}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.active
                          ? "bg-green-100 text-green-800"
                          : user.verified
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.active
                        ? "Active"
                        : user.verified
                          ? "Pending"
                          : "Inactive"}
                    </span>
                    <Link href={getStaffDetailLink(user, "view")}>
                      <Eye
                        size={18}
                        className="text-primaryColors-default cursor-pointer"
                      />
                    </Link>
                    <Link href={getStaffDetailLink(user, "edit")}>
                      <SquarePen
                        size={18}
                        className="text-primaryColors-default cursor-pointer"
                      />
                    </Link>
                    <Trash2
                      size={18}
                      className="text-red cursor-pointer"
                      onClick={() => onDelete?.(user)}
                    />
                  </div>
                </div>

                {/* Info Rows */}
                <div className="text-sm">
                  <div>
                    <strong>Role:</strong>
                  </div>
                  {user.role || "N/A"}
                </div>
                <div className="text-sm">
                  <div>
                    <strong>Phone No:</strong>
                  </div>
                  {user.basicDetails?.phoneNumber || "N/A"}
                </div>
                <div className="text-sm">
                  <div>
                    <strong>Availability status:</strong>
                  </div>
                  {user.availabilityStatus || "N/A"}
                </div>

                {/* Progress */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-2 border-blue-400 flex justify-center items-center text-sm font-semibold text-darkBlue">
                    {user.progress || 0}%
                  </div>
                  <p className="text-xs mt-1">Progress</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
