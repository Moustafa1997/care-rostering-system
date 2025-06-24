import React from "react";
import { Button } from "@/components/ui/button";
import { useStaffFormStore } from "@/stores/staffFormStore";
import { format } from "date-fns";

export default function ViewEmploymentDetails() {
  const { formData, switchToEditMode } = useStaffFormStore();
  const { employmentDetails } = formData;

  const handleEditClick = () => {
    // Switch to edit mode using the store method
    switchToEditMode();
  };

  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-500">
            Employment detail
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
          <div className="col-span-6">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              Interview Date
            </label>
            <p className="text-base text-gray-900">
              {employmentDetails.interviewDate
                ? format(
                    new Date(employmentDetails.interviewDate),
                    "dd/MM/yyyy"
                  )
                : "N/A"}
            </p>
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              Start Date
            </label>
            <p className="text-base text-gray-900">
              {employmentDetails.startDate
                ? format(new Date(employmentDetails.startDate), "dd/MM/yyyy")
                : "N/A"}
            </p>
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              NI Number
            </label>
            <p className="text-base text-gray-900">
              {employmentDetails.niNumber}
            </p>
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              Social Work Number
            </label>
            <p className="text-base text-gray-900">
              {employmentDetails.socialWorkNumber}
            </p>
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              Employee Number
            </label>
            <p className="text-base text-gray-900">
              {employmentDetails.employeeNumber}
            </p>
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              Working Role
            </label>
            <p className="text-base text-gray-900">
              {employmentDetails.workingRole}
            </p>
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              Contract Type
            </label>
            <p className="text-base text-gray-900">
              {employmentDetails.contractType}
            </p>
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              Weekly Contracted Hours
            </label>
            <p className="text-base text-gray-900">
              {employmentDetails.weeklyContractedHours}
            </p>
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              WTR Opt Out
            </label>
            <p className="text-base text-gray-900">
              {employmentDetails.wtrOptOut ? "Yes" : "No"}
            </p>
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              Opt In For Pension
            </label>
            <p className="text-base text-gray-900">
              {employmentDetails.optInForPension ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {!employmentDetails.wtrOptOut && (
          <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
            <div className="col-span-12">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Bank Details
              </h3>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Bank Name
                  </label>
                  <p className="text-base text-gray-900">
                    {employmentDetails.bankDetails.bankName}
                  </p>
                </div>
                <div className="col-span-4">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Account Number
                  </label>
                  <p className="text-base text-gray-900">
                    {employmentDetails.bankDetails.accountNumber}
                  </p>
                </div>
                <div className="col-span-4">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Sort Code
                  </label>
                  <p className="text-base text-gray-900">
                    {employmentDetails.bankDetails.sortCode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
