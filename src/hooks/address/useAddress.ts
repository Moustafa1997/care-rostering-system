import { useApi } from "@/hooks/general/useApi";
import { useDebounce } from "@/hooks/general/useDebounce";
import { useMemo } from "react";

interface Address {
  id: string;
  address: string;
  postalCode: string;
  location: {
    type: string;
    coordinates: number[];
  };
  city: string;
  state: string;
  country: string;
  countryCode: string;
}

interface AddressResponse {
  data: {
    postalCode: string;
    addresses: Address[];
  };
}

export function useAddress(postalCode: string) {
  const debouncedPostalCode = useDebounce(postalCode, 400);

  const endpoint = useMemo(() => {
    if (!debouncedPostalCode) return "";
    return `/address?postalCode=${debouncedPostalCode}`;
  }, [debouncedPostalCode]);

  const { data, error, isPending } = useApi<AddressResponse>(endpoint, {
    queryOptions: {
      enabled: !!debouncedPostalCode,
      retry: 1,
      refetchOnWindowFocus: false,
      gcTime: 0,
      staleTime: 0
    }
  });

  return {
    addresses: data?.data?.addresses ?? [],
    error,
    isLoading: isPending
  };
}
