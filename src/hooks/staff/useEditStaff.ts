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

export function useEditStaff(staffId: string) {
  const router = useRouter();
  const { success, error: showError } = useToast();
  const { resetFormAfterDraftSave } = useStaffFormStore();

  const result = useApi<StaffResponse, StaffFormData>(
    `/staff/manager/${staffId}`,
    {
      method: "PUT"
    }
  ) as UseMutationResult<StaffResponse, Error, StaffFormData>;

  const { mutateAsync, isPending, error } = result;

  const editStaff = async (formData: StaffFormData): Promise<void> => {
    console.log("Editing staff with data:", formData);
    const data = await mutateAsync(formData);
    if (data.data.staff.saveAsDraft) {
      success("Draft updated successfully!");
      resetFormAfterDraftSave();
      router.push("/dashboard/admin/team");
    } else {
      success("Staff updated successfully!");
      router.push("/dashboard/admin/team");
    }
  };

  return {
    editStaff,
    isPending,
    error
  };
}
