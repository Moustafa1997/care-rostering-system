import { useApi } from "@/hooks/general/useApi";
import { useToast } from "@/hooks/use-toast";
import { UseMutationResult } from "@tanstack/react-query";
import { useState } from "react";

interface ToggleActivationResponse {
  status: string;
  message: string;
  data: {
    active: boolean;
  };
}

export function useToggleActivation() {
  const { success, error: showError } = useToast();
  const [endpoint, setEndpoint] = useState<string>("");

  const result = useApi<ToggleActivationResponse>(endpoint, {
    method: "PATCH",
    mutationOptions: {
      onSuccess: (data) => {
        const status = data.data.active ? "activated" : "deactivated";
        success(`Staff account Activation status updated successfully`);
      },
      onError: (error) => {
        console.log("Toggle activation error:", error);
        console.log("Error message:", error.message);
        console.log("Error object:", error.error);

        showError(
          error.error || error.message || "Failed to toggle activation status"
        );
      }
    }
  }) as UseMutationResult<ToggleActivationResponse, Error, void>;

  const toggleActivation = async (staffId: string) => {
    if (!staffId) return;

    try {
      const toggleEndpoint = `/staff/manager/${staffId}/toggle-account-activation`;
      console.log("Setting endpoint for staff activation toggle:", staffId);
      setEndpoint(toggleEndpoint);
      // Wait for the endpoint to be set before mutating
      await new Promise((resolve) => setTimeout(resolve, 0));
      console.log("Calling mutate with endpoint:", toggleEndpoint);
      await result.mutate();
    } catch (error) {
      console.log("Caught error in toggleActivation:", error);
      showError("Failed to toggle activation status");
      throw error;
    }
  };

  return {
    toggleActivation,
    isPending: result.isPending,
    error: result.error
  };
}
