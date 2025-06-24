import { useApi } from "@/hooks/general/useApi";
import { Staff } from "@/types/staff";

interface StaffDetailsResponse {
  status: string;
  message: string;
  data: {
    staff: Staff;
  };
}

export function useStaffDetails(staffId: string) {
  const { data, error, isPending } = useApi<StaffDetailsResponse>(
    `/staff/manager/${staffId}`,
    {
      method: "GET",
      queryOptions: {
        retry: 1,
        refetchOnWindowFocus: false,
        gcTime: 0,
        staleTime: 0
      }
    }
  );

  return {
    staffDetails: data?.data?.staff,
    isLoading: isPending,
    error
  };
}
