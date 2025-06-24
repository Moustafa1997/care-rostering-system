import React from "react";
import dynamic from "next/dynamic";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
export default function ServicePayroll() {
  const StaffPayChart = dynamic(
    () => import("../Finance/charts/StaffPayrollChart"),
    { ssr: false }
  );
  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="col-span-12">
            <h2 className="text-xl font-semibold text-gray-500 mb-0">
              Service Payroll Overview
            </h2>
          </div>
          <div className="col-span-4 mb-4">
            <label className="text-sm font-medium text-[#41526A] mb-1">
              Select Year
            </label>
            <div className="flex justify-center h-10 items-center border border-blue-soft bg-white gap-4 rounded-md">
              <Select>
                <SelectTrigger className="border-none focus:ring-0">
                  <SelectValue placeholder="2025" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Staff A</SelectItem>
                  <SelectItem value="staff">Staff B</SelectItem>
                  <SelectItem value="admin">Staff C</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="col-span-4 mb-4">
            <label className="text-sm font-medium text-[#41526A] mb-1">
              Select Service
            </label>
            <div className="flex justify-center h-10 items-center border border-blue-soft bg-white gap-4 rounded-md">
              <Select>
                <SelectTrigger className="border-none focus:ring-0">
                  <SelectValue placeholder="select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Staff A</SelectItem>
                  <SelectItem value="staff">Staff B</SelectItem>
                  <SelectItem value="admin">Staff C</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="col-span-12">
            <p className="text-lg font-medium text-black">
              220 shifts were completed across 6 services
            </p>
            <p className="text-lg font-medium text-black">
              20 shifts were covered by 6 staff members, working a total 200
              hours
            </p>
            <p className="text-lg font-medium text-black">
              Total service payroll cost was £ 2,048{" "}
            </p>
            <p className="text-lg font-medium text-black">
              <strong>Jane Doe</strong> had the highest spend £ 2,048{" "}
            </p>
            <p className="text-lg font-medium text-black">
              <strong>Jane Doe</strong> had the lowest spend £ 2,048{" "}
            </p>
            <div className="bg-[#192B7F] rounded-lg p-2 w-1/2 mt-4">
              <p className="text-[#19F0FF] text-xs font-semibold">
                Service Payroll increased by 11% compared to the previous 7 day
                period.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="col-span-12">
            <h2 className="text-xl font-semibold text-gray-500 mb-0">
              Payroll trend graph
            </h2>
          </div>
          <div className="col-span-4 mb-4">
            <label className="text-sm font-medium text-[#41526A] mb-1">
              Select Year
            </label>
            <div className="flex justify-center h-10 items-center border border-blue-soft bg-white gap-4 rounded-md">
              <Select>
                <SelectTrigger className="border-none focus:ring-0">
                  <SelectValue placeholder="2025" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Staff A</SelectItem>
                  <SelectItem value="staff">Staff B</SelectItem>
                  <SelectItem value="admin">Staff C</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="col-span-12">
            <StaffPayChart />
          </div>
        </div>
      </div>
    </section>
  );
}
