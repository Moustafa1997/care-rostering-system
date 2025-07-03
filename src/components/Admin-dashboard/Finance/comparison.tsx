'use client';
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { DatePickerForm } from "@/components/ui/date-picker";
import ServiceTable from "./comparisonTable/serviceTable";
import ComparisonCardSlider from "../Finance/comparisonSlider/slider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
export default function Comparison() {
  const [enabled, setEnabled] = useState(true);
  const PayrollComparisonChart = dynamic(
    () => import("../Finance/charts/PayrollComparisonChart"),
    { ssr: false }
  );
  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="col-span-12">
            <h2 className="text-xl font-semibold text-gray-500 mb-0">
              Compare
            </h2>
          </div>
          <div className="2xl:col-span-3 lg:col-span-6 mb-4">
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
          <div className="2xl:col-span-3 lg:col-span-6 mb-4">
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
          <div className="col-span-12 gap-8">
            <div className="mb-4 w-full">
              <div className="flex items-center gap-4 mb-3">
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
              <div className="flex justify-center w-1/2 h-10 items-center border border-blue-soft bg-white gap-4 rounded-md">
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
            <ComparisonCardSlider />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="col-span-12">
            <h2 className="text-xl font-semibold text-gray-500 mb-0">
              Comparison chart
            </h2>
          </div>
          <div className="col-span-12 mt-4 mb-4">
            <p className="text-base font-medium text-black">Payroll</p>
          </div>
          <div className="col-span-12">
            <PayrollComparisonChart />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="col-span-12">
            <h2 className="text-xl font-semibold text-gray-500 mb-0">
              Comparison Table
            </h2>
          </div>
          <div className="col-span-12">
            <ServiceTable />
          </div>
        </div>
      </div>
    </section>
  );
}
