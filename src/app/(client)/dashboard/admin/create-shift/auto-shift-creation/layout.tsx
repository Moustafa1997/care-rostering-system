"use client";
import React from "react";

export default function ShiftCreationLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="grid grid-cols-12 mb-6">
        <div className="col-span-6">
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-500">
              Shift listing / <span className="text-[#959595]">Automatic Shift creation</span>
            </p>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-[#010101]">
              Automatic shift creation
            </h1>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 2xl:gap-4 lg:gap-2">
        <main className="col-span-12 flex flex-col justify-start bg-slate-50">
          <div className="p-4">{children}</div>
        </main>
      </div>
    </>
  );
}
