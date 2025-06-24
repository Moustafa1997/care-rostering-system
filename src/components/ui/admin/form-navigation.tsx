import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useStaffFormStore, StaffFormData } from "@/stores/staffFormStore";
import { toast } from "react-hot-toast";
import { useCreateStaff } from "@/hooks/staff/useCreateStaff";
import { useEditStaff } from "@/hooks/staff/useEditStaff";

export default function FormNavigation() {
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
    staffId
  } = useStaffFormStore();

  const { editStaff, isPending: isEditPending } = useEditStaff(staffId || "");

  const handleNext = async () => {
    const currentStepId = steps[currentStep].id;
    const isValid = validateStep(currentStepId);

    if (!isValid) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    // Update current step status
    updateStepStatus(currentStepId, true);

    if (currentStep === steps.length - 1) {
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
      const currentStepId = steps[currentStep].id;
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
        {formMode !== "view" && (
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isPending}
          >
            Save as Draft
          </Button>
        )}
      </div>

      <Button
        variant="default"
        onClick={handleNext}
        disabled={!steps[currentStep].isEnabled || isPending}
      >
        {currentStep === steps.length - 1 ? "Submit" : "Next"}
      </Button>
    </div>
  );
}
