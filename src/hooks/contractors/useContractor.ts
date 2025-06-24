import { useApi } from "@/hooks/general/useApi";
import { Contractor } from "@/types/contractor";

interface ContractorResponse {
  data: {
    contractor: Contractor;
  };
}

export function useContractor(contractorId: string) {
  const { data, error, isPending } = useApi<ContractorResponse>(
    `/contractors/admin/${contractorId}`,
    {
      queryOptions: {
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: !!contractorId, // Only fetch if contractorId exists
        gcTime: 0,
        staleTime: 0
      }
    }
  );

  return {
    contractor: data?.data?.contractor,
    error,
    isLoading: isPending
  };
}
