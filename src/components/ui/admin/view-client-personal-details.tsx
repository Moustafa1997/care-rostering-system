import React from "react";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import { Button } from "@/components/ui/button";

export default function ViewClientPersonalDetails() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-500">Personal detail</h2>
        <Button variant="outline" className="w-32 h-9">
          Edit
        </Button>
      </div>
      <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
        <div className="2xl:col-span-2 lg:col-span-12 w-[100px] h-[100px]">
          <div className="rounded-full border border-black overflow-hidden w-full h-full flex justify-center items-center">
            <ImageComponent
              src="/images/contractor-profile.jpeg"
              alt="Contractor-profile"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="2xl:col-span-10 lg:col-span-12 w-9/12">
          <div className="flex justify-start gap-8 mb-8">
            <div className="w-full">
              <label className="block text-sm font-medium text-[#41526A] mb-1">
                Full Name
              </label>
              <span className="text-[#191A1C] text-sm font-normal">John Deo</span>
            </div>
          </div>
          <div className="flex justify-start gap-8 mt-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-[#41526A] mb-1">
                Phone Number
              </label>
              <span className="text-[#191A1C] text-sm font-normal">
                213123123123
              </span>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-[#41526A] mb-1">
                Email ID
              </label>
              <span className="text-[#191A1C] text-sm font-normal">
                john@gmail.com
              </span>
            </div>
          </div>
          <div className="flex justify-start gap-8 mt-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-[#41526A] mb-1">
                Age
              </label>
              <span className="text-[#191A1C] text-sm font-normal">Lorem</span>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-[#41526A] mb-1">
                Admission date
              </label>
              <span className="text-[#191A1C] text-sm font-normal">Lorem</span>
            </div>
          </div>
          <div className="flex justify-start gap-8 mt-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-[#41526A] mb-1">
                Address
              </label>
              <span className="text-[#191A1C] text-sm font-normal">Location address Location addressLocation address ressLocation address Location address</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
