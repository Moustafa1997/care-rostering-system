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
import Link from "next/link";

export default function GroupCreation() {
  return (
    <section>
      <div className="mb-6">
            <p className="text-sm font-semibold text-gray-500 mb-4">
                Team /<span className="text-[#959595]">Group creation</span>
            </p>
           <h1 className="text-2xl text-gray-500 font-semibold mb-4">
              Create Group
           </h1>
           <p className="text-[#3553EE] text-sm font-medium">Select staff to create a new group</p>
      </div>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        {/* Group detail */}
        <h2 className="text-xl font-semibold text-gray-500">Group detail</h2>
        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="w-2/4 col-span-12">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              Group name
            </label>
            <Input variant="bordered" type="text" placeholder="Enter" />
          </div>
          <div className="w-2/4 col-span-12">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              Add Staff
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
      <div className="mt-12 flex justify-center gap-5">
        <Button variant="outline" className="w-40">
          Back
        </Button>
        <Link href="/dashboard/admin/team/group-creation/group-list">
          <Button variant="default" className="w-40">
            Create group
          </Button>
        </Link>
      </div>
    </section>
  );
}
