import React, { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CreateShiftModal = ({ onClose }: { onClose: () => void }) => {
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleProceed = () => {
    if (selectedOption) {
      setShowSecondModal(true);
    }
  };

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleCloseAll = () => {
    setShowSecondModal(false);
    onClose();
  };

  return (
    <>
      {!showSecondModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md w-[866px] p-6 relative">
            <button className="absolute top-4 right-4" onClick={onClose}>
              <X />
            </button>
            <h2 className="text-2xl text-[#010101] font-semibold mb-6">
              How you want to create shift
            </h2>
            <div className="flex gap-6 mb-4 p-16">
              <div
                onClick={() => handleOptionChange("automatic")}
                className={`w-full border rounded-md px-4 py-2 flex items-center gap-3 cursor-pointer ${
                  selectedOption === "automatic"
                    ? "border-blue-500 bg-blue-50"
                    : "border-[#8C99AA]"
                }`}
              >
                <Input type="radio" checked={selectedOption === "automatic"} readOnly className="w-6" />
                <label className="text-base font-medium text-[#2F3E53]">
                  Automatic Scheduling
                </label>
              </div>
              <div
                onClick={() => handleOptionChange("manual")}
                className={`w-full border rounded-md px-4 py-2 flex items-center gap-3 cursor-pointer ${
                  selectedOption === "manual"
                    ? "border-blue-500 bg-blue-50"
                    : "border-[#8C99AA]"
                }`}
              >
                <Input type="radio" checked={selectedOption === "manual"} readOnly className="w-6" />
                <label className="text-base font-medium text-[#2F3E53]">
                  Manual Scheduling
                </label>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Button variant="outline" className="w-[156px]" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="default"
                className="w-[156px]"
                onClick={handleProceed}
                disabled={!selectedOption}
              >
                Proceed
              </Button>
            </div>
          </div>
        </div>
      )}
      {showSecondModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md w-[600px] p-6 relative">
            <button className="absolute top-4 right-4" onClick={handleCloseAll}>
              <X />
            </button>
            <h2 className="text-xl text-[#010101] font-semibold mb-6">
              Do you want to create shift for a Service or a Client?
            </h2>
            <div className="flex gap-8 mb-4 justify-center p-6">
              <div className="flex items-center gap-2">
                <Input type="radio" className="w-4"></Input>
                <label>Service</label>
              </div>
               <div className="flex items-center gap-2">
                <Input type="radio" className="w-4"></Input>
                <label>Client</label>
              </div>
            </div>
            <Link href="/dashboard/admin/create-shift/manual-shift-creation" className="flex justify-center">
              <Button variant="default" className="w-40">
                Proceed
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateShiftModal;
