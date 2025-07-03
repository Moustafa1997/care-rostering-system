import { useDebounce } from "@/hooks/general/useDebounce";
import { useApi } from "@/hooks/general/useApi";
import { useMemo } from "react";
import { GroupsApiResponse, GroupFilters } from "@/types/group";

export function useGroups(
  page: number,
  limit: number,
  search: string,
  filters: GroupFilters
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
    if (filters.search) {
      params.set("search", filters.search);
    }

    // Construct the endpoint with all parameters
    const queryString = params.toString();
    return `/groups/manager${queryString ? `?${queryString}` : ""}`;
  }, [page, limit, debouncedSearch, filters]);

  const { data, error, isPending } = useApi<GroupsApiResponse>(endpoint, {
    method: "GET",
    queryOptions: {
      retry: 1,
      refetchOnWindowFocus: false,
      gcTime: 0,
      staleTime: 0
    }
  });

  return {
    groups: data?.data?.groups ?? [],
    page: data?.data?.page ?? 0,
    pages: data?.data?.pages ?? 0,
    total: data?.data?.total ?? 0,
    isLoading: isPending,
    error
  };
}
