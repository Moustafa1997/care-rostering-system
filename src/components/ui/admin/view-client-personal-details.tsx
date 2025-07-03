import React from "react";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import { Button } from "@/components/ui/button";

export default function ViewClientPersonalDetails() {
  const [isActive, setIsActive] = React.useState(true);

  const handleToggle = () => {
    if (isActive) {
      const confirm = window.confirm(
        "Are you sure you want to mark the client as inactive?"
      );
      if (!confirm) return;
    }
    setIsActive(!isActive);
  };
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
        <div className="2xl:col-span-10 lg:col-span-12 w-full">
          <div className="flex justify-between items-baseline mb-8 w-full">
            <div className="w-full">
              <label className="block text-sm font-medium text-[#41526A] mb-1">
                Full Name
              </label>
              <span className="text-[#191A1C] text-sm font-normal">
                John Deo
              </span>
            </div>
            <div className="w-full flex justify-end items-center gap-2">
              <span
                className={`font-semibold text-sm ${isActive ? "text-black" : "text-gray-400"}`}
              >
                Active
              </span>
              <div
                onClick={handleToggle}
                className={`relative h-5 w-11 rounded-full cursor-pointer transition-colors duration-300 ${
                  isActive ? "bg-[#1A2D8A]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                    isActive ? "translate-x-6" : ""
                  }`}
                />
              </div>
              <span
                className={`font-semibold text-sm ${!isActive ? "text-black" : "text-gray-400"}`}
              >
                Inactive
              </span>
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
                Care type
              </label>
              <span className="text-[#191A1C] text-sm font-normal">
               residential care
              </span>
            </div>
          </div>
          <div className="flex justify-start gap-8 mt-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-[#41526A] mb-1">
                Address
              </label>
              <span className="text-[#191A1C] text-sm font-normal">
                Location address Location addressLocation address ressLocation
                address Location address
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
