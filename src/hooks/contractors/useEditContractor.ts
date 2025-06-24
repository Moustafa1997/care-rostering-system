import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/general/useApi";
import { useToast } from "@/hooks/use-toast";
import { Contractor } from "@/types/contractor";
import { z } from "zod";
import { UseMutationResult } from "@tanstack/react-query";
import { contractorSchema, ContractorFormData } from "./useRegisterContractor";

interface ContractorResponse {
  data: {
    status: string;
    message: string;
    contractor: Contractor;
  };
}

export function useEditContractor(contractorId: string) {
  const router = useRouter();
  const { success, error: showError } = useToast();

  const result = useApi<ContractorResponse, ContractorFormData>(
    `/contractors/admin/${contractorId}`,
    {
      method: "PATCH",
      mutationOptions: {
        onSuccess: (data) => {
          success("Contractor updated successfully!");
          router.push("/dashboard/manager/contractors");
        },
        onError: (error) => {
          showError(
            error.error || error.message || "Failed to update contractor"
          );
        }
      }
    }
  ) as UseMutationResult<ContractorResponse, Error, ContractorFormData>;

  const { mutate, isPending, error } = result;

  const editContractor = async (formData: ContractorFormData) => {
    try {
      // Validate form data using Zod
      const validatedData = contractorSchema.parse(formData);
      mutate(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((err) => err.message).join(", ");
        showError(errorMessage);
      } else {
        showError("Failed to update contractor");
      }
      throw error;
    }
  };

  return {
    editContractor,
    isPending,
    error
  };
}
