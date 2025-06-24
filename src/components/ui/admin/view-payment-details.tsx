import React from "react";
import { Button } from "@/components/ui/button";
import { useStaffFormStore } from "@/stores/staffFormStore";
import { PoundSterling } from "lucide-react";

export default function ViewPaymentDetails() {
  const { formData, switchToEditMode } = useStaffFormStore();
  const { paymentDetails } = formData;

  const handleEditClick = () => {
    // Switch to edit mode using the store method
    switchToEditMode();
  };

  const formatCurrency = (amount: number) => {
    return `£${amount.toFixed(2)}`;
  };

  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-500">
            Payment Details
          </h2>
          <Button
            variant="outline"
            className="w-32 h-9"
            onClick={handleEditClick}
          >
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="2xl:col-span-6 lg:col-span-12">
            <div className="w-full mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Regular pay rate/pm
              </label>
              <div className="flex items-center text-base text-gray-900">
                <PoundSterling size={15} className="mr-1" />
                {paymentDetails.regularPay
                  ? formatCurrency(paymentDetails.regularPay)
                  : "N/A"}
              </div>
            </div>

            <div className="w-full mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Overtime pay rate p/m
              </label>
              <div className="flex items-center text-base text-gray-900">
                <PoundSterling size={15} className="mr-1" />
                {paymentDetails.overtimePay
                  ? formatCurrency(paymentDetails.overtimePay)
                  : "N/A"}
              </div>
            </div>

            <div className="w-full mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Holiday pay rate/pm
              </label>
              <div className="flex items-center text-base text-gray-900">
                <PoundSterling size={15} className="mr-1" />
                {paymentDetails.holidayPay
                  ? formatCurrency(paymentDetails.holidayPay)
                  : "N/A"}
              </div>
            </div>
          </div>

          <div className="2xl:col-span-6 lg:col-span-12">
            <div className="w-full mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Paternity pay
              </label>
              <div className="flex items-center text-base text-gray-900">
                <PoundSterling size={15} className="mr-1" />
                {paymentDetails.paternityPay
                  ? formatCurrency(paymentDetails.paternityPay)
                  : "N/A"}
              </div>
            </div>

            <div className="w-full mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Maternity pay
              </label>
              <div className="flex items-center text-base text-gray-900">
                <PoundSterling size={15} className="mr-1" />
                {paymentDetails.maternityPay
                  ? formatCurrency(paymentDetails.maternityPay)
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
