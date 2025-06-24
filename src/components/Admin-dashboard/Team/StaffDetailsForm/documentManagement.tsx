import React from "react";
import { DatePickerForm } from "@/components/ui/date-picker";
import { FileUpload } from "@/components/ui/file-upload";
import { useStaffFormStore } from "@/stores/staffFormStore";
import ViewDocumentManagement from "@/components/ui/admin/view-document-management";

export default function DocumentManagement() {
  const { formData, setArrayField, errors, formMode, steps } =
    useStaffFormStore();
  const { documents } = formData;

  const handleDocumentUpload = (
    documentType: string,
    files: { url: string }[]
  ) => {
    const updatedDocuments = [...documents];
    const existingDocIndex = updatedDocuments.findIndex(
      (doc) => doc.documentType === documentType
    );

    const fileUrl = files[0]?.url || "";
    const documentName = files[0]?.url.split("/").pop() || "";

    if (existingDocIndex !== -1) {
      // Update existing document
      updatedDocuments[existingDocIndex] = {
        ...updatedDocuments[existingDocIndex],
        fileUrl,
        documentName
      };
    } else {
      // Create new document
      const newDocument = {
        documentType,
        documentName,
        fileUrl,
        expiryDate: ""
      };
      updatedDocuments.push(newDocument);
    }

    setArrayField("documents", updatedDocuments);
  };

  const handleExpiryDateChange = (documentType: string, date: string) => {
    const updatedDocuments = [...documents];
    const existingDocIndex = updatedDocuments.findIndex(
      (doc) => doc.documentType === documentType
    );

    if (existingDocIndex !== -1) {
      // Update existing document
      updatedDocuments[existingDocIndex] = {
        ...updatedDocuments[existingDocIndex],
        expiryDate: date
      };
    } else {
      // Create new document with only expiry date
      const newDocument = {
        documentType,
        documentName: "",
        fileUrl: "",
        expiryDate: date
      };
      updatedDocuments.push(newDocument);
    }

    setArrayField("documents", updatedDocuments);
  };

  const getDocumentUrl = (documentType: string) => {
    const doc = documents.find((d) => d.documentType === documentType);
    return doc?.fileUrl ? [{ url: doc.fileUrl }] : [];
  };

  const getExpiryDate = (documentType: string) => {
    const doc = documents.find((d) => d.documentType === documentType);
    return doc?.expiryDate || "";
  };

  const getFieldError = (fieldName: string) => {
    return errors[fieldName];
  };

  // Find the documents step
  const documentsStep = steps.find((step) => step.id === "documents");

  // If in view mode and the step is completed, render the view component
  if (formMode === "view" && documentsStep?.isCompleted) {
    return <ViewDocumentManagement />;
  }

  return (
    <section>
      <div className="p-6 space-y-4 bg-white rounded-2xl">
        {/* Document Management */}
        <h2 className="text-xl font-semibold text-gray-500">
          Document Management
        </h2>

        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="col-span-12">
            {errors["documents"] && (
              <p className="text-sm text-red mb-4">{errors["documents"]}</p>
            )}

            <div className="mb-4">
              <div>
                <label className="text-sm font-medium text-[#41526A]">
                  Proof of ID
                </label>
              </div>
              <FileUpload
                variant="inline"
                onFilesChange={(files) =>
                  handleDocumentUpload("Proof of ID", files)
                }
                initialFiles={getDocumentUrl("Proof of ID")}
                accept=".pdf"
                maxSize={5}
                id="proof-of-id"
              />
              {getFieldError("documents.Proof of ID.fileUrl") && (
                <p className="text-sm text-red mt-1">
                  {getFieldError("documents.Proof of ID.fileUrl")}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#2F3E53]">
                Date of expire of Proof of ID
              </label>
              <DatePickerForm
                value={getExpiryDate("Proof of ID")}
                onChange={(date) => handleExpiryDateChange("Proof of ID", date)}
              />
              {getFieldError("documents.Proof of ID.expiryDate") && (
                <p className="text-sm text-red mt-1">
                  {getFieldError("documents.Proof of ID.expiryDate")}
                </p>
              )}
            </div>

            <div className="mb-4">
              <div>
                <label className="text-sm font-medium text-[#41526A]">
                  Right to Work Document
                </label>
              </div>
              <FileUpload
                variant="inline"
                onFilesChange={(files) =>
                  handleDocumentUpload("Right to Work Document", files)
                }
                initialFiles={getDocumentUrl("Right to Work Document")}
                accept=".pdf"
                maxSize={5}
                id="right-to-work"
              />
              {getFieldError("documents.Right to Work Document.fileUrl") && (
                <p className="text-sm text-red mt-1">
                  {getFieldError("documents.Right to Work Document.fileUrl")}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#2F3E53]">
                Date of expire of Right to Work Document
              </label>
              <DatePickerForm
                value={getExpiryDate("Right to Work Document")}
                onChange={(date) =>
                  handleExpiryDateChange("Right to Work Document", date)
                }
              />
              {getFieldError("documents.Right to Work Document.expiryDate") && (
                <p className="text-sm text-red mt-1">
                  {getFieldError("documents.Right to Work Document.expiryDate")}
                </p>
              )}
            </div>

            <div className="mb-4">
              <div>
                <label className="text-sm font-medium text-[#41526A]">
                  Contract document
                </label>
              </div>
              <FileUpload
                variant="inline"
                onFilesChange={(files) =>
                  handleDocumentUpload("contract document", files)
                }
                initialFiles={getDocumentUrl("contract document")}
                accept=".pdf"
                maxSize={10}
                id="contract"
              />
              {getFieldError("documents.contract document.fileUrl") && (
                <p className="text-sm text-red mt-1">
                  {getFieldError("documents.contract document.fileUrl")}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#2F3E53]">
                Date of expire of Contract document
              </label>
              <DatePickerForm
                value={getExpiryDate("contract document")}
                onChange={(date) =>
                  handleExpiryDateChange("contract document", date)
                }
              />
              {getFieldError("documents.contract document.expiryDate") && (
                <p className="text-sm text-red mt-1">
                  {getFieldError("documents.contract document.expiryDate")}
                </p>
              )}
            </div>

            <div className="mb-4">
              <div>
                <label className="text-sm font-medium text-[#41526A]">
                  DBS Certificate
                </label>
              </div>
              <FileUpload
                variant="inline"
                onFilesChange={(files) =>
                  handleDocumentUpload("DBS Certificate", files)
                }
                initialFiles={getDocumentUrl("DBS Certificate")}
                accept=".pdf"
                maxSize={5}
                id="dbs-certificate"
              />
              {getFieldError("documents.DBS Certificate.fileUrl") && (
                <p className="text-sm text-red mt-1">
                  {getFieldError("documents.DBS Certificate.fileUrl")}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#2F3E53]">
                Date of expire of DBS Certificate
              </label>
              <DatePickerForm
                value={getExpiryDate("DBS Certificate")}
                onChange={(date) =>
                  handleExpiryDateChange("DBS Certificate", date)
                }
              />
              {getFieldError("documents.DBS Certificate.expiryDate") && (
                <p className="text-sm text-red mt-1">
                  {getFieldError("documents.DBS Certificate.expiryDate")}
                </p>
              )}
            </div>

            <div className="mb-4">
              <div>
                <label className="text-sm font-medium text-[#41526A]">CV</label>
              </div>
              <FileUpload
                variant="inline"
                onFilesChange={(files) => handleDocumentUpload("CV", files)}
                initialFiles={getDocumentUrl("CV")}
                accept=".pdf"
                maxSize={10}
                id="cv"
              />
              {getFieldError("documents.CV.fileUrl") && (
                <p className="text-sm text-red mt-1">
                  {getFieldError("documents.CV.fileUrl")}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#2F3E53]">
                Date of expire of CV
              </label>
              <DatePickerForm
                value={getExpiryDate("CV")}
                onChange={(date) => handleExpiryDateChange("CV", date)}
              />
              {getFieldError("documents.CV.expiryDate") && (
                <p className="text-sm text-red mt-1">
                  {getFieldError("documents.CV.expiryDate")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
