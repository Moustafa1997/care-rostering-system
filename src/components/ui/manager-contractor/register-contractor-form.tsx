import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { generateDummyContractorData } from "@/utils/dummy-contractor-data";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contractorSchema,
  type ContractorFormData
} from "@/hooks/contractors/useRegisterContractor";
import {
  CompanyDetailsSection,
  ContactPersonSection,
  ContractDetailsSection,
  PricingSection,
  DocumentsSection
} from "./contractor-form-sections";

interface RegisterContractorFormProps {
  onSubmit: (data: ContractorFormData) => Promise<void>;
  isSubmitting: boolean;
  onCancel: () => void;
}

export default function RegisterContractorForm({
  onSubmit,
  isSubmitting,
  onCancel
}: RegisterContractorFormProps) {
  const form = useForm<ContractorFormData>({
    resolver: zodResolver(contractorSchema),
    mode: "onChange" // Enable real-time validation
  });

  const fillDummyData = () => {
    const dummyData = generateDummyContractorData();
    Object.entries(dummyData).forEach(([key, value]) => {
      form.setValue(key as any, value);
    });
  };

  const handleSubmit = async (data: ContractorFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      // Error is already handled by the parent component
      console.error("Form submission error:", error);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="p-6 space-y-8 bg-white rounded-md"
    >
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={fillDummyData}>
          Fill with Test Data
        </Button>
      </div>

      <CompanyDetailsSection form={form} />
      <ContactPersonSection form={form} />
      <ContractDetailsSection form={form} />
      <PricingSection form={form} />
      <DocumentsSection form={form} />

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
