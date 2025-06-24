import { useApi } from "@/hooks/general/useApi";
import { useDebounce } from "@/hooks/general/useDebounce";
import { useMemo } from "react";

interface Address {
  postalCode: string;
  address: string;
  location: {
    type: string;
    coordinates: number[];
  };
  addressComponents: {
    line1: string;
    line2: string;
    line3: string;
    postTown: string;
    county: string;
    district: string;
    ward: string;
  };
}

interface AddressResponse {
  success: boolean;
  message: string;
  data: {
    postalCode: string;
    searchTerm: string;
    location: {
      type: string;
      coordinates: number[];
    };
    count: number;
    totalResults: number;
    filteredResults: number;
    page: number;
    hasMorePages: boolean;
  };
}

export function useCoordinates(postalCode: string) {
  const debouncedPostalCode = useDebounce(postalCode, 400);

  console.log("useCoordinates - postalCode:", postalCode);
  console.log("useCoordinates - debouncedPostalCode:", debouncedPostalCode);

  const endpoint = useMemo(() => {
    if (!debouncedPostalCode) return "";
    return `/address/lookup/cordinates?postalCode=${debouncedPostalCode}`;
  }, [debouncedPostalCode]);

  console.log("useCoordinates - endpoint:", endpoint);

  const { data, error, isPending } = useApi<AddressResponse>(endpoint, {
    queryOptions: {
      enabled: !!debouncedPostalCode,
      retry: 1,
      refetchOnWindowFocus: false,
      gcTime: 0,
      staleTime: 0
    }
  });

  console.log("useCoordinates - data:", data);
  console.log("useCoordinates - error:", error);
  console.log("useCoordinates - isPending:", isPending);

  // Return the first (and only) address from the array
  const address = data?.data?.location;
  console.log("useCoordinates - address:", address);

  return {
    coordinates: address,
    error,
    isLoading: isPending
  };
}
