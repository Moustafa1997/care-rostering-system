import React from "react";
import { Button } from "@/components/ui/button";

export default function ViewClientDoctorGpDetails() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-500">Doctor/GP</h2>
        <Button variant="outline" className="w-32 h-9">
          Edit
        </Button>
      </div>
      <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
        <div className="col-span-12 flex justify-start">
          <div className="w-full">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              GP Name
            </label>
            <span className="text-[#191A1C] text-sm font-normal">
              UYTUYY 8732874298
            </span>
          </div>
        </div>
        <div className="col-span-12 flex justify-start">
          <div className="w-full">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              Contact Number
            </label>
            <span className="text-[#191A1C] text-sm font-normal">
              8765123456
            </span>
          </div>
        </div>
        <div className="col-span-12 flex justify-start">
          <div className="w-full">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              Key Working Session Frequency
            </label>
            <div className="flex items-center gap-4">
               <p><span>2 </span>Per Week</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
