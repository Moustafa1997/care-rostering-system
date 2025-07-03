"use client";
import React from "react";
import ImageComponent from "@/components/ImageComponent/ImageComponent";

const LiveTrackingMap = () => {
  return (
      <div
      className="w-full h-full rounded-xl relative bg-cover bg-center"
      style={{ backgroundImage: "url('/images/live-map.svg')" }}>
      <div className="absolute top-2/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-4 rounded-xl w-72">
        <div className="flex items-start gap-3 mb-2">
          <div className="w-12 h-12 rounded-full">
            <ImageComponent
              src="/images/user.svg"
              alt="Contractor Profile"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          <div>
            <p className="font-normal text-base text-black">John Doe</p>
            <p className="text-xs font-normal text-[#505050]">Waverly Lodge</p>
            <p className="text-[#FF6A00] text-xs font-semibold">Not clocked in at Waverly Lodge (due 9:30 AM)</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-[#838383] text-xs font-normal">Status</p>
            <p className="text-xs font-semibold text-[#CF1D09]">Offline</p>
          </div>
          <div>
            <p className="text-[#838383] text-xs font-normal">Scheduled Start Time</p>
            <p className="font-semibold text-xs">9:30 AM</p>
          </div>
          {/* <div>
            <p className="text-[#838383] text-xs font-normal">Duration</p>
            <p className="font-semibold">1h 30m</p>
          </div> */}
          <div>
            <p className="text-[#838383] text-xs font-normal">Actual Start Time</p>
            <p className="font-semibold text-xs">NA</p>
          </div>
          <div>
            <p className="text-[#838383] text-xs font-normal">Distance from Service</p>
            <p className="text-green font-semibold text-xs">1.3 mi</p>
          </div>
          <div>
            <p className="text-[#838383] text-xs font-normal">Last update</p>
            <p className="font-semibold text-xs">30s ago</p>
          </div>
        </div>
        <p className="text-[#253BAA] text-xs font-semibold mt-3 cursor-pointer">View Profile</p>
      </div>
    </div>
  );
};

export default LiveTrackingMap;
