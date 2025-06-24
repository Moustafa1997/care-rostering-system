import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import ViewClientDoctorGpDetails from "@/components/ui/admin/view-client-doctor-gp";

export default function DoctorGpDetails() {
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
                  <SelectItem value="all">Week</SelectItem>
                  <SelectItem value="Active">Month</SelectItem>
                  <SelectItem value="Pending">Fornight</SelectItem>
                  <SelectItem value="Inactive">Every 10 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            </div>
          </div>
        </div>

        {/* View Doctor/GP details  */}
        {/* <ViewClientDoctorGpDetails /> */}
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
