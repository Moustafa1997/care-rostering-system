import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/general/useApi";
import { useToast } from "@/hooks/use-toast";
import { Contractor } from "@/types/contractor";
import { z } from "zod";
import { UseMutationResult } from "@tanstack/react-query";

// Shared schema for both register and edit contractor
export const contractorSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  tradingName: z.string().min(1, "Trading name is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  careType: z.string().min(1, "Care type is required"),
  branchCount: z.number().min(1, "Branch count must be at least 1"),
  cqcRegistrationNumber: z
    .string()
    .min(1, "CQC registration number is required"),
  contactPerson: z.object({
    name: z.string().min(1, "Contact person name is required"),
    email: z.string().email("Invalid email format"),
    phone: z.string().min(1, "Contact person phone is required")
  }),
  contract: z.object({
    startDate: z.string().min(1, "Contract start date is required"),
    endDate: z.string().optional(),
    isOngoing: z.boolean(),
    trial: z.object({
      enabled: z.boolean(),
      startDate: z.string().optional(),
      endDate: z.string().optional()
    }),
    noticePeriod: z.string().min(1, "Notice period is required"),
    paymentFrequency: z.string().min(1, "Payment frequency is required")
  }),
  pricing: z.object({
    plan: z.string().min(1, "Plan is required"),
    userLicenses: z.number().min(1, "User licenses must be at least 1"),
    setupFee: z.number().min(0, "Setup fee must be a positive number"),
    discount: z.number().min(0).max(100).optional(),
    paymentMethod: z.string().min(1, "Payment method is required"),
    billing: z.object({
      contactName: z.string().min(1, "Billing contact name is required"),
      email: z.string().email("Invalid billing email format")
    })
  }),
  modules: z.object({
    rostering: z.boolean()
  }),
  internalNotes: z.string().optional(),
  documents: z.array(
    z.object({
      url: z.string().min(1, "Document URL is required")
    })
  )
});

export type ContractorFormData = z.infer<typeof contractorSchema>;

interface ContractorResponse {
  data: {
    status: string;
    message: string;
    contractor: Contractor;
  };
}

export function useRegisterContractor() {
  const router = useRouter();
  const { success, error: showError } = useToast();

  const result = useApi<ContractorResponse, ContractorFormData>(
    "/contractors/admin",
    {
      method: "POST",
      mutationOptions: {
        onSuccess: (data) => {
          success("Contractor registered successfully!");
          router.push("/dashboard/manager/contractors");
        },
        onError: (error) => {
          showError(
            error.error || error.message || "Failed to register contractor"
          );
        }
      }
    }
  ) as UseMutationResult<ContractorResponse, Error, ContractorFormData>;

  const { mutate, isPending, error } = result;

  const registerContractor = async (formData: ContractorFormData) => {
    try {
      // Validate form data using Zod
      const validatedData = contractorSchema.parse(formData);
      mutate(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((err) => err.message).join(", ");
        showError(errorMessage);
      } else {
        showError("Failed to register contractor");
      }
      throw error;
    }
  };

  return {
    registerContractor,
    isPending,
    error
  };
}
