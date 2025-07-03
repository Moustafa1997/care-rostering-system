"use client";
import React, { useState } from "react";
import {
  AlignLeft,
  Map,
  CircleCheckBig,
  MessageCircleWarning,
  CircleX
} from "lucide-react";
import LiveTrackingMap from "./LiveTrackingMapView/LiveTrackingMap";
import LiveTrackingSidebar from "./LiveTrackingSidebar/LiveTrackingSidebar";
import LiveTrackingListView from "./LiveTrackingListView/liveTrackingListView";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

const Client = () => {
  const [activeView, setActiveView] = useState<"map" | "list">("map");
  return (
    <div className="w-full p-4 bg-slate-50">
      <div className="w-full flex justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[#010101]">Live tracking</h1>
        <div className="flex gap-4">
          <div className="w-[250px]">
            <label className="text-sm font-medium text-[#41526A] mb-1">
              Status Filters by
            </label>
            <div className="flex justify-center w-full h-10 items-center border border-blue-soft bg-white gap-4 rounded-md">
              <Select>
                <SelectTrigger className="border-none focus:ring-0">
                  <SelectValue placeholder="Filter by Off-site/All/" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">On-Site</SelectItem>
                  <SelectItem value="staff">Off-Site</SelectItem>
                  <SelectItem value="admin">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-[250px]">
            <label className="text-sm font-medium text-[#41526A] mb-1">
              Select by Staff
            </label>
            <div className="flex justify-center w-full h-10 items-center border border-blue-soft bg-white gap-4 rounded-md">
              <Select>
                <SelectTrigger className="border-none focus:ring-0">
                  <SelectValue placeholder="select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Sick Leave</SelectItem>
                  <SelectItem value="staff">Vacation Leave</SelectItem>
                  <SelectItem value="admin">Emergency Leave</SelectItem>
                  <SelectItem value="manager">Maternity / Paternity</SelectItem>
                  <SelectItem value="manager">Personal Leave</SelectItem>
                  <SelectItem value="manager">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-[250px]">
            <label className="text-sm font-medium text-[#41526A] mb-1">
              Select by Service
            </label>
            <div className="flex justify-center w-full h-10 items-center border border-blue-soft bg-white gap-4 rounded-md">
              <Select>
                <SelectTrigger className="border-none focus:ring-0">
                  <SelectValue placeholder="select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Sick Leave</SelectItem>
                  <SelectItem value="staff">Vacation Leave</SelectItem>
                  <SelectItem value="admin">Emergency Leave</SelectItem>
                  <SelectItem value="manager">Maternity / Paternity</SelectItem>
                  <SelectItem value="manager">Personal Leave</SelectItem>
                  <SelectItem value="manager">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F7F7F7] rounded-xl p-4">
        <div className="w-full flex justify-between items-center mb-4">
          <div className="flex gap-10 items-center">
            <div className="flex items-baseline text-[#009F4A] gap-2">
              <CircleCheckBig size={15} />
              <p className="text-base font-semibold text-[#009F4A]">
                On-Site<span className="text-2xl ml-3"> 22</span>
              </p>
            </div>
            <div className="flex items-baseline text-[#FF6A00] gap-2">
              <MessageCircleWarning size={15} />
              <p className="text-base font-semibold text-[#FF6A00]">
                Off-Site<span className="text-2xl ml-3"> 22</span>
              </p>
            </div>
            <div className="flex items-baseline text-[#CF1D09] gap-2">
              <CircleX size={15} />
              <p className="text-base font-semibold text-[#CF1D09]">
                Offline<span className="text-2xl ml-3"> 22</span>
              </p>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <div
              onClick={() => setActiveView("list")}
              className={`${
                activeView === "list"
                  ? "bg-[#3B55FF] text-white"
                  : "bg-white text-black"
              } py-1 px-2 flex flex-col items-center rounded-sm cursor-pointer`}
            >
              <AlignLeft />
              <p
                className={`text-xs font-semibold ${activeView === "list" ? "text-white" : "text-black"}`}
              >
                List View
              </p>
            </div>
            <div
              onClick={() => setActiveView("map")}
              className={`${
                activeView === "map"
                  ? "bg-[#3B55FF] text-white"
                  : "bg-white text-black"
              } py-1 px-2 flex flex-col items-center rounded-sm cursor-pointer`}
            >
              <Map />
              <p
                className={`text-xs font-semibold ${activeView === "map" ? "text-white" : "text-black"}`}
              >
                Map View
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 w-full space-x-4 mt-4">
        <div className="col-span-9">
          {activeView === "map" ? (
            <LiveTrackingMap />
          ) : (
            <LiveTrackingListView />
          )}
        </div>
        <div className="col-span-3">
          <LiveTrackingSidebar />
        </div>
      </div>
    </div>
  );
};

export default Client;
