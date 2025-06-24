import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function ShiftCalender() {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-500">Shift Calender</h2>
      </div>
       <div className="border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
        </div>
    </>
  );
}
