import React from "react";
import { X } from "lucide-react";
import { DatePickerForm } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

interface AppointmentModalProps {
  onClose: () => void;
}

export default function AppointmentModal({ onClose }: AppointmentModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[900px] shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X />
        </button>
        <div className="border-b px-6 py-4">
          <h2 className="text-2xl font-semibold text-[#010101]">
            New Appointment
          </h2>
        </div>
        <div className="px-6 py-4 space-y-4">
          <p className="text-sm font-normal text-black">
            Create appointment for the client by filling all required delaits:
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 text-sm font-medium text-[#41526A]">
                Appointment date
              </label>
              <DatePickerForm
                value={""}
                placeholder="Select date"
                className=""
                onChange={() => {}}
              />
            </div>
            <div>
              <label className="mb-1 text-sm font-medium text-[#41526A]">
                Appointment time
              </label>
              <div className="flex gap-2">
                <Input
                  variant={"bordered"}
                  placeholder="Select time"
                  type="time"
                  className="block"
                />
                <Select>
                  <SelectTrigger className="border h-10 w-1/2 border-blue-soft rounded-md focus:outline-none">
                    <SelectValue placeholder="AM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 text-sm font-medium text-[#41526A]">
                Type
              </label>
              <Input variant={"bordered"} type="text" />
            </div>
            <div>
              <label className="mb-1 text-sm font-medium text-[#41526A]">
                Location
              </label>
              <Select>
                <SelectTrigger className="border h-10 w-full border-blue-soft rounded-md focus:outline-none">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">A</SelectItem>
                  <SelectItem value="PM">B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 text-sm font-medium text-[#41526A]">
              Professional
            </label>
            <textarea
              className="w-full border border-blue-soft focus:outline-none px-3 py-2 rounded-md"
              placeholder="Add details"
            />
          </div>
          <div>
            <label className="mb-1 text-sm font-medium text-[#41526A]">
              Enter detail
            </label>
            <textarea
              className="w-full border border-blue-soft focus:outline-none px-3 py-2 rounded-md"
              placeholder="Add details"
            />
          </div>
          </div>
        </div>
        <div className="px-6 py-4 flex justify-start ">
          <Button
            className="w-[156px]"
            variant="default"
            onClick={onClose}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
