"use client";
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

const LiveTrackingSidebar = () => {
  return (
    <div className="bg-white rounded-xl h-full p-4">
      <div className="flex items-center mb-4 border border-gray-300 rounded px-2">
        <Search className="text-gray-500 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search Staff"
          className="flex-1 border-none outline-none px-2 py-1 text-sm"
        />
      </div>
      <div className="flex justify-center w-full h-10 items-center gap-4 mb-4">
        <Select>
          <SelectTrigger className="border-none focus:ring-0">
            <SelectValue placeholder="Sort by All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">On-Site</SelectItem>
            <SelectItem value="staff">Off-Site</SelectItem>
            <SelectItem value="admin">Offline</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {["On-Site"].map((status, index) => (
        <div key={index} className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
            {status}
          </p>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5,6].map((_, i) => (
              <div key={i} className={"flex items-center gap-2 p-2 rounded-md"}>
                <div className="w-12 h-12 rounded-full">
                  <ImageComponent
                    src="/images/user.svg"
                    alt="Contractor Profile"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-base font-normal text-[#000000]">John Doe</p>
                  <p className="text-xs font-normal text-[#505050]">Waverly Lodge</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm font-normal text-[#253BAA] mt-1 cursor-pointer">View all</p>
        </div>
      ))}
    </div>
  );
};

export default LiveTrackingSidebar;
