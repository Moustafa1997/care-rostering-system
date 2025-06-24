"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import StaffDetailsForm from "@/components/Admin-dashboard/Team/StaffDetailsForm/staffDetails";
import { useStaffFormStore } from "@/stores/staffFormStore";
import { useStaffDetails } from "@/hooks/staff/useStaffDetails";

// Component that uses useSearchParams
function StaffDetailContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const staffId = searchParams.get("staffId");
  const { handleEdit, handleView } = useStaffFormStore();

  const { staffDetails, isLoading } = useStaffDetails(staffId || "");

  useEffect(() => {
    if (staffDetails && staffId) {
      if (mode === "edit") {
        handleEdit(staffDetails);
      } else if (mode === "view") {
        handleView(staffDetails);
      }
    }
  }, [staffDetails, staffId, mode, handleEdit, handleView]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <StaffDetailsForm />;
}

// Loading component
function StaffDetailLoading() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

// Main component with Suspense boundary
export default function BasicProfilePage() {
  return (
    <Suspense fallback={<StaffDetailLoading />}>
      <StaffDetailContent />
    </Suspense>
  );
}
