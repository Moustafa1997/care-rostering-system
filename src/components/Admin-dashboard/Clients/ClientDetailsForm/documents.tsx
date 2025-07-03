import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ViewClientDocuments from "@/components/ui/admin/view-client-documents";

export default function Documents() {
  const [selectedFiles, setSelectedFiles] = useState<{
    proofOfId: File[];
    consentForm: File[];
    riskAssessment: File[];
  }>({
    proofOfId: [],
    consentForm: [],
    riskAssessment: [],
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof selectedFiles
  ) => {
    const newFiles = Array.from(e.target.files || []);
    setSelectedFiles((prev) => {
      const existing = prev[key].map((f) => f.name);
      const filtered = newFiles.filter((f) => !existing.includes(f.name));
      return {
        ...prev,
        [key]: [...prev[key], ...filtered],
      };
    });
  };

  const handleFileDelete = (
    key: keyof typeof selectedFiles,
    indexToRemove: number
  ) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== indexToRemove),
    }));
  };

  const renderFileList = (files: File[], key: keyof typeof selectedFiles) =>
    files.length > 0 ? (
      <ul className="mt-2 text-sm text-[#1A2D8A] space-y-1">
        {files.map((file, index) => (
          <li
            key={index}
            className="flex w-fit items-center justify-between pr-2 bg-[#f0f8ff] rounded px-3 py-1"
          >
            <span className="truncate">{file.name}</span>
            <button
              type="button"
              onClick={() => handleFileDelete(key, index)}
              className="text-red-500 hover:text-red-700 ml-3"
              title="Remove file"
            >
              <X className="w-3 h-3" />
            </button>
          </li>
        ))}
      </ul>
    ) : null;

  return (
    <section>
      <div className="p-6 space-y-4 bg-white rounded-2xl">
        <h2 className="text-xl font-semibold text-gray-500">Document</h2>
        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          {/* Proof of ID */}
          <div className="col-span-6 mb-4">
            <label className="text-sm font-medium text-[#41526A] block mb-1">
              Proof of ID
            </label>
            <div className="relative w-fit cursor-pointer">
              <input
                type="file"
                multiple
                onChange={(e) => handleFileChange(e, "proofOfId")}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Button
                variant={"filled"}
                className="flex items-center justify-between gap-2 cursor-pointer w-[160px] h-[35px]"
              >
                <span>Choose File</span>
                <Upload className="h-5 w-5 text-white" />
              </Button>
            </div>
            {renderFileList(selectedFiles.proofOfId, "proofOfId")}
          </div>

          {/* Consent Form */}
          <div className="col-span-6 mb-4">
            <label className="text-sm font-medium text-[#41526A] block mb-1">
              Consent Form for Care
            </label>
            <div className="relative w-fit">
              <input
                type="file"
                multiple
                onChange={(e) => handleFileChange(e, "consentForm")}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Button
                variant={"filled"}
                className="flex items-center justify-between gap-2 cursor-pointer w-[160px] h-[35px]"
              >
                <span>Choose File</span>
                <Upload className="h-5 w-5 text-white" />
              </Button>
            </div>
            {renderFileList(selectedFiles.consentForm, "consentForm")}
          </div>

          {/* Risk Assessment */}
          <div className="col-span-12 mb-4">
            <label className="text-sm font-medium text-[#41526A] block mb-1">
              Basic Risk Assessment
            </label>
            <div className="relative w-fit">
              <input
                type="file"
                multiple
                onChange={(e) => handleFileChange(e, "riskAssessment")}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Button
                variant={"filled"}
                className="flex items-center justify-between gap-2 cursor-pointer w-[160px] h-[35px]"
              >
                <span>Choose File</span>
                <Upload className="h-5 w-5 text-white" />
              </Button>
            </div>
            {renderFileList(selectedFiles.riskAssessment, "riskAssessment")}
          </div>
        </div>

        {/* view client Documents */}
        {/* <ViewClientDocuments /> */}
      </div>

      <div className="mt-12 flex justify-center gap-5">
        <Button variant="outline" className="w-40">
          Cancel
        </Button>
        <Button variant="default" className="w-40">
          Save
        </Button>
      </div>
    </section>
  );
}
