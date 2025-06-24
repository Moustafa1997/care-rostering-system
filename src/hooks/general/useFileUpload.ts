import { useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

interface SingleFileUploadResponse {
  message: string;
  fileUrl: string;
}

interface MultiFileUploadResponse {
  message: string;
  files: string[];
}

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const accessToken = useAuthStore((state) => state.accessToken);

  const uploadSingleFile = async (file: File): Promise<string | null> => {
    try {
      setIsUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/single/file`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data: SingleFileUploadResponse = await response.json();
      return data.fileUrl;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to upload file";
      setError(errorMessage);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const uploadMultipleFiles = async (
    files: File[]
  ): Promise<string[] | null> => {
    try {
      setIsUploading(true);
      setError(null);

      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/multiple/files`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload files");
      }

      const data: MultiFileUploadResponse = await response.json();
      return data.files;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to upload files";
      setError(errorMessage);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadSingleFile,
    uploadMultipleFiles,
    isUploading,
    error
  };
}
