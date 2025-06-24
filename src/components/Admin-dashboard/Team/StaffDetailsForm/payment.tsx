import React from "react";
import { Input } from "@/components/ui/input";
import { PoundSterling } from "lucide-react";
import { useStaffFormStore } from "@/stores/staffFormStore";
import ViewPaymentDetails from "@/components/ui/admin/view-payment-details";

export default function Payment() {
  const { formData, setField, errors, validateStep, formMode, steps } =
    useStaffFormStore();
  const { paymentDetails } = formData;

  const handleInputChange = (field: string, value: string | number) => {
    // Convert empty string to undefined to allow clearing the field
    const finalValue = value === "" ? undefined : value;
    setField("paymentDetails", field, finalValue);
    // Trigger validation for the current field
    //validateStep("payment");
  };

  const getFieldError = (fieldName: string) => {
    return errors[`paymentDetails.${fieldName}`];
  };

  // Find the payment step
  const paymentStep = steps.find((step) => step.id === "payment");

  // If in view mode and the step is completed, render the view component
  if (formMode === "view" && paymentStep?.isCompleted) {
    return <ViewPaymentDetails />;
  }

  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        {/* Payment Details */}
        <h2 className="text-xl font-semibold text-gray-500">Payment Details</h2>

        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="2xl:col-span-6 lg:col-span-12">
            <div className="w-full mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Regular pay rate/pm <span className="text-red-500">*</span>
              </label>
              <div
                className={`flex items-center border rounded-md bg-white pl-2 ${getFieldError("regularPay") ? "border-red" : "border-blue-soft"}`}
              >
                <PoundSterling size={15} />
                <Input
                  className="border-none"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Enter amount"
                  value={paymentDetails.regularPay || ""}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    handleInputChange("regularPay", isNaN(value) ? "" : value);
                  }}
                />
              </div>
              {getFieldError("regularPay") && (
                <p className="text-red text-sm mt-1">
                  {getFieldError("regularPay")}
                </p>
              )}
            </div>

            <div className="w-full mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Overtime pay rate p/m <span className="text-red-500">*</span>
              </label>
              <div
                className={`flex items-center border rounded-md bg-white pl-2 ${getFieldError("overtimePay") ? "border-red" : "border-blue-soft"}`}
              >
                <PoundSterling size={15} />
                <Input
                  className="border-none"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Enter amount"
                  value={paymentDetails.overtimePay || ""}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    handleInputChange("overtimePay", isNaN(value) ? "" : value);
                  }}
                />
              </div>
              {getFieldError("overtimePay") && (
                <p className="text-red text-sm mt-1">
                  {getFieldError("overtimePay")}
                </p>
              )}
            </div>

            <div className="w-full mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Holiday pay rate/pm <span className="text-red-500">*</span>
              </label>
              <div
                className={`flex items-center border rounded-md bg-white pl-2 ${getFieldError("holidayPay") ? "border-red" : "border-blue-soft"}`}
              >
                <PoundSterling size={15} />
                <Input
                  className="border-none"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Enter amount"
                  value={paymentDetails.holidayPay || ""}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    handleInputChange("holidayPay", isNaN(value) ? "" : value);
                  }}
                />
              </div>
              {getFieldError("holidayPay") && (
                <p className="text-red text-sm mt-1">
                  {getFieldError("holidayPay")}
                </p>
              )}
            </div>
          </div>

          <div className="2xl:col-span-6 lg:col-span-12">
            <div className="w-full mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Paternity pay <span className="text-red-500">*</span>
              </label>
              <div
                className={`flex items-center border rounded-md bg-white pl-2 ${getFieldError("paternityPay") ? "border-red" : "border-blue-soft"}`}
              >
                <PoundSterling size={15} />
                <Input
                  className="border-none"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Enter amount"
                  value={paymentDetails.paternityPay || ""}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    handleInputChange(
                      "paternityPay",
                      isNaN(value) ? "" : value
                    );
                  }}
                />
              </div>
              {getFieldError("paternityPay") && (
                <p className="text-red text-sm mt-1">
                  {getFieldError("paternityPay")}
                </p>
              )}
            </div>

            <div className="w-full mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Maternity pay <span className="text-red-500">*</span>
              </label>
              <div
                className={`flex items-center border rounded-md bg-white pl-2 ${getFieldError("maternityPay") ? "border-red" : "border-blue-soft"}`}
              >
                <PoundSterling size={15} />
                <Input
                  className="border-none"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Enter amount"
                  value={paymentDetails.maternityPay || ""}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    handleInputChange(
                      "maternityPay",
                      isNaN(value) ? "" : value
                    );
                  }}
                />
              </div>
              {getFieldError("maternityPay") && (
                <p className="text-red text-sm mt-1">
                  {getFieldError("maternityPay")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
