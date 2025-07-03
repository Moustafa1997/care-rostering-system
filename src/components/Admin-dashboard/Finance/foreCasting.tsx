import React,{useState} from "react";
import { DatePickerForm } from "@/components/ui/date-picker";
import dynamic from "next/dynamic";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
export default function ForeCasting() {
    const [enabled, setEnabled] = useState(true);
  const ForecastVsActualChart = dynamic(
    () => import("../Finance/charts/ForecastVsActualChart"),
    { ssr: false }
  );
  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="col-span-12">
            <h2 className="text-xl font-semibold text-gray-500 mb-0">
              Forecasting Overview
            </h2>
          </div>
          <div className="flex justify-between w-full col-span-12 gap-8">
          <div className="mb-4 w-full">
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
           <div className="mb-4 w-full">
           <div className="flex items-center gap-4 mb-1">
             <span
              className={`${enabled ? "font-semibold text-sm" : "text-gray-500 text-sm"}`}
            >
              Service
            </span>
            <button
              onClick={() => setEnabled(!enabled)}
              className={`relative inline-flex h-5 w-11 items-center rounded-full transition-colors duration-300 ${
                enabled ? "bg-blue-900" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  enabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`${!enabled ? "font-semibold text-sm" : "text-gray-500 text-sm"}`}
            >
              Staff
            </span>
           </div>
            <div className="flex justify-center h-10 items-center border border-blue-soft bg-white gap-4 rounded-md">
              <Select>
                <SelectTrigger className="border-none focus:ring-0">
                  <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Staff A</SelectItem>
                  <SelectItem value="staff">Staff B</SelectItem>
                  <SelectItem value="admin">Staff C</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          </div>
          <div className="col-span-12">
            <p className="text-lg font-medium text-black">
              Forecast for 2025 shows an estimated total of 4,320 shifts across 6 services
            </p>
            <p className="text-lg font-medium text-black">
             These shifts are expected to require approximately 68,000 working hours
            </p>
            <p className="text-lg font-medium text-black">
              Projected total payroll for the year is £720,000
            </p>
            <p className="text-lg font-medium text-black">
              Estimated overtime payroll is £48,000 based on existing rota patterns.
            </p>
            <div className="bg-[#192B7F] rounded-lg p-2 w-1/2 mt-4">
              <p className="text-[#19F0FF] text-xs font-semibold">
               Around 55 staff members will be required to cover this demand efficiently without excess overtime
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="col-span-12">
            <h2 className="text-xl font-semibold text-gray-500 mb-0">
              Forecast vs Actual
            </h2>
          </div>
          <div className="col-span-12 mt-4 mb-4">
            <p className="text-base font-medium text-black">Total Payroll</p>
          </div>
          <div className="col-span-12">
            <ForecastVsActualChart />
          </div>
        </div>
      </div>
    </section>
  );
}
