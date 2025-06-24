import React from "react";

export default function Continuity() {
  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        {/* Continuity */}
        <h2 className="text-xl font-semibold text-gray-500">Continuity</h2>
        <div className="grid grid-cols-12 gap-4 bg-[#F1F4FD] rounded-t-2xl p-4">
          <div className="col-span-6">
            <span className="text-lg font-medium text-[#41526A]">Clients</span>
          </div>
          <div className="col-span-3 text-center">
            <span className="text-lg font-medium text-[#41526A]">
              Continuity
            </span>
          </div>
          <div className="col-span-3 text-center">
            <span className="text-lg font-medium text-[#41526A]">
              Total Shift
            </span>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-4 shadow">
          <div className="col-span-6 border-r border-[#C6C6C6]">
            <span className="text-base font-semibold text-[#2F3E53]">
              John Doe
            </span>
          </div>
          <div className="col-span-3 border-r border-[#C6C6C6] text-center">
            <span className="text-base font-semibold text-[#2F3E53]">27%</span>
          </div>
          <div className="col-span-3 text-center">
            <span className="text-base font-semibold text-[#2F3E53]">24</span>
          </div>
        </div>
      </div>
    </section>
  );
}
