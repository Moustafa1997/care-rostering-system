"use client";
import React from "react";
import NewRequestTable from "@/components/ui/admin/new-request-tabel";

const NewRequest = () => {
  return (
    <div className="w-full p-4 bg-slate-50">
      <h1 className="text-2xl font-semibold text-[#010101]">Cancellation request</h1>
      <NewRequestTable />
    </div>
  );
};

export default NewRequest;
