import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { useStaffFormStore } from "@/stores/staffFormStore";
import { DatePickerForm } from "@/components/ui/date-picker";
import ViewEmploymentDetails from "@/components/ui/admin/view-employment-details";

export default function EmploymentDetail() {
  const { formData, setField, errors, validateStep, formMode, steps } =
    useStaffFormStore();

  const handleInputChange = (field: string, value: string | boolean) => {
    setField("employmentDetails", field, value);
    // validateStep("employment-details");
  };

  const handleBankDetailsChange = (field: string, value: string) => {
    setField("employmentDetails", `bankDetails.${field}`, value);
    // validateStep("employment-details");
  };

  // Find the employment-details step
  const employmentDetailsStep = steps.find(
    (step) => step.id === "employment-details"
  );

  // If in view mode and the step is completed, render the view component
  if (formMode === "view" && employmentDetailsStep?.isCompleted) {
    return <ViewEmploymentDetails />;
  }

  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        {/* Employment Details */}
        <h2 className="text-xl font-semibold text-gray-500">
          Employment Details
        </h2>
        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="2xl:col-span-8 lg:col-span-12">
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Interview Date
              </label>

              <DatePickerForm
                value={formData.employmentDetails.interviewDate}
                onChange={(data) => handleInputChange("interviewDate", data)}
              />
              {errors["employmentDetails.interviewDate"] && (
                <p className="text-red text-sm mt-1">
                  {errors["employmentDetails.interviewDate"]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Start date
              </label>

              <DatePickerForm
                value={formData.employmentDetails.startDate}
                onChange={(data) => handleInputChange("startDate", data)}
              />
              {errors["employmentDetails.startDate"] && (
                <p className="text-red text-sm mt-1">
                  {errors["employmentDetails.startDate"]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Social Work Number
              </label>
              <Input
                variant="bordered"
                type="text"
                placeholder="Enter"
                value={formData.employmentDetails.socialWorkNumber}
                onChange={(e) =>
                  handleInputChange("socialWorkNumber", e.target.value)
                }
              />
              {errors["employmentDetails.socialWorkNumber"] && (
                <p className="text-red text-sm mt-1">
                  {errors["employmentDetails.socialWorkNumber"]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Role
              </label>
              <div className="flex justify-center items-center border border-blue-soft bg-white gap-4 rounded-md">
                <Select
                  value={formData.employmentDetails.workingRole}
                  onValueChange={(value) =>
                    handleInputChange("workingRole", value)
                  }
                >
                  <SelectTrigger className="border-none focus:ring-0">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Support Worker">
                      Support Worker
                    </SelectItem>
                    <SelectItem value="Senior Support Worker">
                      Senior Support Worker
                    </SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Team Leader">Team Leader</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {errors["employmentDetails.workingRole"] && (
                <p className="text-red text-sm mt-1">
                  {errors["employmentDetails.workingRole"]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Weekly Contractual Hours
              </label>
              <Input
                variant="bordered"
                type="number"
                placeholder="Enter"
                value={formData.employmentDetails.weeklyContractedHours}
                onChange={(e) =>
                  handleInputChange("weeklyContractedHours", e.target.value)
                }
              />
              {errors["employmentDetails.weeklyContractedHours"] && (
                <p className="text-red text-sm mt-1">
                  {errors["employmentDetails.weeklyContractedHours"]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Account number
              </label>
              <Input
                variant="bordered"
                type="text"
                placeholder="Enter"
                value={formData.employmentDetails.bankDetails.accountNumber}
                onChange={(e) =>
                  handleBankDetailsChange("accountNumber", e.target.value)
                }
              />
              {errors["employmentDetails.bankDetails.accountNumber"] && (
                <p className="text-red text-sm mt-1">
                  {errors["employmentDetails.bankDetails.accountNumber"]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Opt pension
              </label>
              <div className="flex justify-center items-center border border-blue-soft bg-white gap-4 rounded-md">
                <Select
                  value={
                    formData.employmentDetails.optInForPension ? "Yes" : "No"
                  }
                  onValueChange={(value) =>
                    handleInputChange("optInForPension", value === "Yes")
                  }
                >
                  <SelectTrigger className="border-none focus:ring-0">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {errors["employmentDetails.optInForPension"] && (
                <p className="text-red text-sm mt-1">
                  {errors["employmentDetails.optInForPension"]}
                </p>
              )}
            </div>
          </div>
          <div className="2xl:col-span-4 lg:col-span-12">
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Ni Number
              </label>
              <Input
                variant="bordered"
                type="text"
                placeholder="Enter"
                value={formData.employmentDetails.niNumber}
                onChange={(e) => handleInputChange("niNumber", e.target.value)}
              />
              {errors["employmentDetails.niNumber"] && (
                <p className="text-red text-sm mt-1">
                  {errors["employmentDetails.niNumber"]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Employee Number
              </label>
              <Input
                variant="bordered"
                type="text"
                placeholder="Enter"
                value={formData.employmentDetails.employeeNumber}
                onChange={(e) =>
                  handleInputChange("employeeNumber", e.target.value)
                }
              />
              {errors["employmentDetails.employeeNumber"] && (
                <p className="text-red text-sm mt-1">
                  {errors["employmentDetails.employeeNumber"]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Contract Type
              </label>
              <div className="flex justify-center items-center border border-blue-soft bg-white gap-4 rounded-md">
                <Select
                  value={formData.employmentDetails.contractType}
                  onValueChange={(value) =>
                    handleInputChange("contractType", value)
                  }
                >
                  <SelectTrigger className="border-none focus:ring-0">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Permanent">Permanent</SelectItem>
                    <SelectItem value="Temporary">Temporary</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Zero Hours">Zero Hours</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {errors["employmentDetails.contractType"] && (
                <p className="text-red text-sm mt-1">
                  {errors["employmentDetails.contractType"]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Bank name
              </label>
              <Input
                variant="bordered"
                type="text"
                placeholder="Enter"
                value={formData.employmentDetails.bankDetails.bankName}
                onChange={(e) =>
                  handleBankDetailsChange("bankName", e.target.value)
                }
              />
              {errors["employmentDetails.bankDetails.bankName"] && (
                <p className="text-red text-sm mt-1">
                  {errors["employmentDetails.bankDetails.bankName"]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Sort code
              </label>
              <Input
                variant="bordered"
                type="text"
                placeholder="Enter"
                value={formData.employmentDetails.bankDetails.sortCode}
                onChange={(e) =>
                  handleBankDetailsChange("sortCode", e.target.value)
                }
              />
              {errors["employmentDetails.bankDetails.sortCode"] && (
                <p className="text-red text-sm mt-1">
                  {errors["employmentDetails.bankDetails.sortCode"]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                WTR Opt Out
              </label>
              <div className="flex justify-center items-center border border-blue-soft bg-white gap-4 rounded-md">
                <Select
                  value={formData.employmentDetails.wtrOptOut ? "Yes" : "No"}
                  onValueChange={(value) =>
                    handleInputChange("wtrOptOut", value === "Yes")
                  }
                >
                  <SelectTrigger className="border-none focus:ring-0">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {errors["employmentDetails.wtrOptOut"] && (
                <p className="text-red text-sm mt-1">
                  {errors["employmentDetails.wtrOptOut"]}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
