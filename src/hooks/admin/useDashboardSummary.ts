import { useApi } from "@/hooks/general/useApi";

interface DashboardSummaryResponse {
  data: {
    summary: {
      total: number;
      active: number;
      inactive: number;
      availabilityPending: number;
      availabilityDone: number;
    };
    roleDistribution: Record<string, any>;
    recentStaff: any[];
  };
}

export function useDashboardSummary() {
  const { data, error, isPending } = useApi<DashboardSummaryResponse>(
    "/staff/manager/dashboard",
    {
      queryOptions: {
        retry: 1,
        refetchOnWindowFocus: false,
        gcTime: 0,
        staleTime: 0
      }
    }
  );

  return {
    summary: data?.data?.summary,
    roleDistribution: data?.data?.roleDistribution,
    recentStaff: data?.data?.recentStaff,
    error,
    isLoading: isPending
  };
}
