/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/contractors/useContractors.ts

import { useDebounce } from "@/hooks/general/useDebounce";
import { useApi } from "@/hooks/general/useApi";
import { Contractor } from "@/types/contractor";
import { useMemo } from "react";

interface ContractorsApiResponse {
  data: {
    contractors: Contractor[];
    page: number;
    pages: number;
    total: number;
  };
}

export function useContractors(
  page: number,
  limit: number,
  search: string,
  filters: string[]
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

    // Add status filter if it exists
    if (filters.length > 0) {
      params.set("status", filters.join(","));
    }

    // Construct the endpoint with all parameters
    const queryString = params.toString();
    return `/contractors/admin${queryString ? `?${queryString}` : ""}`;
  }, [page, limit, debouncedSearch, filters]);

  const { data, error, isPending } = useApi<ContractorsApiResponse>(endpoint, {
    method: "GET",
    queryOptions: {
      retry: 1,
      refetchOnWindowFocus: false,
      gcTime: 0,
      staleTime: 0
    }
  });

  return {
    contractors: data?.data?.contractors ?? [],
    page: data?.data?.page ?? 0,
    pages: data?.data?.pages ?? 0,
    total: data?.data?.total ?? 0,
    isLoading: isPending,
    error
  };
}
