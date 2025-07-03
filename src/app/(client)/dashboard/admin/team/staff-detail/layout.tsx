"use client";
import React, { useEffect } from "react";
import StaffDetailSideBar from "@/components/ui/admin/staff-detail-sidebar";
import FormProgress from "@/components/ui/admin/form-progress";
import FormNavigation from "@/components/ui/admin/form-navigation";
import { useStaffFormStore } from "@/stores/staffFormStore";
import CircularProgress from "@/components/ui/CircularProgress";
import { useToggleVerification } from "@/hooks/staff/useToggleVerification";
import { useToggleActivation } from "@/hooks/staff/useToggleActivation";
import ToggleSwitch from "@/components/ui/admin/toggle-switch";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function StaffDetailsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // Track rerenders
  const renderCount = React.useRef(0);
  renderCount.current += 1;

  useEffect(() => {
    // Log rerenders for debugging (removed console.log to fix linting)
  });

  const {
    currentStep,
    steps,
    isVerified,
    active,
    formMode,
    progress,
    staffId,
    setIsVerified,
    setActive,
    managerCanEditStatus
  } = useStaffFormStore();

  const { toggleVerification, isPending: isVerificationPending } =
    useToggleVerification();
  const { toggleActivation, isPending: isActivationPending } =
    useToggleActivation();

  const isCreateMode = formMode === "create";

  // Check if onboarding is complete (progress is 100%)
  const isOnboardingComplete = !isCreateMode && progress === 100;

  // Check if switches should be disabled
  const isActivationDisabled =
    !managerCanEditStatus ||
    isCreateMode ||
    isActivationPending ||
    !isOnboardingComplete;
  const isVerificationDisabled =
    !managerCanEditStatus ||
    isCreateMode ||
    isVerificationPending ||
    !isOnboardingComplete;

  const handleVerificationToggle = async () => {
    if (isCreateMode || !staffId) return;

    try {
      await toggleVerification(staffId);
      // Update the local state after successful toggle
      setIsVerified(!isVerified);
    } catch {
      // Handle error silently or with proper error handling
    }
  };

  const handleActivationToggle = async () => {
    if (isCreateMode || !staffId) return;

    try {
      await toggleActivation(staffId);
      // Update the local state after successful toggle
      setActive(!active);
    } catch {
      // Handle error silently or with proper error handling
    }
  };

  const handleBackToTeams = () => {
    router.push("/dashboard/admin/team");
  };

  return (
    <>
      <div className="grid grid-cols-12 mb-6">
        {/* First Row */}
        <div className="col-span-12 mb-4">
          <div className="grid grid-cols-12">
            <div className="col-span-6">
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Team / <span className="text-[#959595]">Staff detail</span>
                </p>
              </div>
              <div>
                <h1 className="text-2xl text-gray-500 font-semibold">
                  Staff detail
                </h1>
              </div>
            </div>
            <div className="col-span-6 flex justify-end items-center">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-black">
                  Onboarding Progress:
                </p>
                <CircularProgress
                  value={
                    !isCreateMode
                      ? progress
                      : Math.round((currentStep / (steps.length - 1)) * 100)
                  }
                  showLabel={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="col-span-12">
          <div className="flex items-center justify-between w-full gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToTeams}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Teams
            </Button>

            <div className="flex flex-col gap-3">
              <div className="flex items-end gap-3">
                <ToggleSwitch
                  isOn={active}
                  onToggle={handleActivationToggle}
                  disabled={isActivationDisabled}
                  disabledReason={
                    !isOnboardingComplete
                      ? "Complete onboarding to edit activation status"
                      : undefined
                  }
                  leftLabel="Active"
                  rightLabel="Inactive"
                />
              </div>
              <div className="flex items-end gap-3">
                <ToggleSwitch
                  isOn={isVerified}
                  onToggle={handleVerificationToggle}
                  disabled={isVerificationDisabled}
                  disabledReason={
                    !isOnboardingComplete
                      ? "Complete onboarding to edit verification status"
                      : undefined
                  }
                  leftLabel="Verified"
                  rightLabel="Unverified"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FormProgress />

      <div className="grid grid-cols-12 gap-4">
        <aside className="col-span-12 lg:col-span-3 3xl:col-span-2 flex flex-col">
          <StaffDetailSideBar />
        </aside>
        <main className="col-span-12 lg:col-span-9 3xl:col-span-10 flex flex-col justify-start bg-slate-50">
          <div className="p-4">
            {children}
            <FormNavigation />
          </div>
        </main>
      </div>
    </>
  );
}
