import { useApi } from "@/hooks/general/useApi";

interface AdminInfo {
  _id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
  role: string;
}

interface AdminInfoResponse {
  data: {
    admin: AdminInfo;
  };
}

export function useAdminInfo() {
  const { data, error, isPending } = useApi<AdminInfoResponse>("/admin/info", {
    queryOptions: {
      retry: 1,
      refetchOnWindowFocus: false,
      gcTime: 0,
      staleTime: 0
    }
  });

  return {
    adminInfo: data?.data?.admin,
    error,
    isLoading: isPending
  };
}
