import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function useUploadAdminImage() {
  const [isLoading, setIsLoading] = useState(false);
  const { success, error: showError } = useToast();

  const uploadProfileImage = async (file: File) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("profileImage", file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/profile-image`,
        {
          method: "POST",
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload profile image");
      }

      const responseData = await response.json();
      success("Profile image updated successfully");
      return responseData.imageUrl;
    } catch (error) {
      showError(
        error instanceof Error
          ? error.message
          : "Failed to upload profile image"
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    uploadProfileImage,
    isLoading
  };
}
