import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useFileUpload } from "@/hooks/general/useFileUpload";
import { toast } from "react-hot-toast";

interface ProfileImageUploadProps {
  onImageChange: (url: string) => void;
  initialImage?: string;
  className?: string;
  maxSize?: number; // in MB
}

export function ProfileImageUpload({
  onImageChange,
  initialImage,
  className = "",
  maxSize = 5
}: ProfileImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const { uploadSingleFile, isUploading } = useFileUpload();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("File must be an image");
      return;
    }

    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Upload the file
      const uploadedUrl = await uploadSingleFile(file);
      if (uploadedUrl) {
        onImageChange(uploadedUrl);
        toast.success("Profile image uploaded successfully");
      }
    } catch (err) {
      toast.error("Error uploading image");
      console.error(err);
      // Revert preview on error
      setPreview(initialImage || null);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onImageChange("");
  };

  return (
    <div className={`relative w-[100px] h-[100px] ${className}`}>
      <div className="rounded-full overflow-hidden w-full h-full flex justify-center items-center">
        {preview ? (
          <Image
            src={preview}
            alt="Profile preview"
            width={100}
            height={100}
            className="object-cover"
          />
        ) : (
          <Image
            src="/images/contractor-profile.jpeg"
            alt="Default profile"
            width={100}
            height={100}
            className="object-cover"
          />
        )}
      </div>
      <label
        htmlFor="profile-image-upload"
        className="absolute bottom-0 right-0 bg-white rounded-full border border-gray-300 p-1 shadow hover:bg-gray-100 cursor-pointer"
      >
        <Upload className="h-4 w-4 text-gray-600" />
        <input
          id="profile-image-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>
    </div>
  );
}
