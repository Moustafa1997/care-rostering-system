import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/general/useApi";
import { useToast } from "@/hooks/use-toast";
import { UseMutationResult } from "@tanstack/react-query";
import { useEffect } from "react";

interface FillByStaffResponse {
  data: {
    status: string;
    message: string;
  };
}

interface FillByStaffData {
  email: string;
}

export function useFillByStaff() {
  const router = useRouter();
  const { success, error: showError } = useToast();

  const result = useApi<FillByStaffResponse, FillByStaffData>(
    "/staff/manager/send-invitation",
    {
      method: "POST"
    }
  ) as UseMutationResult<FillByStaffResponse, Error, FillByStaffData>;

  const { mutateAsync, isPending, error } = result;

  const fillByStaff = async (email: string): Promise<void> => {
    console.log("Sending fill by staff invitation to:", email);
    const data = await mutateAsync({ email });
    success("Invitation sent successfully to staff member!");
    router.push("/dashboard/admin/team");
  };

  return {
    fillByStaff,
    isPending,
    error
  };
}
