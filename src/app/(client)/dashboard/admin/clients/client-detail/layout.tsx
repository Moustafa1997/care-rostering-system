"use client";
import React from "react";
import ClientDetailSideBar from "@/components/ui/admin/client-detail-sidebar";
import CircularProgress from "@/components/ui/CircularProgress";

export default function ClientDetailsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="grid grid-cols-12 mb-6">
        <div className="col-span-6">
          <div>
            <p className="text-sm font-semibold text-gray-500">
              Clients/<span className="text-[#959595]">Client detail</span>
            </p>
          </div>
          <div>
            <h1 className="text-2xl text-gray-500 font-semibold">
              Client detail
            </h1>
          </div>
        </div>
        <div className="col-span-6 flex flex-col items-end gap-4">
        <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-black">Onboarding  Progress:</p>
            <CircularProgress value={70} showLabel={false}/>
        </div>
        </div>
      </div>
      <div className="grid grid-cols-12 2xl:gap-4 lg:gap-2">
        <aside className="col-span-12 lg:col-span-4 2xl:col-span-3 flex flex-col">
          <ClientDetailSideBar/>
        </aside>
        <main className="col-span-12 lg:col-span-8 2xl:col-span-9 flex flex-col justify-start bg-slate-50">
          <div className="p-4">{children}</div>
        </main>
      </div>
    </>
  );
}
