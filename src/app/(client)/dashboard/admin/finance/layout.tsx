"use client";
import React from "react";
import FinanceSideBar from "@/components/ui/admin/financeSidebar";

export default function financeLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="grid grid-cols-12 mb-6">
        <h1 className="text-2xl text-gray-500 font-semibold">Finance</h1>
      </div>
      <div className="grid grid-cols-12 2xl:gap-4 lg:gap-2">
        <aside className="col-span-12 lg:col-span-4 2xl:col-span-3 flex flex-col">
          <FinanceSideBar />
        </aside>
        <main className="col-span-12 lg:col-span-8 2xl:col-span-9 flex flex-col justify-start bg-slate-50">
          <div className="p-4">{children}</div>
        </main>
      </div>
    </>
  );
}
