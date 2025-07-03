"use client";
import { useEditContractor } from "@/hooks/contractors/useEditContractor";
import { useContractor } from "@/hooks/contractors/useContractor";
import { useRouter } from "next/navigation";
import EditContractorForm from "@/components/ui/manager-contractor/edit-contractor-form";
import { useToast } from "@/hooks/use-toast";
import { ContractorFormData } from "@/hooks/contractors/useRegisterContractor";

export default function EditContractorPage({
  params
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { editContractor, isPending } = useEditContractor(params.id);
  const { contractor, isLoading, error: fetchError } = useContractor(params.id);
  const { error: showError } = useToast();

  const handleFormSubmit = async (data: ContractorFormData) => {
    try {
      await editContractor(data);
    } catch (err) {
      if (err instanceof Error) {
        try {
          const validationErrors = JSON.parse(err.message);
          // Show validation errors in toast
          Object.values(validationErrors).forEach((error: unknown) => {
            if (typeof error === "string") {
              showError(error);
            }
          });
        } catch {
          // Handle non-validation errors
          showError("Failed to update contractor. Please try again.");
        }
      }
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/manager/contractors");
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading contractor data...</p>
        </div>
      </div>
    );
  }

  if (fetchError || !contractor) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">
            {fetchError?.message || "Failed to load contractor data"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col justify-between w-full">
        <h1 className="text-4xl text-gray-500 font-semibold mb-4">
          Edit Contractor
        </h1>
        <p className="text-base text-gray-500 font-normal">
          Update the contractor information below
        </p>
      </div>
      <div className="flex flex-col justify-between w-full">
        <EditContractorForm
          onSubmit={handleFormSubmit}
          isSubmitting={isPending}
          onCancel={handleCancel}
          initialData={contractor}
        />
      </div>
    </div>
  );
}
