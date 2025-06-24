import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ViewTrainingDetails() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-500">
          Mandatory Training Details
        </h2>
        <Button variant="outline" className="w-32 h-9">
          Edit
        </Button>
      </div>
      <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
        <div className="col-span-12">
          <div className="flex justify-start gap-8 mb-8">
            <div className="w-full">
              <label className="block text-sm font-medium text-[#41526A] mb-1">
                Training Name
              </label>
              <span className="text-[#191A1C] text-sm font-normal">
                Manual Handling
              </span>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-[#41526A] mb-1">
                Status
              </label>
              <span className="text-[#191A1C] text-sm font-normal">
                Completed
              </span>
            </div>
          </div>
          <div className="flex justify-start gap-8 mb-8">
            <div className="w-full">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Documents
              </label>
              <div className="flex items-center gap-4">
                <span className="text-[#191A1C] text-sm font-normal">
                  Doc.pdf
                </span>
                <Download size={16} className="text-blue-dark1" />
              </div>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-[#41526A] mb-1">
                Expiry Date of Document
              </label>
              <span className="text-[#191A1C] text-sm font-normal">
                10/06/28
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
