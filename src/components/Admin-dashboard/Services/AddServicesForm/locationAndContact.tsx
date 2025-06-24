import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import ViewServiceLocationContact from "@/components/ui/admin/view-service-location";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

export default function LocationAndContact() {
    const [showManualAddress, setShowManualAddress] = React.useState(false);

  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        <h2 className="text-xl font-semibold text-gray-500">Contact and Location</h2>
        <div className="bg-[#EEF8FF] p-6 rounded-xl flex flex-col justify-start 2xl:gap-8 lg:gap-3 mt-4">
        <div className="flex gap-8">
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
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Phone Number
              </label>
              <Input variant="bordered" type="number" placeholder="Enter" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Email
              </label>
              <Input variant="bordered" type="email" placeholder="Enter" />
            </div>
          </div>
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

        {/* View Service Basic Details  */}
        {/* <ViewServiceLocationContact /> */}
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
