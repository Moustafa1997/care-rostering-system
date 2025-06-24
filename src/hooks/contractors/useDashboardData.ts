// hooks/useDashboardData.ts

import { useApi } from "@/hooks/general/useApi";
import { DashboardData } from "@/types/features/dashboard";

export function useDashboardData() {
  const { data, error, isPending } = useApi<DashboardData>(
    "/contractors/admin/dashboard",
    {
      queryOptions: {
        staleTime: 0,
        gcTime: 0,
        retry: 1,
        refetchOnWindowFocus: false
      }
    }
  );

  return {
    summary: data?.data?.summary,
    recentContracts: data?.data?.recentContracts,
    error,
    isLoading: isPending
  };
}
