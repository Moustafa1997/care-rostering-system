import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Button } from "@/components/ui/button";
import AppointmentModal from "../AppointmentModal/AppointmentModal";

export default function TreatmentAppointmentsCalender() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-500">Treatment Calender</h2>
        <div className="gap-4 flex">
          <Button variant="outline" className="w-32">Edit</Button>
          <Button variant="default" onClick={() => setIsModalOpen(true)}>
            Add new appointment
          </Button>
        </div>
      </div>

      <div className="border border-[#E1E1E1] rounded-2xl p-8 shadow">
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
      </div>

      {isModalOpen && (
        <AppointmentModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
