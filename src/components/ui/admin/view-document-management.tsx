import React from "react";
import { Button } from "@/components/ui/button";
import { useStaffFormStore } from "@/stores/staffFormStore";
import { format } from "date-fns";
import { Eye, Download } from "lucide-react";

export default function ViewDocumentManagement() {
  const { formData, switchToEditMode } = useStaffFormStore();
  const { documents } = formData;

  const handleEditClick = () => {
    // Switch to edit mode using the store method
    switchToEditMode();
  };

  const getDocument = (documentType: string) => {
    return documents?.find((doc) => doc.documentType === documentType);
  };

  const requiredDocuments = [
    "Proof of ID",
    "Right to Work Document",
    "DBS Certificate",
    "contract document"
  ];

  const optionalDocuments = ["Other", "CV"];

  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-500">
            Document management
          </h2>
          <Button
            variant="outline"
            className="w-32 h-9"
            onClick={handleEditClick}
          >
            Edit
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Required Documents
            </h3>
            <div className="grid grid-cols-12 gap-4">
              {requiredDocuments.map((docType) => {
                const doc = getDocument(docType);
                return (
                  <div
                    key={docType}
                    className="col-span-6 border border-[#E1E1E1] rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <label className="block text-sm font-normal text-[#2F3E53]">
                        {docType}
                      </label>
                      {doc && (
                        <div className="flex gap-2">
                          <a
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Eye size={16} />
                          </a>
                          <a
                            href={doc.fileUrl}
                            download
                            className="text-green-600 hover:text-green-800"
                          >
                            <Download size={16} />
                          </a>
                        </div>
                      )}
                    </div>
                    {doc ? (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-900">
                          {doc.documentName}
                        </p>
                        {doc.expiryDate && (
                          <p className="text-sm text-gray-600">
                            Expires:{" "}
                            {format(new Date(doc.expiryDate), "dd/MM/yyyy")}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-red-600">Not uploaded</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Optional Documents
            </h3>
            <div className="grid grid-cols-12 gap-4">
              {optionalDocuments.map((docType) => {
                const doc = getDocument(docType);
                return (
                  <div
                    key={docType}
                    className="col-span-6 border border-[#E1E1E1] rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <label className="block text-sm font-normal text-[#2F3E53]">
                        {docType}
                      </label>
                      {doc && (
                        <div className="flex gap-2">
                          <a
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Eye size={16} />
                          </a>
                          <a
                            href={doc.fileUrl}
                            download
                            className="text-green-600 hover:text-green-800"
                          >
                            <Download size={16} />
                          </a>
                        </div>
                      )}
                    </div>
                    {doc ? (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-900">
                          {doc.documentName}
                        </p>
                        {doc.expiryDate && (
                          <p className="text-sm text-gray-600">
                            Expires:{" "}
                            {format(new Date(doc.expiryDate), "dd/MM/yyyy")}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Not uploaded</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
