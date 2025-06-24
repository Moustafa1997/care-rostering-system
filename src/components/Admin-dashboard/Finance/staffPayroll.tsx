import React from "react";
import { DatePickerForm } from "@/components/ui/date-picker";
import dynamic from "next/dynamic";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
export default function StaffPayroll() {
    const StaffPayChart = dynamic(() => import('../Finance/charts/StaffPayrollChart'), { ssr: false });
  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="col-span-12">
            <h2 className="text-xl font-semibold text-gray-500 mb-0">
              Staff Payroll Overview
            </h2>
          </div>
           <div className="col-span-3 mb-4">
            <label className="text-sm font-medium text-[#41526A] mb-1">
              Date From
            </label>
            <div className="flex gap-2">
              <DatePickerForm
                placeholder="select"
                value=""
                onChange={() => {}}
              />
            </div>
          </div>
           <div className="col-span-3 mb-4">
            <label className="text-sm font-medium text-[#41526A] mb-1">
              Date To
            </label>
            <div className="flex gap-2">
              <DatePickerForm
                placeholder="select"
                value=""
                onChange={() => {}}
              />
            </div>
          </div>
           <div className="col-span-4 mb-4">
            <label className="text-sm font-medium text-[#41526A] mb-1">
              Select Staff
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
            <p className="text-lg font-medium text-black">25 staff worked 350 hours</p>
            <p className="text-lg font-medium text-black">Total payroll: £12,480</p>
            <p className="text-lg font-medium text-black"><strong>Jane Doe</strong> logged the most hours.</p>
            <p className="text-lg font-medium text-black"><strong>Jane Doe</strong> earned the most due to overtime</p>
            <div className="bg-[#192B7F] rounded-lg p-2 w-1/2 mt-4">
                <p className="text-[#19F0FF] text-xs font-semibold">Payroll increased by 11% compared to the previous period.</p>
            </div>
          </div>
        </div>
         <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="col-span-12">
            <h2 className="text-xl font-semibold text-gray-500 mb-0">
              Payroll by staff 
            </h2>
          </div>
          <div className="col-span-12">
           <StaffPayChart />
          </div>
        </div>
      </div>
    </section>
  );
}
