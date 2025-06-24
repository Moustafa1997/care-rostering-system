import React from "react";
import { Button } from "@/components/ui/button";
import ImageComponent from "@/components/ImageComponent/ImageComponent";

export default function ViewServiceLocationContact() {
  return (
    <>
        <h2 className="text-xl font-semibold text-gray-500">Contact and Location</h2>
      <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
        <div className="col-span-12 flex justify-start">
                  <div className="w-full">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              Postal code
            </label>
            <span className="text-[#191A1C] text-sm font-normal">
              Postal code
            </span>
          </div>
          <div className="w-full">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              Address
            </label>
            <span className="text-[#191A1C] text-sm font-normal">
              Location address Location address
            </span>
          </div>
        </div>
        <div className="col-span-12">
          <div className="w-full mb-4">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              Phone
            </label>
            <span className="text-[#191A1C] text-sm font-normal">
              09876567654
            </span>
          </div>
          <div className="w-full mb-4">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              Email
            </label>
            <span className="text-[#191A1C] text-sm font-normal">
              email@email.com
            </span>
          </div>
        </div>
        <div className="col-span-12 w-full">
          <ImageComponent
            src="/images/map.svg"
            width={500}
            height={500}
            alt="map"
          />
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
