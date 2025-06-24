import { useDebounce } from "@/hooks/general/useDebounce";
import { useApi } from "@/hooks/general/useApi";
import { useMemo } from "react";
import { Staff, StaffFilters } from "@/types/staff";

interface StaffApiResponse {
  status: string;
  message: string;
  data: {
    staff: Staff[];
    page: number;
    pages: number;
    total: number;
  };
}

export function useStaff(
  page: number,
  limit: number,
  search: string,
  filters: StaffFilters
) {
  const debouncedSearch = useDebounce(search, 400);

  const endpoint = useMemo(() => {
    const params = new URLSearchParams();

    // Always add page and limit
    params.set("page", String(page));
    params.set("limit", String(limit));

    // Add search parameter if it exists
    if (debouncedSearch && debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
    }

    // Add filters if they exist
    if (filters.role) {
      params.set("role", filters.role);
    }
    if (filters.service) {
      params.set("service", filters.service);
    }
    if (filters.status) {
      params.set("status", filters.status);
    }
    if (filters.availabilityStatus) {
      params.set("availabilityStatus", filters.availabilityStatus);
    }
    if (filters.onboardingStatus) {
      params.set("onboardingStatus", filters.onboardingStatus);
    }

    // Construct the endpoint with all parameters
    const queryString = params.toString();
    return `/staff/manager${queryString ? `?${queryString}` : ""}`;
  }, [page, limit, debouncedSearch, filters]);

  const { data, error, isPending } = useApi<StaffApiResponse>(endpoint, {
    method: "GET",
    queryOptions: {
      retry: 1,
      refetchOnWindowFocus: false,
      gcTime: 0,
      staleTime: 0
    }
  });

  return {
    staff: data?.data?.staff ?? [],
    page: data?.data?.page ?? 0,
    pages: data?.data?.pages ?? 0,
    total: data?.data?.total ?? 0,
    isLoading: isPending,
    error
  };
}
