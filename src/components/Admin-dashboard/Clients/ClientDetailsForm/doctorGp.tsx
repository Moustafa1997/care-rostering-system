"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import ViewClientDoctorGpDetails from "@/components/ui/admin/view-client-doctor-gp";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import { Combobox } from "@headlessui/react";
import { ChevronsUpDown, Check } from "lucide-react";
import cn from "classnames";

export default function DoctorGpDetails() {
  const [showManualAddress, setShowManualAddress] = React.useState(false);
  const [selectedStaff, setSelectedStaff] = React.useState<string>("");
  const [query, setQuery] = React.useState<string>("");

  const staffList = ["Alice Smith", "Bob Johnson", "Charlie Lee", "Diana King"];
  const filteredStaff =
    query === ""
      ? staffList
      : staffList.filter((staff) =>
          staff.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        {/* Doctor/GP */}
        <h2 className="text-xl font-semibold text-gray-500">Doctor/GP</h2>
        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="col-span-6">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              GP Name
            </label>
            <Input variant="bordered" type="text" placeholder="Enter" />
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              Contact Number
            </label>
            <Input variant="bordered" type="text" placeholder="Enter" />
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
                  GP Address
                </label>
                <div className="w-full border border-blue-soft bg-white rounded-md">
                  <Select>
                    <SelectTrigger className="w-full !px-3 h-10 border-none focus:ring-0">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a">A</SelectItem>
                      <SelectItem value="b">B</SelectItem>
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
                      GP Address Line one
                    </label>
                    <Input variant="bordered" type="text" placeholder="Enter" />
                  </div>
                  <div className="mb-4 w-full">
                    <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                      GP Address Line two
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
                          <SelectItem value="a">A</SelectItem>
                          <SelectItem value="b">B</SelectItem>
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

        <h2 className="text-xl font-semibold text-gray-500">Key Working</h2>
        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="col-span-12 mb-4">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              Key support worker
            </label>
            <div className="w-1/2">
              <Combobox
                value={selectedStaff}
                onChange={(value: string | null) => setSelectedStaff(value ?? "")}
              >
                <div className="relative">
                  <div className="relative w-full cursor-default rounded-md bg-white border border-blue-soft h-10 pl-3 pr-10 text-left shadow-sm focus:outline-none">
                    <Combobox.Input
                      className="w-full border-none focus:outline-none h-full text-sm"
                      placeholder="Select Staff"
                      displayValue={(value: string) => value}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setQuery(event.target.value)
                      }
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                    </Combobox.Button>
                  </div>
                  {filteredStaff.length > 0 && (
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {filteredStaff.map((staff) => (
                        <Combobox.Option
                          key={staff}
                          value={staff}
                          className={({ active }) =>
                            cn(
                              "cursor-default select-none relative py-2 pl-10 pr-4",
                              active
                                ? "bg-blue-100 text-blue-900"
                                : "text-gray-900"
                            )
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={cn(
                                  "block truncate",
                                  selected ? "font-medium" : "font-normal"
                                )}
                              >
                                {staff}
                              </span>
                              {selected && (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                  <Check className="h-4 w-4 text-blue-600" />
                                </span>
                              )}
                            </>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  )}
                </div>
              </Combobox>
            </div>
          </div>

          <div className="2xl:col-span-6 lg:col-span-12">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              Key Working Session Frequency
            </label>
            <div className="flex gap-2">
              <Input
                variant="bordered"
                type="number"
                placeholder="Number of Sessions"
              />
              <div className="border border-blue-soft bg-white gap-4 rounded-md">
                <Select>
                  <SelectTrigger className="w-48 h-[37px] border-none focus:ring-0">
                    <SelectValue placeholder="Number of session per" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                    <SelectItem value="fortnight">Fortnight</SelectItem>
                    <SelectItem value="10days">Every 10 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center gap-5">
        <Button variant="outline" className="w-40">
          Save as draft
        </Button>
        <Button variant="default" className="w-40">
          Next
        </Button>
      </div>
    </section>
  );
}
