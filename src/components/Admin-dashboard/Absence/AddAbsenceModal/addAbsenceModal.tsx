"use client";
import React from "react";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { DatePickerForm } from "@/components/ui/date-picker";

interface AddAbsenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddAbsenceModal: React.FC<AddAbsenceModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white w-[700px] rounded-lg p-6 relative">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold text-primary">
            Add New Absence
          </h2>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="mb-4">
              <label className="text-sm font-medium text-[#41526A] mb-1">Select Staff:</label>
              <div className="flex justify-center items-center border border-blue-soft bg-white gap-4 rounded-md">
                <Select>
                  <SelectTrigger className="border-none focus:ring-0">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Staff 1</SelectItem>
                    <SelectItem value="staff">Staff 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-[#41526A] mb-1">Absence Type:</label>
              <div className="flex justify-center items-center border border-blue-soft bg-white gap-4 rounded-md">
                <Select>
                  <SelectTrigger className="border-none focus:ring-0">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Sick Leave</SelectItem>
                    <SelectItem value="staff">Vacation Leave</SelectItem>
                    <SelectItem value="admin">Emergency Leave</SelectItem>
                    <SelectItem value="manager">Maternity / Paternity</SelectItem>
                    <SelectItem value="manager">Personal Leave</SelectItem>
                    <SelectItem value="manager">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-[#41526A] mb-1">Select Date:</label>
              <div className="flex gap-2">
                <DatePickerForm
                  placeholder="Date From"
                  value=""
                  onChange={() => {}}
                />
                <DatePickerForm
                  placeholder="Date To"
                  value=""
                  onChange={() => {}}
                />
              </div>
            </div>

            <div className="mb-4">
              <div>
                <label className="text-sm font-medium text-[#41526A] mb-1">
                  Upload Document
                </label>
              </div>
              <div className="flex items-center gap-2 border border-blue-soft rounded-md pr-4">
                <Input
                  type="file"
                  className="w-full border-none"
                  placeholder="Upload document"
                />
                <Upload className="text-[#253BAA]" />
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label className="text-sm font-medium text-[#41526A] mb-1 flex items-center gap-1">
                Notes:
              </label>
              <div className="relative">
                <textarea
                  className="border border-blue-soft rounded-md focus:outline-none bg-white px-3 py-2 w-full"
                  placeholder="Type Here"
                  rows={7}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button className="w-36" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="w-36" variant={"default"} onClick={onClose}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddAbsenceModal;
