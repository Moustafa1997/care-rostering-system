import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/general/useApi";
import { useToast } from "@/hooks/use-toast";
import { UseMutationResult } from "@tanstack/react-query";
import { useState } from "react";

interface DeleteContractorResponse {
  status?: string;
  message?: string;
}

export function useDeleteContractor() {
  const router = useRouter();
  const { success, error: showError } = useToast();
  const [endpoint, setEndpoint] = useState<string>("");

  const result = useApi<DeleteContractorResponse>(endpoint, {
    method: "DELETE",
    mutationOptions: {
      onSuccess: () => {
        // If we get here, the delete was successful (including 204 responses)
        success("Contractor deleted successfully!");
        // Reload the page
        window.location.reload();
      },
      onError: (error) => {
        console.log("Delete error:", error);
        console.log("Error message:", error.message);
        console.log("Error object:", error.error);

        showError(
          error.error || error.message || "Failed to delete contractor"
        );
      }
    }
  }) as UseMutationResult<DeleteContractorResponse, Error, void>;

  const deleteContractor = async (contractorId: string) => {
    if (!contractorId) return;
    try {
      const deleteEndpoint = `/contractors/admin/${contractorId}`;
      console.log("Setting endpoint for contractor:", contractorId);
      setEndpoint(deleteEndpoint);
      // Wait for the endpoint to be set before mutating
      await new Promise((resolve) => setTimeout(resolve, 0));
      console.log("Calling mutate with endpoint:", deleteEndpoint);
      await result.mutate();
    } catch (error) {
      console.log("Caught error in deleteContractor:", error);
      showError("Failed to delete contractor");
      throw error;
    }
  };

  return {
    deleteContractor,
    isPending: result.isPending,
    error: result.error
  };
}
