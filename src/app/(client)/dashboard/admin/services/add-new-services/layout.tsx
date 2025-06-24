"use client";
import React, { useState } from "react";
import AddServicesSideBar from "@/components/ui/admin/add-service-sidebar";
import CircularProgress from "@/components/ui/CircularProgress";

export default function AddServiceLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [enabled, setEnabled] = useState(true);
  return (
    <>
      <div className="grid grid-cols-12 mb-6">
        <div className="col-span-6">
          <div>
            <p className="text-sm font-semibold text-gray-500">
              Service/<span className="text-[#959595]">Add new Service</span>
            </p>
          </div>
          <div>
            <h1 className="text-2xl text-gray-500 font-semibold">
              Add new Service
            </h1>
          </div>
        </div>
        <div className="col-span-6 flex flex-col items-end gap-4">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-black">
              Onboarding Progress:
            </p>
            <CircularProgress value={70} showLabel={false} />
          </div>
          <div className="flex items-end gap-3">
            <span
              className={`${enabled ? "font-semibold text-sm" : "text-gray-500 text-sm"}`}
            >
              Active
            </span>
            <button
              onClick={() => setEnabled(!enabled)}
              className={`relative inline-flex h-5 w-11 items-center rounded-full transition-colors duration-300 ${
                enabled ? "bg-blue-900" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  enabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`${!enabled ? "font-semibold text-sm" : "text-gray-500 text-sm"}`}
            >
              Inactive
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 2xl:gap-4 lg:gap-2">
        <aside className="col-span-12 lg:col-span-4 2xl:col-span-3 flex flex-col">
          <AddServicesSideBar />
        </aside>
        <main className="col-span-12 lg:col-span-8 2xl:col-span-9 flex flex-col justify-start bg-slate-50">
          <div className="p-4">{children}</div>
        </main>
      </div>
    </>
  );
}
