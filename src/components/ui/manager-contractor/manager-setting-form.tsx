import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import ImageComponent from "../../ImageComponent/ImageComponent";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Pencil } from "lucide-react";
import { useUpdateAdminInfo } from "@/hooks/admin/useUpdateAdminInfo";
import { useUpdateAdminPassword } from "@/hooks/admin/useUpdateAdminPassword";
import { useAdminInfo } from "@/hooks/admin/useAdminInfo";
import { useUploadAdminImage } from "@/hooks/admin/useUploadAdminImage";

export default function ManagerSettingForm() {
  const { uploadProfileImage, isLoading: isUploadingImage } =
    useUploadAdminImage();
  const { updateAdminInfo, isPending: isUpdatingInfo } = useUpdateAdminInfo();
  const { updateAdminPassword, isPending: isUpdatingPassword } =
    useUpdateAdminPassword();
  const { adminInfo, isLoading: isLoadingAdminInfo } = useAdminInfo();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    profileImage: ""
  });

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Initialize form with admin data
  useEffect(() => {
    if (adminInfo) {
      setPersonalInfo({
        name: adminInfo.name || "",
        email: adminInfo.email || "",
        phone: adminInfo.phone || "",
        profileImage: adminInfo.photo ? `/${adminInfo.photo}` : ""
      });
    }
  }, [adminInfo]);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = await uploadProfileImage(file);
      if (imageUrl) {
        setPersonalInfo((prev) => ({
          ...prev,
          profileImage: imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`
        }));
      }
    }
  };

  const handlePersonalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateAdminInfo(personalInfo);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateAdminPassword(passwordInfo);
  };

  if (isLoadingAdminInfo) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading admin information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-white rounded-md">
      {/* Personal Information */}
      <section>
        <h2 className="text-3xl font-semibold text-gray-500">
          Personal information
        </h2>
        <form onSubmit={handlePersonalInfoSubmit}>
          <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-md p-8 shadow">
            <div className="col-span-2 relative w-[100px] h-[100px]">
              <div className="rounded-full overflow-hidden w-full h-full flex justify-center items-center">
                <ImageComponent
                  src={
                    personalInfo.profileImage ||
                    "/images/contractor-profile.jpeg"
                  }
                  alt="Admin-profile"
                  width={100}
                  height={100}
                />
              </div>
              <button
                type="button"
                onClick={handleProfileImageClick}
                className="absolute bottom-0 right-0 bg-white rounded-full border border-gray-300 p-1 shadow hover:bg-gray-100"
              >
                <Pencil size={16} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="col-span-10 w-9/12 2xl:ml-0 lg:ml-7">
              <div className="flex justify-start gap-8">
                <div className="w-full">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Full Name
                  </label>
                  <Input
                    variant="bordered"
                    type="text"
                    name="name"
                    value={personalInfo.name}
                    onChange={handlePersonalInfoChange}
                    placeholder="Enter"
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Email
                  </label>
                  <Input
                    variant="bordered"
                    type="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                    placeholder="Enter"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-normal text-[#2F3E53] mb-1 mt-4">
                  Phone Number
                </label>
                <Input
                  variant="bordered"
                  type="tel"
                  name="phone"
                  value={personalInfo.phone}
                  onChange={handlePersonalInfoChange}
                  placeholder="Enter"
                />
              </div>
              <div className="mt-8">
                <Button
                  type="submit"
                  variant="default"
                  className="w-[235px]"
                  disabled={isUpdatingInfo}
                >
                  {isUpdatingInfo ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </section>

      {/* Change Password */}
      <section>
        <h2 className="text-3xl font-semibold text-gray-500">
          Change Password
        </h2>
        <form onSubmit={handlePasswordSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-[#E1E1E1] rounded-md p-8 shadow">
            <div>
              <div>
                <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    variant="bordered"
                    name="currentPassword"
                    value={passwordInfo.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-gray-sm"
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    variant="bordered"
                    name="confirmPassword"
                    value={passwordInfo.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-gray-sm"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                New Password
              </label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  variant="bordered"
                  name="newPassword"
                  value={passwordInfo.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-gray-sm"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="mt-4">
              <Button
                type="submit"
                variant="default"
                className="w-[235px]"
                disabled={isUpdatingPassword}
              >
                {isUpdatingPassword ? "Updating..." : "Update password"}
              </Button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
