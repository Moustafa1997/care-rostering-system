import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ViewServiceBasicDetails from "@/components/ui/admin/view-service-basic-details";
export default function BasicDetails() {
  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        <h2 className="text-xl font-semibold text-gray-500">Basic detail</h2>
        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
        <div className="col-span-12">
            <label className="text-sm font-normal text-[#2F3E53] mb-1 flex items-center gap-1">
              Service Name 
            </label>
           <Input variant="bordered" type="text" placeholder="Enter" />
          </div>
           <div className="col-span-12">
            <label className="text-sm font-normal text-[#2F3E53] mb-1 flex items-center gap-1">
              Description
            </label>
            <div className="relative">
              <textarea
                className="border border-blue-soft rounded-md focus:outline-none bg-white px-3 py-2 w-full"
                placeholder="Enter"
                rows={4}
              />
            </div>
          </div>
        </div>
        
        {/* View Service Basic Details  */}
        {/* <ViewServiceBasicDetails /> */}
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
