"use client";
import React from "react";
import NewRequestTable from "@/components/ui/admin/new-request-tabel";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import { Button } from "@/components/ui/button";

const DeatilsPage = () => {
  return (
    <div className="w-full p-4 bg-slate-50">
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-500 mb-4">
          Dashboard / Cancellation request{" "}
          <span className="text-[#959595]">/ Detail</span>
        </p>
        <h1 className="text-2xl text-gray-500 font-semibold mb-4">
          Cancellation detail
        </h1>
      </div>
      <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-[40px] p-8 shadow">
        <div className="col-span-3 p-4 border-r-2 border-[#BECFE7]">
          <ImageComponent
            src="/images/user.svg"
            width={100}
            height={100}
            alt="user"
          />
          <p className="text-2xl font-semibold text-[#41526A] mt-4">
            Robart Doe
          </p>
        </div>
        <div className="col-span-8">
          <div className="pt-8 flex items-center gap-16 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-[#41526A] text-base font-normal">
                Service name
              </span>
              <p className="font-semibold">: Name</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#41526A] text-base font-semibold">
                Request date
              </span>
              <p className="font-semibold">: 1/1/2025</p>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-xl font-semibold text-[#293444] mb-1">Reasons for cancel</h1>
            <p className="text-sm font-normal text-[#858585]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          </div>
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-[#293444] mb-1">Additional Notes</h1>
            <p className="text-sm font-normal text-[#858585]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          </div>

          <div className="flex justify-start items-center gap-4">
            <Button variant={"outline"} className="w-[97px] h-[36px]">Deny</Button>
            <Button variant={"outline"} className="w-[97px] h-[36px]">Approve</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeatilsPage;
