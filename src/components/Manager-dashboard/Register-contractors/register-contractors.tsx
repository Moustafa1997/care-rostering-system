"use client";
import {
  useRegisterContractor,
  ContractorFormData
} from "@/hooks/contractors/useRegisterContractor";
import { useRouter } from "next/navigation";
import RegisterContractorForm from "@/components/ui/manager-contractor/register-contractor-form";
import { useToast } from "@/hooks/use-toast";

export default function RegisterContractors() {
  const router = useRouter();
  const { registerContractor, isPending } = useRegisterContractor();
  const { error: showError } = useToast();

  const handleFormSubmit = async (data: ContractorFormData) => {
    try {
      await registerContractor(data);
    } catch (err) {
      if (err instanceof Error) {
        // Handle Zod validation errors
        if (err.message.includes("ZodError")) {
          const validationErrors = JSON.parse(err.message);
          if (Array.isArray(validationErrors)) {
            validationErrors.forEach((error) => {
              showError(error.message);
            });
          } else {
            showError("Please fill in all required fields correctly");
          }
        } else {
          showError(
            err.message || "Failed to register contractor. Please try again."
          );
        }
      } else {
        showError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/manager/contractors");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col justify-between w-full">
        <h1 className="text-4xl text-gray-500 font-semibold mb-4">
          Register new contractor
        </h1>
        <p className="text-base text-gray-500 font-normal">
          Complete the form below to register a new contractor organisation
        </p>
      </div>
      <div className="flex flex-col justify-between w-full">
        <RegisterContractorForm
          onSubmit={handleFormSubmit}
          isSubmitting={isPending}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
