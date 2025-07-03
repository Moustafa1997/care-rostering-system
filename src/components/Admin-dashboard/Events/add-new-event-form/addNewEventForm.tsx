"use client";
import React from "react";
import { Files, Plus, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import ServicesTable from "@/components/ui/admin/services-tabel";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import Link from "next/link";
import EventsTable from "@/components/ui/admin/events-tabel";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { DatePickerForm } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";

const AddNewEvents = () => {
  const [showManualAddress, setShowManualAddress] = React.useState(false);
  return (
    <div className="w-full p-4 bg-slate-50">
      <p className="text-sm font-semibold text-[#010101] mb-4">
        Dashboard / Event Listing /{" "}
        <span className="text-[#959595]">Add new event</span>
      </p>
      <h1 className="text-2xl font-semibold text-[#010101]">Add New Event</h1>
      <div className="mt-4 py-6 px-8 bg-white shadow rounded-[40px]">
        <div className="grid grid-cols-12">
          <div className="col-span-12 flex items-center gap-8 mb-2">
            <label className="text-lg font-medium text-[#41526A]">
              Event Title
            </label>
            <Input
              variant={"bordered"}
              type="text"
              placeholder="Type here"
              className="w-80 mt-2 mb-4"
            />
          </div>
          <div className="col-span-12">
            <label className="text-lg font-medium text-[#41526A]">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Type here"
              className="w-full mt-2 mb-4 border border-blue-soft rounded-md focus:outline-none bg-white py-2 px-3"
            />
          </div>
          <div className="col-span-12 flex items-center gap-8 mb-8">
            <label className="text-lg font-medium text-[#41526A]">
              Agenda(Doc)
            </label>
            <Button variant="filled" className="w-36">
              Upload <Upload />
            </Button>
          </div>
          <div className="col-span-6 flex items-center gap-8 mb-2">
            <label className="text-lg font-medium text-[#41526A]">Time</label>
            <Input
              variant={"bordered"}
              type="text"
              placeholder="Type here"
              className="w-80 mt-2 mb-4"
            />
          </div>
          <div className="col-span-6 flex items-center gap-8 mb-2">
            <label className="text-lg font-medium text-[#41526A]">Date</label>
            <DatePickerForm
              value=""
              onChange={() => {}}
            />
          </div>
          <div className="col-span-12 bg-[#EEF8FF] p-6 rounded-xl flex 2xl:flex-row lg:flex-col justify-start 2xl:gap-8 lg:gap-3 mt-4">
            <div className="w-full">
              <div className="mb-4 w-56">
                <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                  Postal code
                </label>
                <Input variant="bordered" type="text" placeholder="Enter" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                  Location
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
              <Button
                variant="noborder"
                type="button"
                onClick={() => setShowManualAddress(true)}
                className="text-base font-normal text-[#5473E8] p-0"
              >
                Enter address manually
              </Button>
              {showManualAddress && (
                <>
                  <div className="mb-4 w-full">
                    <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                      Address Line one
                    </label>
                    <Input variant="bordered" type="text" placeholder="Enter" />
                  </div>
                  <div className="mb-4 w-full">
                    <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                      Address Line two
                    </label>
                    <Input
                      variant="bordered"
                      type="text"
                      placeholder="Optional"
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                      City or Town
                    </label>
                    <Input
                      variant="bordered"
                      type="text"
                      placeholder="Optional"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                      County
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
                  <div className="mb-4 w-full">
                    <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                      Postcode
                    </label>
                    <Input
                      variant="bordered"
                      type="text"
                      placeholder="Optional"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="w-full">
              <ImageComponent
                src="/images/map.svg"
                width={500}
                height={500}
                alt="map"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 py-6 px-8 bg-white shadow rounded-xl">
        <h2 className="text-xl font-medium text-[#293444]">Participant list</h2>
        <div className="grid grid-cols-12">
          <div className="col-span-12 mb-6 flex items-center gap-4">
            <Input type="checkbox" className="w-5 h-5"/>
            <label className="text-lg font-medium text-[#41526A]">Invite all staff members</label>
          </div>
          <div className="col-span-12 mb-6">
            <label className="text-lg font-medium text-[#41526A] mb-1">Invite by group</label>
              <div className="w-1/2 border border-blue-soft bg-white rounded-md">
                  <Select>
                    <SelectTrigger className="w-full !px-3 h-10 border-none focus:ring-0">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Night Team</SelectItem>
                      <SelectItem value="Active">Care Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
          </div>

          <div className="col-span-12 mb-6">
               <label className="text-lg font-medium text-[#41526A] mb-1">Invite individual staff</label>
            <div className="flex">
                <div className="w-1/2 border border-blue-soft bg-white rounded-md">
                    <Select>
                      <SelectTrigger className="w-full !px-3 h-10 border-none focus:ring-0">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Night Team</SelectItem>
                        <SelectItem value="Active">Care Team</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
                <div>
                  <Button variant="noborder" className="text-sm font-medium text-[#253BAA]"><Plus/> Add another staff</Button>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center items-center gap-4">
        <Button variant="outline" className="w-40">Cancel</Button>
        <Button variant="default" className="w-40">Create</Button>
      </div>
    </div>
  );
};

export default AddNewEvents;
