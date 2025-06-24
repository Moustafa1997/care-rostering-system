import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { Input } from "./input";

interface ImageUploadProps {
  onImageChange: (url: string) => void;
  initialImage?: string;
  className?: string;
  maxSize?: number; // in MB
  accept?: string[];
}

export function ImageUpload({
  onImageChange,
  initialImage,
  className = "",
  maxSize = 5,
  accept = ["image/jpeg", "image/png", "image/gif"]
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError(null);
    const file = event.target.files?.[0];

    if (!file) {
      setError("No file selected");
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Validate file type
    if (!accept.includes(file.type)) {
      setError(`File type must be one of: ${accept.join(", ")}`);
      return;
    }

    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Here you would typically upload the file to your server/storage
      // For now, we'll just use the preview URL
      // In a real application, you would:
      // 1. Upload the file to your storage (e.g., S3, Firebase Storage)
      // 2. Get the URL from the storage
      // 3. Call onImageChange with the actual URL
      onImageChange(previewUrl);
    } catch (err) {
      setError("Error uploading image");
      console.error(err);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onImageChange("");
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2 border border-blue-soft rounded-md pr-4">
        <Input
          type="file"
          className="w-full border-none"
          placeholder="Upload document"
          onChange={handleFileChange}
          accept={accept.join(",")}
        />
        <Upload className="h-5 w-5 text-[#253BAA]" />
      </div>

      {preview && (
        <div className="relative">
          <div className="relative w-full h-48 rounded-lg overflow-hidden">
            <Image src={preview} alt="Preview" fill className="object-cover" />
          </div>
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}
