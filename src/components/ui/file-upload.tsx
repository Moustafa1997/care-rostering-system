import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { useFileUpload } from "@/hooks/general/useFileUpload";
import { toast } from "react-hot-toast";

interface FileUploadProps {
  onFilesChange: (files: { url: string }[]) => void;
  initialFiles?: { url: string }[];
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
  id?: string;
  variant?: "default" | "inline";
}

export function FileUpload({
  onFilesChange,
  initialFiles = [],
  accept = ".pdf,.doc,.docx",
  maxSize = 10,
  className = "",
  id = "fileUpload",
  variant = "default"
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadMultipleFiles, isUploading } = useFileUpload();
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(
    initialFiles.map((file) => file.url)
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check file sizes
    const oversizedFiles = Array.from(files).filter(
      (file) => file.size > maxSize * 1024 * 1024
    );
    if (oversizedFiles.length > 0) {
      toast.error(`Some files exceed the ${maxSize}MB limit`);
      return;
    }

    try {
      const fileUrls = await uploadMultipleFiles(Array.from(files));
      if (fileUrls) {
        const newFiles = [...uploadedFiles, ...fileUrls];
        setUploadedFiles(newFiles);
        onFilesChange(newFiles.map((url) => ({ url })));
        toast.success("Files uploaded successfully");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to upload files"
      );
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onFilesChange(newFiles.map((url) => ({ url })));
  };

  if (variant === "inline") {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center gap-2 border border-blue-soft rounded-md pr-4">
          <Input
            type="file"
            accept={accept}
            multiple
            className="w-full border-none"
            id={id}
            ref={fileInputRef}
            onChange={handleFileUpload}
            disabled={isUploading}
            placeholder="Upload document"
          />
          <Upload className="h-5 w-5 text-[#253BAA]" />
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-4">
            <ul className="space-y-1">
              {uploadedFiles.map((file, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-600 flex items-center gap-2"
                >
                  <span className="truncate">{file.split("/").pop()}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-center">
        <Input
          type="file"
          accept={accept}
          multiple
          className="hidden"
          id={id}
          ref={fileInputRef}
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        <label
          htmlFor={id}
          className={`cursor-pointer w-full flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed rounded-lg transition-colors ${
            isUploading
              ? "opacity-50 bg-gray-50 border-gray-300"
              : "hover:bg-gray-50 border-gray-300"
          }`}
        >
          <Upload
            className={`mx-auto mb-2 ${isUploading ? "animate-pulse" : ""}`}
          />
          <span className="font-medium text-gray-700">
            {isUploading ? "Uploading..." : "Upload Files"}
          </span>
          <small className="w-full text-center text-gray-500">
            {accept} up to {maxSize}MB each
          </small>
        </label>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Uploaded Files:
          </h3>
          <ul className="space-y-1">
            {uploadedFiles.map((file, index) => (
              <li
                key={index}
                className="text-sm text-gray-600 flex items-center gap-2"
              >
                <span className="truncate">{file.split("/").pop()}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
