import { useApi } from "@/hooks/general/useApi";
import { useToast } from "@/hooks/use-toast";
import { UseMutationResult } from "@tanstack/react-query";
import { useState } from "react";

interface UpdateContractorStatusResponse {
  data: {
    status: string;
    message: string;
    contractor: {
      id: string;
      contract: {
        status: "Active" | "Pending" | "Inactive";
      };
    };
  };
}

export function useUpdateContractorStatus() {
  const { success, error: showError } = useToast();
  const [endpoint, setEndpoint] = useState<string>("");

  const result = useApi<UpdateContractorStatusResponse, void>(endpoint, {
    method: "PATCH",
    mutationOptions: {
      onSuccess: (data) => {
        success(
          `Contractor ${data.data.contractor.contract.status === "Active" ? "activated" : "deactivated"} successfully`
        );
      },
      onError: (error) => {
        showError(
          error.error || error.message || "Failed to update contractor status"
        );
      }
    }
  }) as UseMutationResult<UpdateContractorStatusResponse, Error, void>;

  const { mutate, isPending, error } = result;

  const updateContractorStatus = async (
    contractorId: string,
    newStatus: "Active" | "Inactive"
  ) => {
    if (!contractorId) return;
    try {
      const statusEndpoint = `/contractors/admin/${contractorId}/toggle-status`;
      console.log("Setting endpoint for contractor:", contractorId);
      setEndpoint(statusEndpoint);
      // Wait for the endpoint to be set before mutating
      await new Promise((resolve) => setTimeout(resolve, 0));
      mutate();
    } catch (error) {
      showError("Failed to update contractor status");
      throw error;
    }
  };

  return {
    updateContractorStatus,
    isUpdating: isPending,
    error
  };
}
