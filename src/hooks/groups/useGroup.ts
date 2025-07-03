import { useApi } from "@/hooks/general/useApi";
import { GroupDetailApiResponse } from "@/types/group";

export function useGroup(groupId: string) {
  const { data, error, isPending } = useApi<GroupDetailApiResponse>(
    `/groups/manager/${groupId}`,
    {
      method: "GET",
      queryOptions: {
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: !!groupId, // Only fetch if groupId exists
        gcTime: 0,
        staleTime: 0
      }
    }
  );

  return {
    group: data?.data,
    error,
    isLoading: isPending
  };
}
