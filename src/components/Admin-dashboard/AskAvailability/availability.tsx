"use client";
import React, {useState} from "react";
import { Button } from "@/components/ui/button";
import AskAvailablityTable from "@/components/ui/admin/askAvailablity-tabel";
import AskAvailabilityModal from "./AskAvailablityModal/askAvailablityModal";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { DatePickerForm } from "@/components/ui/date-picker";

const AskAvailablity = () => {
   const [showModal, setShowModal] = useState(false);
  return (
    <div className="w-full p-4 bg-slate-50">
      <div className="w-full flex flex-row justify-between items-start">
        <h1 className="text-sm font-semibold text-black">
          Dashboard <span className="text-[#959595]">/ Availability</span>
        </h1>
        <div className="flex flex-row gap-4 items-center justify-between">
          <Button
            variant="noborder"
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-4 text-white w-[273px] h-[85px] px-6 py-3 rounded-xl bg-[#152e9d] bg-[url('/images/bg-btn.svg')] bg-no-repeat bg-left-top"
          >
            <div className="text-lg font-medium">Ask Availability</div>
          </Button>
        </div>
      </div>
      <div className="w-full">
        <h1 className="text-2xl font-semibold text-[#010101]">
          Availability Request
        </h1>
      </div>
      <div className="w-full flex justify-between items-start my-4 gap-4">
        <div className="w-[222px] h-[37px]">
          <DatePickerForm
            value={""}
            placeholder="Send Date"
            className="border-none"
            onChange={() => {}}
          />
        </div>
        <div className="flex justify-end items-center w-full gap-4">
          <div className="flex h-[37px] justify-center items-center border border-blue-soft bg-white gap-4 rounded-md">
            <Select>
              <SelectTrigger className="w-48 border-none focus:ring-0">
                <SelectValue placeholder="Filter by: Staff" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Staff</SelectItem>
                <SelectItem value="Done">Available</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex h-[37px] justify-center items-center border border-blue-soft bg-white gap-4 rounded-md">
            <Select>
              <SelectTrigger className="w-48 border-none focus:ring-0">
                <SelectValue placeholder="Filter by: Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Staff</SelectItem>
                <SelectItem value="Done">Available</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <AskAvailablityTable />

      {showModal && <AskAvailabilityModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AskAvailablity;
