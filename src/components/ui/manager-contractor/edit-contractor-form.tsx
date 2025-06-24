import React from "react";
import { Button } from "@/components/ui/button";
import { Contractor } from "@/types/contractor";
import { ContractorFormData } from "@/hooks/contractors/useRegisterContractor";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contractorSchema } from "@/hooks/contractors/useRegisterContractor";
import {
  CompanyDetailsSection,
  ContactPersonSection,
  ContractDetailsSection,
  PricingSection,
  DocumentsSection
} from "./contractor-form-sections";

interface EditContractorFormProps {
  onSubmit: (data: ContractorFormData) => Promise<void>;
  isSubmitting: boolean;
  onCancel: () => void;
  initialData: Contractor;
}

export default function EditContractorForm({
  onSubmit,
  isSubmitting,
  onCancel,
  initialData
}: EditContractorFormProps) {
  const form = useForm<ContractorFormData>({
    resolver: zodResolver(contractorSchema),
    defaultValues: initialData,
    mode: "onChange" // Enable real-time validation
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="p-6 space-y-8 bg-white rounded-md"
    >
      <CompanyDetailsSection form={form} />
      <ContactPersonSection form={form} />
      <ContractDetailsSection form={form} />
      <PricingSection form={form} />
      <DocumentsSection form={form} />

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
