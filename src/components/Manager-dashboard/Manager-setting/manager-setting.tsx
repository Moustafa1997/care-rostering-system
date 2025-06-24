"use client";
import ManagerSettingForm from "@/components/ui/manager-contractor/manager-setting-form";

export default function ManagerSetting() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col justify-between w-full">
        <h1 className="text-4xl text-gray-500 font-semibold mb-4">Setting</h1>
      </div>
      <div className="flex flex-col justify-between w-full">
        <ManagerSettingForm />
      </div>
    </div>
  );
}
