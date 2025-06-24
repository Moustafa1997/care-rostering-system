import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/general/useApi";
import { useToast } from "@/hooks/use-toast";
import { UseMutationResult } from "@tanstack/react-query";
import { StaffFormData, useStaffFormStore } from "@/stores/staffFormStore";

interface StaffResponse {
  data: {
    status: string;
    message: string;
    staff: any; // Replace with proper staff type when available
  };
}

export function useCreateStaff() {
  const router = useRouter();
  const { success, error: showError } = useToast();
  const { resetFormAfterDraftSave } = useStaffFormStore();

  const result = useApi<StaffResponse, StaffFormData>("/staff/manager", {
    method: "POST"
  }) as UseMutationResult<StaffResponse, Error, StaffFormData>;

  const { mutateAsync, isPending, error } = result;

  const createStaff = async (formData: StaffFormData): Promise<void> => {
    console.log("formData", formData);
    const data = await mutateAsync(formData);
    if (data.data.staff.saveAsDraft) {
      success("Draft saved successfully!");
      resetFormAfterDraftSave();
      router.push("/dashboard/admin/team");
    } else {
      success("Staff created successfully!");
      router.push("/dashboard/admin/team");
    }
  };

  return {
    createStaff,
    isPending,
    error
  };
}
