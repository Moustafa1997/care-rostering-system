import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useStaffFormStore, StaffFormData } from "@/stores/staffFormStore";
import { toast } from "react-hot-toast";
import { useCreateStaff } from "@/hooks/staff/useCreateStaff";
import { useEditStaff } from "@/hooks/staff/useEditStaff";

export default function FormNavigation() {
  console.time("FormNavigation component render");

  // Track rerenders
  const renderCount = useRef(0);
  renderCount.current += 1;

  useEffect(() => {
    console.log(`🔄 FormNavigation rerendered ${renderCount.current} times`);
  });

  const router = useRouter();
  const { createStaff, isPending: isCreatePending } = useCreateStaff();
  const {
    currentStep,
    steps,
    validateStep,
    saveAsDraft,
    submitForm,
    setCurrentStep,
    updateStepStatus,
    resetForm,
    formMode,
    staffId,
    formData
  } = useStaffFormStore();

  const { editStaff, isPending: isEditPending } = useEditStaff(staffId || "");

  // Add bounds checking to ensure currentStep is valid
  const isValidStep = currentStep >= 0 && currentStep < steps.length;
  const currentStepData = isValidStep ? steps[currentStep] : null;

  const handleNext = async () => {
    // Check if current step is valid
    if (!isValidStep || !currentStepData) {
      console.error(
        "Invalid current step:",
        currentStep,
        "Steps length:",
        steps.length
      );
      toast.error("Invalid form state. Please refresh the page.");
      return;
    }

    const currentStepId = currentStepData.id;
    const isValid = validateStep(currentStepId);

    if (!isValid) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    // Update current step status
    updateStepStatus(currentStepId, true);

    if (currentStep === steps.length - 1 && formMode !== "view") {
      // Submit form on last step
      try {
        if (formMode === "edit" || formMode === "edit-draft") {
          if (!staffId) {
            toast.error("Staff ID is missing");
            return;
          }
          await submitForm(editStaff);
        } else {
          await submitForm(createStaff);
        }
        resetForm();
        toast.success("Form submitted successfully!");
      } catch (error: any) {
        toast.error(
          error.error ||
            error.message ||
            "Failed to submit form. Please try again."
        );
      }
    } else {
      // Move to next step
      const nextStep = currentStep + 1;

      // Check if next step is valid
      if (nextStep >= steps.length) {
        console.error(
          "Next step out of bounds:",
          nextStep,
          "Steps length:",
          steps.length
        );
        toast.error("Invalid form state. Please refresh the page.");
        return;
      }

      // Enable the next step
      const updatedSteps = steps.map((step, index) => ({
        ...step,
        isEnabled: index <= nextStep
      }));

      setCurrentStep(nextStep);
      router.push(steps[nextStep].path);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      router.push(steps[prevStep].path);
    }
  };

  const handleSaveDraft = async () => {
    try {
      // Check if current step is valid
      if (!isValidStep || !currentStepData) {
        console.error(
          "Invalid current step:",
          currentStep,
          "Steps length:",
          steps.length
        );
        toast.error("Invalid form state. Please refresh the page.");
        return;
      }

      const currentStepId = currentStepData.id;
      const isValid = validateStep(currentStepId);

      if (!isValid) {
        toast.error("Please fill in all required fields correctly");
        return;
      }

      // Update current step status
      updateStepStatus(currentStepId, true);

      const filledData = saveAsDraft();
      if (Object.keys(filledData).length <= 1) {
        // Only contains saveAsDraft flag
        toast.error("Please fill in at least one field before saving as draft");
        return;
      }
      console.log("filledData", filledData);
      if (formMode !== "create") {
        if (!staffId) {
          toast.error("Staff ID is missing");
          return;
        }
        await editStaff(filledData as StaffFormData);
      } else {
        await createStaff(filledData as StaffFormData);
      }
    } catch (error: any) {
      console.error("Error saving draft:", error);
      toast.error(
        error.error ||
          error.message ||
          "Failed to save draft. Please try again."
      );
    }
  };

  const isPending = isCreatePending || isEditPending;

  console.timeEnd("FormNavigation component render");

  // Don't render if current step is invalid
  if (!isValidStep || !currentStepData) {
    console.error("FormNavigation: Invalid step state", {
      currentStep,
      stepsLength: steps.length
    });
    return null;
  }

  return (
    <div className="mt-8 flex justify-between items-center">
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Back
        </Button>
        {formMode !== "view" &&
          (formMode === "create" || formData.saveAsDraft) && (
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={
                isPending || (formMode !== "create" && !formData.saveAsDraft)
              }
            >
              Save as Draft
            </Button>
          )}
      </div>

      {formMode !== "view" && (
        <Button
          variant="default"
          onClick={handleNext}
          disabled={!currentStepData.isEnabled || isPending}
        >
          {currentStep === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      )}
    </div>
  );
}
