"use client";
import React from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import ServicesTable from "@/components/ui/admin/services-tabel";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import Link from "next/link";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { DatePickerForm } from "@/components/ui/date-picker";

const Schedule = () => {
  return (
    <div className="w-full p-4 bg-slate-50">
      <h1 className="text-2xl font-semibold text-[#010101]">Schedule</h1>
      <div className="w-full flex flex-col justify-between items-center my-4 gap-4">
        <div className="flex justify-between items-center w-full gap-4 flex-wrap mt-8">
          <div className="flex justify-center items-center gap-4">
            <div className="border border-blue-soft bg-white gap-4 rounded-md">
              <Select>
                <SelectTrigger className="w-48 h-[37px] border-none focus:ring-0">
                  <SelectValue placeholder="Sort by Service & Client" />
                </SelectTrigger>
                <SelectContent>
                  {/* change this to accordingly */}
                  <SelectItem value="recentlyadded">
                    Service & Client
                  </SelectItem>
                  <SelectItem value="alphabetical">Worker</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="border border-blue-soft bg-white gap-4 rounded-md">
              <Select>
                <SelectTrigger className="w-48 h-[37px] border-none focus:ring-0">
                  <SelectValue placeholder="Sort by Name" />
                </SelectTrigger>
                <SelectContent>
                  {/*  Dropdown populated dynamically based on selected “By” value.*/}
                  <SelectItem value="recentlyadded">
                    Service & Client
                  </SelectItem>
                  <SelectItem value="alphabetical">Worker</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="border border-blue-soft bg-white gap-4 rounded-md">
              <Select>
                <SelectTrigger className="w-48 h-[37px] border-none focus:ring-0">
                  <SelectValue placeholder="Shift Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recentlyadded">Internal</SelectItem>
                  <SelectItem value="alphabetical">Manager</SelectItem>
                  <SelectItem value="alphabetical">Night Shift</SelectItem>
                  <SelectItem value="alphabetical">Office Staff</SelectItem>
                  <SelectItem value="alphabetical">
                    On Call – On Site
                  </SelectItem>
                  <SelectItem value="alphabetical">On Call Shift</SelectItem>
                  <SelectItem value="alphabetical">Shadowing</SelectItem>
                  <SelectItem value="alphabetical">Support Worker</SelectItem>
                  <SelectItem value="alphabetical">Team Leader</SelectItem>
                  <SelectItem value="alphabetical">Training</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="border border-blue-soft bg-white gap-4 rounded-md">
              <Select>
                <SelectTrigger className="w-48 h-[37px] border-none focus:ring-0">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recentlyadded">All</SelectItem>
                  <SelectItem value="alphabetical">Covered</SelectItem>
                  <SelectItem value="alphabetical">Uncovered</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-[314px]">
              <DatePickerForm
                value={""}
                placeholder="Select date"
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
