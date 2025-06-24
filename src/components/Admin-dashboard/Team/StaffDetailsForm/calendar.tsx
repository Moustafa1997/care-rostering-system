import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function Calendar() {
  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        {/* Calendar */}
        <h2 className="text-xl font-semibold text-gray-500">Calendar</h2>
        <div className="border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
        </div>
      </div>
    </section>
  );
}
