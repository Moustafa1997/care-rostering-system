import React from "react";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import { Button } from "@/components/ui/button";
import { useStaffFormStore } from "@/stores/staffFormStore";

export default function ViewStaffDetails() {
  const { formData, switchToEditMode } = useStaffFormStore();
  const { basicDetails } = formData;

  const handleEditClick = () => {
    // Switch to edit mode using the store method
    switchToEditMode();
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-500">Profile</h2>
        <Button
          variant="outline"
          className="w-32 h-9"
          onClick={handleEditClick}
        >
          Edit
        </Button>
      </div>
      <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
        <div className="2xl:col-span-2 lg:col-span-12 w-[100px] h-[100px]">
          <div className="rounded-full border border-black overflow-hidden w-full h-full flex justify-center items-center">
            <ImageComponent
              src={basicDetails.photoUrl || "/images/contractor-profile.jpeg"}
              alt="Staff profile"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="2xl:col-span-10 lg:col-span-12">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Title
              </label>
              <p className="text-base text-gray-900">{basicDetails.title}</p>
            </div>
            <div className="col-span-6">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                First Name
              </label>
              <p className="text-base text-gray-900">
                {basicDetails.firstName}
              </p>
            </div>
            <div className="col-span-6">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Last Name
              </label>
              <p className="text-base text-gray-900">{basicDetails.lastName}</p>
            </div>
            <div className="col-span-6">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Phone Number
              </label>
              <p className="text-base text-gray-900">
                {basicDetails.phoneNumber}
              </p>
            </div>
            <div className="col-span-6">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Email
              </label>
              <p className="text-base text-gray-900">{basicDetails.email}</p>
            </div>
            <div className="col-span-6">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Nationality
              </label>
              <p className="text-base text-gray-900">
                {basicDetails.nationality}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
