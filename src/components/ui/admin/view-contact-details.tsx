import React from "react";
import { Button } from "@/components/ui/button";
import { useStaffFormStore } from "@/stores/staffFormStore";
import ImageComponent from "@/components/ImageComponent/ImageComponent";

export default function ViewContactDetails() {
  const { formData, switchToEditMode } = useStaffFormStore();
  const { contactDetails } = formData;

  const handleEditClick = () => {
    // Switch to edit mode using the store method
    switchToEditMode();
  };

  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-500">
            Contact detail
          </h2>
          <Button
            variant="outline"
            className="w-32 h-9"
            onClick={handleEditClick}
          >
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="col-span-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Address Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                  Postal Code
                </label>
                <p className="text-base text-gray-900">
                  {contactDetails.addressDetails.postalCode}
                </p>
              </div>
              <div>
                <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                  Address
                </label>
                <p className="text-base text-gray-900">
                  {contactDetails.addressDetails.address}
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Emergency Contact
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                  Full Name
                </label>
                <p className="text-base text-gray-900">
                  {contactDetails.emergencyContact.fullName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                  Relationship to Staff
                </label>
                <p className="text-base text-gray-900">
                  {contactDetails.emergencyContact.relationshipToStaff}
                </p>
              </div>
              <div>
                <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                  Phone Number
                </label>
                <p className="text-base text-gray-900">
                  {contactDetails.emergencyContact.primaryPhoneNumber}
                </p>
              </div>
              <div>
                <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                  Email
                </label>
                <p className="text-base text-gray-900">
                  {contactDetails.emergencyContact.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="col-span-12">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Emergency Contact Address
            </h3>
            <div className="grid grid-cols-6 gap-4">
              <div>
                <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                  Postal Code
                </label>
                <p className="text-base text-gray-900">
                  {contactDetails.emergencyContact.addressDetails.postalCode}
                </p>
              </div>
              <div className="col-span-5">
                <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                  Address
                </label>
                <p className="text-base text-gray-900">
                  {contactDetails.emergencyContact.addressDetails.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
