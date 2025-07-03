import { useApi } from "@/hooks/general/useApi";
import { useDebounce } from "@/hooks/general/useDebounce";
import { useMemo } from "react";
import { AvailableStaffApiResponse } from "@/types/group";

interface UseAvailableStaffOptions {
  search?: string;
  groupId?: string;
}

export function useAvailableStaff(options: UseAvailableStaffOptions = {}) {
  const { search = "", groupId } = options;
  const debouncedSearch = useDebounce(search, 400);

  const endpoint = useMemo(() => {
    const params = new URLSearchParams();

    // Add search parameter if it exists
    if (debouncedSearch && debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
    }

    // Add group ID if it exists
    if (groupId) {
      params.set("groupId", groupId);
    }

    // Construct the endpoint with all parameters
    const queryString = params.toString();
    return `/groups/manager/available-staff${queryString ? `?${queryString}` : ""}`;
  }, [debouncedSearch, groupId]);

  const { data, error, isPending } = useApi<AvailableStaffApiResponse>(
    endpoint,
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
    availableStaff: data?.data ?? [],
    error,
    isLoading: isPending
  };
}
