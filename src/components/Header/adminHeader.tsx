"use client";
import React from "react";
import UserBox from "../Userbox";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Settings,
  MessageSquare,
  SlidersHorizontal,
  Search
} from "lucide-react";
import { NotificationDropdown } from "./component/NotificationDropdown";
const Adminheader = () => {
  return (
    <>
      <header className="w-full bg-white py-8 lg:p-5 xl:p-5 sticky top-0 z-50 shadow-md">
        <div className="w-full flex flex-row items-center justify-between">
          <div className="w-6/12 lg:w-2/5 flex justify-center items-center border border-primaryColors-default2 bg-white gap-2 rounded-md px-2">
            <Search size={20} className="text-primaryColors-default2" />
            <Input type="search" variant="search" placeholder="Search" />
            <SlidersHorizontal size={20} className="text-blue-dark2" />
          </div>
          <div className="w-6/12 flex flex-row items-center justify-end gap-4">
            <div className="flex flex-row gap-4">
            <Link href="/dashboard/admin/create-shift"><Button variant="default">Create shift</Button></Link> 
              <Button variant="filled">
                <MessageSquare />
                Support
              </Button>
              <Button variant="icons">
                <Settings size={18} />
              </Button>
              <NotificationDropdown />
            </div>
          </div>
              <div className="flex flex-row items-center justify-between">
              <UserBox />
            </div>
        </div>
      </header>
    </>
  );
};

export default Adminheader;
