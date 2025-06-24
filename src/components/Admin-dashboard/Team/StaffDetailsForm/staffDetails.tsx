import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { useStaffFormStore } from "@/stores/staffFormStore";
import { ProfileImageUpload } from "@/components/ui/profile-image-upload";
import ViewStaffDetails from "@/components/ui/admin/view-staff-details";

export default function StaffDetails() {
  const { formData, setField, errors, validateStep, formMode } =
    useStaffFormStore();
  const { basicDetails } = formData;

  const handleFieldChange = (field: string, value: string) => {
    setField("basicDetails", field, value);
    // Remove automatic validation - validation will only happen on Next/Save as Draft
  };

  const getFieldError = (fieldName: string) => {
    return errors[fieldName];
  };

  // If in view mode, render the view component
  if (formMode === "view") {
    return <ViewStaffDetails />;
  }

  return (
    <>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        {/* Profile */}
        <section>
          <h2 className="text-xl font-semibold text-gray-500">Profile</h2>
          <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
            <div className="col-span-2">
              <ProfileImageUpload
                initialImage={basicDetails.photoUrl}
                onImageChange={(url) => handleFieldChange("photoUrl", url)}
              />
              {getFieldError("photoUrl") && (
                <p className="text-red text-sm mt-1">
                  {getFieldError("photoUrl")}
                </p>
              )}
            </div>
            <div className="col-span-10 w-9/12 lg:ml-16 2xl:ml-0">
              <div className="mb-4">
                <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                  Title
                </label>
                <div className="w-56 border border-blue-soft bg-white rounded-md">
                  <Select
                    value={basicDetails.title}
                    onValueChange={(value) => handleFieldChange("title", value)}
                  >
                    <SelectTrigger
                      className={`w-full !px-3 h-10 border-none focus:ring-0 ${getFieldError("title") ? "border-red" : ""}`}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mr">Mr</SelectItem>
                      <SelectItem value="Mrs">Mrs</SelectItem>
                      <SelectItem value="Miss">Miss</SelectItem>
                      <SelectItem value="Dr">Dr</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {getFieldError("title") && (
                  <p className="text-red text-sm mt-1">
                    {getFieldError("title")}
                  </p>
                )}
              </div>
              <div className="flex justify-start 2xl:gap-8 lg:gap-3 2xl:flex-nowrap lg:flex-wrap">
                <div className="w-full">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    First Name
                  </label>
                  <Input
                    variant="bordered"
                    type="text"
                    placeholder="Enter"
                    value={basicDetails.firstName}
                    onChange={(e) =>
                      handleFieldChange("firstName", e.target.value)
                    }
                    className={getFieldError("firstName") ? "border-red" : ""}
                  />
                  {getFieldError("firstName") && (
                    <p className="text-red text-sm mt-1">
                      {getFieldError("firstName")}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Last Name
                  </label>
                  <Input
                    variant="bordered"
                    type="text"
                    placeholder="Enter"
                    value={basicDetails.lastName}
                    onChange={(e) =>
                      handleFieldChange("lastName", e.target.value)
                    }
                    className={getFieldError("lastName") ? "border-red" : ""}
                  />
                  {getFieldError("lastName") && (
                    <p className="text-red text-sm mt-1">
                      {getFieldError("lastName")}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-start 2xl:gap-8 lg:gap-3 mt-4 2xl:flex-nowrap lg:flex-wrap">
                <div className="w-full">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Phone Number
                  </label>
                  <Input
                    variant="bordered"
                    type="tel"
                    placeholder="Enter"
                    value={basicDetails.phoneNumber}
                    onChange={(e) =>
                      handleFieldChange("phoneNumber", e.target.value)
                    }
                    className={getFieldError("phoneNumber") ? "border-red" : ""}
                  />
                  {getFieldError("phoneNumber") && (
                    <p className="text-red text-sm mt-1">
                      {getFieldError("phoneNumber")}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Email ID
                  </label>
                  <Input
                    variant="bordered"
                    type="email"
                    placeholder="Enter"
                    value={basicDetails.email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    className={getFieldError("email") ? "border-red" : ""}
                  />
                  {getFieldError("email") && (
                    <p className="text-red text-sm mt-1">
                      {getFieldError("email")}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Nationality
                  </label>
                  <Input
                    variant="bordered"
                    type="text"
                    placeholder="Enter"
                    value={basicDetails.nationality}
                    onChange={(e) =>
                      handleFieldChange("nationality", e.target.value)
                    }
                    className={getFieldError("nationality") ? "border-red" : ""}
                  />
                  {getFieldError("nationality") && (
                    <p className="text-red text-sm mt-1">
                      {getFieldError("nationality")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
