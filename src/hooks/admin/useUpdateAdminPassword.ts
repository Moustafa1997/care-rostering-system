import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/general/useApi";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { UseMutationResult } from "@tanstack/react-query";
import { useLogout } from "@/hooks/auth/useLogout";

// Schema for admin password update
export const adminPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(4, "Password must be at least 8 characters long"),
    // .regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //   "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    // ),
    confirmPassword: z.string().min(1, "Please confirm your password")
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

export type AdminPasswordFormData = z.infer<typeof adminPasswordSchema>;

interface AdminPasswordResponse {
  data: {
    status: string;
    message: string;
  };
}

export function useUpdateAdminPassword() {
  const router = useRouter();
  const { success, error: showError } = useToast();
  const { logout } = useLogout();

  const result = useApi<AdminPasswordResponse, AdminPasswordFormData>(
    "/admin/update-password",
    {
      method: "PATCH",
      mutationOptions: {
        onSuccess: async (data) => {
          success(
            "Password updated successfully! Please login again with your new password."
          );
          await logout();
        },
        onError: (error) => {
          showError(
            error.error || error.message || "Failed to update password"
          );
        }
      }
    }
  ) as UseMutationResult<AdminPasswordResponse, Error, AdminPasswordFormData>;

  const { mutate, isPending, error } = result;

  const updateAdminPassword = async (formData: AdminPasswordFormData) => {
    try {
      // Validate form data using Zod
      const validatedData = adminPasswordSchema.parse(formData);
      mutate(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Get the first error message for better UX
        const firstError = error.errors[0];
        showError(firstError.message);
      } else {
        showError("Failed to update password");
      }
      // Don't throw the error since we're handling it with the toast
      return;
    }
  };

  return {
    updateAdminPassword,
    isPending,
    error
  };
}
