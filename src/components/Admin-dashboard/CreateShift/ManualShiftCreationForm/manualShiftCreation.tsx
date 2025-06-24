"use client";
import React, { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePickerForm } from "@/components/ui/date-picker";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

const ManualShiftCreation = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 bg-white rounded-2xl p-8">
        <h2 className="text-xl font-semibold text-[#293444] mb-0">Step 1</h2>
        <div className="col-span-12 border border-[#E1E1E1] rounded-2xl shadow p-8">
          <div className="flex justify-start 2xl:gap-8 lg:gap-3 2xl:flex-nowrap lg:flex-wrap">
            <div className="w-2/6">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Service
              </label>
              <div className="w-full border border-blue-soft bg-white rounded-md">
                <Select>
                  <SelectTrigger className="w-full !px-3 h-10 border-none focus:ring-0">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">A</SelectItem>
                    <SelectItem value="Active">B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex justify-start 2xl:gap-8 lg:gap-3 mt-4 2xl:flex-nowrap lg:flex-wrap">
            <div className="w-full">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Start date
              </label>
              <DatePickerForm
                value={""}
                placeholder="Select date"
                className="border-none"
                onChange={() => {}}
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                End date
              </label>
              <DatePickerForm
                value={""}
                placeholder="Select date"
                className="border-none"
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-[#293444] mb-0">Step 2</h2>
        <div className="col-span-12 border border-[#E1E1E1] rounded-2xl shadow p-8">
          <div className="flex justify-start 2xl:gap-8 lg:gap-3 2xl:flex-nowrap lg:flex-wrap">
            <div className="w-full">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Shift Type
              </label>
              <div className="w-full border border-blue-soft bg-white rounded-md">
                <Select>
                  <SelectTrigger className="w-full !px-3 h-10 border-none focus:ring-0">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Internal</SelectItem>
                    <SelectItem value="Active">Manager</SelectItem>
                    <SelectItem value="Active">Night Shift</SelectItem>
                    <SelectItem value="Active">Office Staff</SelectItem>
                    <SelectItem value="Active">On Call – On Site</SelectItem>
                    <SelectItem value="Active">On Call Shift</SelectItem>
                    <SelectItem value="Active">Shadowing</SelectItem>
                    <SelectItem value="Active">Support Worker</SelectItem>
                    <SelectItem value="Active">Team Leader</SelectItem>
                    <SelectItem value="Active">Training</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="w-full">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Staff Required
              </label>
              <Input variant="bordered" type="number" placeholder="Enter" />
            </div>
          </div>
          <div className="flex justify-start 2xl:gap-8 lg:gap-3 mt-4 2xl:flex-nowrap lg:flex-wrap">
            <div className="w-full">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Start Time
              </label>
              <DatePickerForm
                value={""}
                placeholder="Select date"
                className="border-none"
                onChange={() => {}}
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                End Time
              </label>
              <DatePickerForm
                value={""}
                placeholder="Select date"
                className="border-none"
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="flex justify-start 2xl:gap-8 lg:gap-3 2xl:flex-nowrap lg:flex-wrap mt-4">
            <div className="w-full">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Purpose
              </label>
              <Input variant="bordered" type="text" placeholder="Enter" />
            </div>
            <div className="w-full">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Repeat On Days
              </label>
              <div className="w-full border border-blue-soft bg-white rounded-md">
                <Select>
                  <SelectTrigger className="w-full !px-3 h-10 border-none focus:ring-0">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Monday</SelectItem>
                    <SelectItem value="Active">Tuesday</SelectItem>
                    <SelectItem value="Active">Wednesday</SelectItem>
                    <SelectItem value="Active">Thrusday</SelectItem>
                    <SelectItem value="Active">Friday</SelectItem>
                    <SelectItem value="Active">Saturday</SelectItem>
                    <SelectItem value="Active">Sunday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex justify-start 2xl:gap-8 lg:gap-3 2xl:flex-nowrap lg:flex-wrap mt-4">
            <div className="w-2/6">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Role
              </label>
              <div className="w-full border border-blue-soft bg-white rounded-md">
                <Select>
                  <SelectTrigger className="w-full !px-3 h-10 border-none focus:ring-0">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">A</SelectItem>
                    <SelectItem value="Active">B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm font-medium text-[#5473E8]">
        <Button variant="noborder">
            <Plus/>
            <span> Add More Shifts</span>
        </Button>
        </div>
      </div>

      <div className="mt-12 flex justify-center gap-5">
        <Button variant="outline" className="w-40">
          Undo
        </Button>
        <Button variant="default" className="w-40">
          Generate Rota
        </Button>
      </div>
    </>
  );
};

export default ManualShiftCreation;
