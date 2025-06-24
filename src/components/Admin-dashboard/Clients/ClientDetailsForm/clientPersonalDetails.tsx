import React from "react";
import { Input } from "@/components/ui/input";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DatePickerForm } from "@/components/ui/date-picker";
import ViewClientPersonalDetail from "@/components/ui/admin/view-client-personal-details";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

export default function ClientPersonalDetails() {
  const [showManualAddress, setShowManualAddress] = React.useState(false);
  return (
    <>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        {/* Personal detail */}
        <section>
          <h2 className="text-xl font-semibold text-gray-500">
            Personal detail
          </h2>
          <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
            <div className="col-span-12 relative w-[100px] h-[100px]">
              <div className="rounded-full overflow-hidden w-full h-full flex justify-center items-center">
                <ImageComponent
                  src="/images/contractor-profile.jpeg"
                  alt="Contractor-profile"
                  width={100}
                  height={100}
                />
              </div>
              <Pencil className="absolute bottom-0 right-0 bg-white rounded-full border border-gray-300 p-1 shadow hover:bg-gray-100" />
            </div>
            <div className="col-span-12">
              <div className="flex justify-start 2xl:gap-8 lg:gap-3 2xl:flex-nowrap lg:flex-wrap">
                <div className="w-full">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    First Name
                  </label>
                  <Input variant="bordered" type="text" placeholder="Enter" />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Last Name
                  </label>
                  <Input variant="bordered" type="text" placeholder="Enter" />
                </div>
              </div>
              <div className="flex justify-start 2xl:gap-8 lg:gap-3 mt-4 2xl:flex-nowrap lg:flex-wrap">
                <div className="w-full">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Phone Number
                  </label>
                  <Input variant="bordered" type="tel" placeholder="Enter" />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Email ID
                  </label>
                  <Input variant="bordered" type="email" placeholder="Enter" />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-56">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Age
                  </label>
                  <Input variant="bordered" type="text" placeholder="Enter" />
                </div>
              </div>
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
                    Address
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
                      <Input
                        variant="bordered"
                        type="text"
                        placeholder="Enter"
                      />
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
            <div className="col-span-12 w-60">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Date of admission
              </label>
              <DatePickerForm value={""} onChange={() => {}} />
            </div>
          </div>
        </section>
        {/* View client personal details component  */}
        {/* <ViewClientPersonalDetail /> */}
      </div>
      <div className="mt-12 flex justify-center gap-5">
        <Button variant="outline" className="w-40">
          Save as draft
        </Button>
        <Button variant="default" className="w-40">
          Next
        </Button>
      </div>
    </>
  );
}
