"use client";
import React, { useState } from "react";
import StaffDetailSideBar from "@/components/ui/admin/staff-detail-sidebar";
import FormProgress from "@/components/ui/admin/form-progress";
import FormNavigation from "@/components/ui/admin/form-navigation";
import { useStaffFormStore } from "@/stores/staffFormStore";
import CircularProgress from "@/components/ui/CircularProgress";
import { useToggleVerification } from "@/hooks/staff/useToggleVerification";
import { useToggleActivation } from "@/hooks/staff/useToggleActivation";
import ToggleSwitch from "@/components/ui/admin/toggle-switch";

export default function StaffDetailsLayout({
  children
}: {
  children: React.ReactNode;
}) {
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
    } catch (error) {
      console.error("Failed to toggle verification:", error);
    }
  };

  const handleActivationToggle = async () => {
    if (isCreateMode || !staffId) return;

    try {
      await toggleActivation(staffId);
      // Update the local state after successful toggle
      setActive(!active);
    } catch (error) {
      console.error("Failed to toggle activation:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-12 mb-6">
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
        <div className="col-span-6 flex flex-col items-end gap-4">
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
