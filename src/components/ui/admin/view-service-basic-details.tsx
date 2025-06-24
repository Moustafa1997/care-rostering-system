import React from "react";
import { Button } from "@/components/ui/button";

export default function ViewServiceBasicDetails() {
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-500">Basic detail</h2>
      <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
        <div className="col-span-12 flex justify-start">
          <div className="w-full">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              Service Name
            </label>
            <span className="text-[#191A1C] text-sm font-normal">
              Physiotheraphy
            </span>
          </div>
        </div>
        <div className="col-span-12 flex justify-start">
          <div className="w-full">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              Description
            </label>
            <span className="text-[#191A1C] text-sm font-normal">
              Physiotherapy, also known as physical therapy, is a healthcare profession that focuses on restoring movement and function, and improving overall well-being through various techniques like exercise, manual therapy, and patient education. Physiotherapy, also known as physical therapy, is a healthcare profession that focuses on restoring movement and function, and improving overall well-being through various techniques like exercise, manual therapy, and patient education. Physiotherapy, also known as physical therapy, is a healthcare profession that focuses on restoring movement and function, and improving overall well-being through various techniques like exercise, manual therapy, and patient education. 
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
         <Button variant="default" className="w-32 h-9">
          Edit
        </Button>
      </div>
    </>
  );
}
