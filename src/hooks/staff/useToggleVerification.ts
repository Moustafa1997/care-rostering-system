import { useApi } from "@/hooks/general/useApi";
import { useToast } from "@/hooks/use-toast";
import { UseMutationResult } from "@tanstack/react-query";
import { useState } from "react";

interface ToggleVerificationResponse {
  status: string;
  message: string;
  data: {
    verified: boolean;
  };
}

export function useToggleVerification() {
  const { success, error: showError } = useToast();
  const [endpoint, setEndpoint] = useState<string>("");

  const result = useApi<ToggleVerificationResponse>(endpoint, {
    method: "PATCH",
    mutationOptions: {
      onSuccess: (data) => {
        const status = data.data.verified ? "verified" : "unverified";
        success(`Staff account Verification status updated successfully`);
      },
      onError: (error) => {
        console.log("Toggle verification error:", error);
        console.log("Error message:", error.message);
        console.log("Error object:", error.error);

        showError(
          error.error || error.message || "Failed to toggle verification status"
        );
      }
    }
  }) as UseMutationResult<ToggleVerificationResponse, Error, void>;

  const toggleVerification = async (staffId: string) => {
    if (!staffId) return;

    try {
      const toggleEndpoint = `/staff/manager/${staffId}/toggle-account-verification`;
      console.log("Setting endpoint for staff verification toggle:", staffId);
      setEndpoint(toggleEndpoint);
      // Wait for the endpoint to be set before mutating
      await new Promise((resolve) => setTimeout(resolve, 0));
      console.log("Calling mutate with endpoint:", toggleEndpoint);
      await result.mutate();
    } catch (error) {
      console.log("Caught error in toggleVerification:", error);
      showError("Failed to toggle verification status");
      throw error;
    }
  };

  return {
    toggleVerification,
    isPending: result.isPending,
    error: result.error
  };
}
