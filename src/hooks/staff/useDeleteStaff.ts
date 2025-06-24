import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/general/useApi";
import { useToast } from "@/hooks/use-toast";
import { UseMutationResult } from "@tanstack/react-query";
import { useState } from "react";

interface DeleteStaffResponse {
  status?: string;
  message?: string;
}

export function useDeleteStaff() {
  const router = useRouter();
  const { success, error: showError } = useToast();
  const [endpoint, setEndpoint] = useState<string>("");

  const result = useApi<DeleteStaffResponse>(endpoint, {
    method: "DELETE",
    mutationOptions: {
      onSuccess: () => {
        success("Staff deleted successfully!");
        window.location.reload();
      },
      onError: (error) => {
        console.log("Delete error:", error);
        console.log("Error message:", error.message);
        console.log("Error object:", error.error);

        showError(error.error || error.message || "Failed to delete staff");
      }
    }
  }) as UseMutationResult<DeleteStaffResponse, Error, void>;

  const deleteStaff = async (staffId: string) => {
    if (!staffId) return;
    try {
      const deleteEndpoint = `/staff/manager/${staffId}`;
      console.log("Setting endpoint for staff:", staffId);
      setEndpoint(deleteEndpoint);
      // Wait for the endpoint to be set before mutating
      await new Promise((resolve) => setTimeout(resolve, 0));
      console.log("Calling mutate with endpoint:", deleteEndpoint);
      await result.mutate();
    } catch (error) {
      console.log("Caught error in deleteStaff:", error);
      showError("Failed to delete staff");
      throw error;
    }
  };

  return {
    deleteStaff,
    isPending: result.isPending,
    error: result.error
  };
}
