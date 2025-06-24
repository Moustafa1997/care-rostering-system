import React from "react";
import { X } from "lucide-react";
import { DatePickerForm } from "@/components/ui/date-picker";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const AskAvailabilityModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-md w-[866px] p-6 relative">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <X />
        </button>

        <h2 className="text-2xl text-[#010101] font-semibold mb-6">Ask for availability</h2>

        <div className="flex gap-6 mb-4">
          <div className="w-full">
            <label className="text-sm font-medium text-[#41526A]">Start date</label>
            <DatePickerForm value={""} placeholder="Select start date" onChange={() => {}} />
          </div>
          <div className="w-full">
            <label className="text-sm font-medium text-[#41526A]">End date</label>
            <DatePickerForm value={""} placeholder="Select end date" onChange={() => {}} />
          </div>
        </div>

        <div className="mb-6 w-[314px]">
          <label className="text-sm font-medium text-[#41526A]">Deadline date</label>
          <DatePickerForm value={""} placeholder="Select deadline" onChange={() => {}} />
        </div>

        <div className="flex items-end gap-4 p-8 bg-[#F4F4F4] rounded-md mb-6">
          <div className="w-1/2">
            <label className="text-sm font-medium text-[#41526A]">Staff (optional)</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Staff" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">John</SelectItem>
                <SelectItem value="2">James</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm font-normal text-[#000000]">OR</div>
          <div className="w-1/2">
            <label className="text-sm text-gray-700">Group (optional)</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="group1">Group 1</SelectItem>
                <SelectItem value="group2">Group 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button variant="outline" className="w-[156px]" onClick={onClose}>Cancel</Button>
          <Button variant="default" className="w-[156px]">Proceed</Button>
        </div>
      </div>
    </div>
  );
};

export default AskAvailabilityModal;
