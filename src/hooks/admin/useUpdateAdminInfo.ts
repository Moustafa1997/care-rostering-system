import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/general/useApi";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { UseMutationResult } from "@tanstack/react-query";

// Schema for admin info update
export const adminInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(1, "Phone number is required")
});

export type AdminInfoFormData = z.infer<typeof adminInfoSchema>;

interface AdminInfoResponse {
  data: {
    status: string;
    message: string;
    admin: {
      id: string;
      name: string;
      email: string;
      phone: string;
    };
  };
}

export function useUpdateAdminInfo() {
  const router = useRouter();
  const { success, error: showError } = useToast();

  const result = useApi<AdminInfoResponse, AdminInfoFormData>(
    "/admin/update-info",
    {
      method: "PATCH",
      mutationOptions: {
        onSuccess: (data) => {
          success("Admin information updated successfully!");
          router.refresh();
        },
        onError: (error) => {
          showError(
            error.error || error.message || "Failed to update admin information"
          );
        }
      }
    }
  ) as UseMutationResult<AdminInfoResponse, Error, AdminInfoFormData>;

  const { mutate, isPending, error } = result;

  const updateAdminInfo = async (formData: AdminInfoFormData) => {
    try {
      // Validate form data using Zod
      const validatedData = adminInfoSchema.parse(formData);
      mutate(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((err) => err.message).join(", ");
        showError(errorMessage);
      } else {
        showError("Failed to update admin information");
      }
      throw error;
    }
  };

  return {
    updateAdminInfo,
    isPending,
    error
  };
}
