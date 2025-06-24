import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import ViewServiceClient from "@/components/ui/admin/view-service-client";

export default function client() {
  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        <h2 className="text-xl font-semibold text-gray-500">Client</h2>
        <div className="bg-[#EEF8FF] p-6 rounded-xl flex flex-col justify-start lg:gap-3 mt-4">
        <h2 className="text-2xl font-semibold text-[#010101]">Add Clients</h2>
        <div className="flex gap-8">
        <div className="w-full">
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Client Name 
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
              <Link href="" className="flex items-center gap-2 text-sm font-normal text-[#253BAA] mt-4"><Plus size={15}/>Add another client</Link>
            </div>
          </div>
        </div>
        </div>

        {/* View Service Basic Details  */}
        {/* <ViewServiceClient /> */}
      </div>
      <div className="mt-12 flex justify-center gap-5">
        <Button variant="outline" className="w-40">
          Cancel
        </Button>
        <Button variant="default" className="w-40">
          Save
        </Button>
      </div>
    </section>
  );
}
