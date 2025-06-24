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
export default function FinanceOverview() {
    const PayrollTrendChart = dynamic(() => import('../Finance/charts/PayrollTrendChart'), { ssr: false });
  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="col-span-12">
            <h2 className="text-xl font-semibold text-gray-500 mb-0">
              Finance Overview
            </h2>
            <p className="text-base font-normal text-black">
              A quick snapshot of your payroll and workforce costs.
            </p>
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
              Select Service
            </label>
           <div className="flex justify-center h-10 items-center border border-blue-soft bg-white gap-4 rounded-md">
                <Select>
                  <SelectTrigger className="border-none focus:ring-0">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Sick Leave</SelectItem>
                    <SelectItem value="staff">Vacation Leave</SelectItem>
                    <SelectItem value="admin">Emergency Leave</SelectItem>
                    <SelectItem value="manager">Maternity / Paternity</SelectItem>
                    <SelectItem value="manager">Personal Leave</SelectItem>
                    <SelectItem value="manager">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
          </div>
          <div className="col-span-4">
            <div className="bg-white rounded-[20px] shadow flex flex-col items-center justify-center p-4 gap-2 max-h-36">
                <p className="text-base font-medium text-[#41526A]">Total payroll</p>
                <h2 className="text-4xl font-semibold text-[#253BAA]">£12,480</h2>
            </div>
          </div>
          <div className="col-span-4">
           <div className="bg-white rounded-[20px] shadow flex flex-col items-center justify-center p-4 gap-2 max-h-36">
                <p className="text-base font-medium text-[#41526A]">Total Hours Worked</p>
                <h2 className="text-4xl font-semibold text-[#253BAA]">400 hrs</h2>
            </div>
          </div>
          <div className="col-span-4">
          <div className="bg-white rounded-[20px] shadow flex flex-col items-center justify-center p-4 gap-2 max-h-36">
                <p className="text-base font-medium text-[#41526A]">Average Pay per Hour</p>
                <h2 className="text-4xl font-semibold text-[#253BAA]">£20</h2>
            </div>
          </div>
        </div>

         <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="col-span-12">
            <h2 className="text-xl font-semibold text-gray-500 mb-0">
              Payroll and hours work trend 
            </h2>
          </div>
           <div className="col-span-4 mb-4">
            <label className="text-sm font-medium text-[#41526A] mb-1">
              Select
            </label>
           <div className="flex justify-center h-10 items-center border border-blue-soft bg-white gap-4 rounded-md">
                <Select>
                  <SelectTrigger className="border-none focus:ring-0">
                    <SelectValue placeholder="Daily" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Daily</SelectItem>
                    <SelectItem value="staff">Monthly</SelectItem>
                    <SelectItem value="admin">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
          </div>
          <div className="col-span-12">
            <p className="text-xs mb-4 font-medium text-black">Total Payroll</p>
          </div>
          <div className="col-span-12">
           <PayrollTrendChart />
          </div>
        </div>
      </div>
    </section>
  );
}
