"use client";
import React from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import ServicesTable from "@/components/ui/admin/services-tabel";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import Link from "next/link";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

const Services = () => {
  return (
    <div className="w-full p-4 bg-slate-50">
      <h1>Services</h1>
      <div className="w-full flex flex-col justify-between items-center my-4 gap-4">
        <div className="flex justify-between items-center w-full gap-4">
          <div className="w-8/12 h-[208px] bg-white rounded-xl flex items-center justify-between px-2 pt-4">
            <div className="w-[80%]">
              <ImageComponent
                src="/images/service.svg"
                width={550}
                height={300}
                alt="img"
              />
            </div>
            <div className="pr-4">
              <p className="text-[#1E38A5] font-semibold text-base">
                Total Services added
              </p>
              <h3 className="text-[#253BAA] font-semibold text-5xl">70</h3>
            </div>
          </div>
          <div className="w-1/3 h-[208px] bg-white rounded-xl flex items-center justify-center p-6">
            <Link
              href="\dashboard\admin\services\add-new-services"
              className="flex items-center justify-start gap-4 text-white w-[273px] h-[130px] px-6 py-3 rounded-xl bg-[#152e9d] bg-[url('/images/bg-btn.svg')] bg-no-repeat bg-left-top"
            >
              <Plus size={45} />
              <div className="text-lg font-medium">
                Add
                <br />
                New Services
              </div>
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center w-full gap-4 flex-wrap mt-8">
          <div className="w-6/12 lg:w-2/5 flex justify-center items-center border border-primaryColors-default2 bg-white gap-2 rounded-md px-2">
            <Search size={20} className="text-primaryColors-default2" />
            <Input type="search" variant="search" placeholder="Search" />
          </div>
          <div className="flex justify-center items-center gap-4">
            <div className="flex w-[450px] h-[38px] gap-12 border border-blue-soft bg-white rounded-md p-2 justify-center items-center">
              <span className="text-base font-medium text-[#41526A]">Filter by:</span>
             <div className="flex gap-6">
              <label className="flex items-center space-x-2 text-gray-600 text-sm">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-[#41526A]">Active Services</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-600 text-sm">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-[#41526A]">Inactive Services</span>
              </label>
             </div>
            </div>
            <div className="border border-blue-soft bg-white gap-4 rounded-md">
              <Select>
                <SelectTrigger className="w-48 h-[37px] border-none focus:ring-0">
                  <SelectValue placeholder="Sort by Recently Added" />
                </SelectTrigger>
                <SelectContent>
                  {/* change this to accordingly */}
                  <SelectItem value="recentlyadded">Recently Added</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <ServicesTable />
    </div>
  );
};

export default Services;
