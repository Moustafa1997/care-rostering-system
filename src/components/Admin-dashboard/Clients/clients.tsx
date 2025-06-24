"use client";
import React from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import ClientsTable from "@/components/ui/admin/clients-tabel";
import { DatePickerForm } from "@/components/ui/date-picker";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import Link from "next/link";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

const Client = () => {
  return (
    <div className="w-full p-4 bg-slate-50">
      <h1>Client</h1>
      <div className="w-full flex flex-col justify-between items-center my-4 gap-4">
        <div className="flex justify-between items-center w-full gap-4">
          <div className="w-8/12 h-[208px] bg-white rounded-xl flex items-center justify-between px-2 pt-4">
            <div className="w-[80%]">
              <ImageComponent
                src="/images/doc.svg"
                width={550}
                height={300}
                alt="img"
              />
            </div>
            <div className="pr-4">
              <p className="text-[#1E38A5] font-semibold text-base">
                Total Client added
              </p>
              <h3 className="text-[#253BAA] font-semibold text-5xl">70</h3>
            </div>
          </div>
          <div className="w-1/3 h-[208px] bg-white rounded-xl flex items-center justify-center p-6">
            <Link
              href="\dashboard\admin\clients\client-detail"
              className="flex items-center justify-start gap-4 text-white w-[273px] h-[130px] px-6 py-3 rounded-xl bg-[#152e9d] bg-[url('/images/bg-btn.svg')] bg-no-repeat bg-left-top"
            >
              <Plus size={45} />
              <div className="text-lg font-medium">
                Add
                <br />
                New Client
              </div>
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center w-full gap-4 flex-wrap mt-8">
          <div className="w-6/12 lg:w-2/5 flex justify-center items-center border border-primaryColors-default2 bg-white gap-2 rounded-md px-2">
            <Search size={20} className="text-primaryColors-default2" />
            <Input
              type="search"
              variant="search"
              placeholder="Search by Name, Address, or NHS ID"
            />
          </div>
          <div className="flex justify-center items-center gap-4">
            <div className="">
              <DatePickerForm
                value={""}
                placeholder="Sort by: Joining date"
                className="border-none"
                onChange={() => {}}
              />
            </div>
            <div className="border border-blue-soft bg-white gap-4 rounded-md">
              <Select>
                <SelectTrigger className="w-48 h-[37px] border-none focus:ring-0">
                  <SelectValue placeholder="Sort by service" />
                </SelectTrigger>
                <SelectContent>
                  {/* change this to services */}
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="border border-blue-soft bg-white gap-4 rounded-md">
              <Select>
                <SelectTrigger className="w-48 h-[37px] border-none focus:ring-0">
                  <SelectValue placeholder="Sort by status" />
                </SelectTrigger>
                <SelectContent>
                  {/* change this to status */}
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Inactive</SelectItem>
                  <SelectItem value="Inactive">In Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <ClientsTable />
    </div>
  );
};

export default Client;
