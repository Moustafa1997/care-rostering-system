import { useState } from "react";
import { toast } from "react-hot-toast";
import { useApi } from "@/hooks/general/useApi";
import { useAuthStore } from "@/stores/useAuthStore";

interface PersonalInfo {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  profileImage?: string;
}

interface ManagerSettingsResponse {
  data: PersonalInfo;
}

export const useManagerSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const id = useAuthStore((state) => state.user?._id ?? "");
  const {
    data,
    error,
    isLoading: apiLoading
  } = useApi<ManagerSettingsResponse>(id ? `/contractors/admin/${id}` : "");

  const handleUpdatePersonalInfo = async (data: PersonalInfo) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contractors/admin/${data.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore.getState().accessToken}`
          },
          body: JSON.stringify(data)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update personal information");
      }

      const responseData = await response.json();
      toast.success("Personal information updated successfully");
      return responseData.data;
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update personal information"
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadProfileImage = async (file: File) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("profileImage", file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contractors/admin/profile-image`,
        {
          method: "POST",
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload profile image");
      }

      const responseData = await response.json();
      toast.success("Profile image updated successfully");
      return responseData.imageUrl;
    } catch (error) {
      toast.error(
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
    data: data?.data,
    error,
    isLoading: isLoading || apiLoading,
    updatePersonalInfo: handleUpdatePersonalInfo,
    uploadProfileImage
  };
};
