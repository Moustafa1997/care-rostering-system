"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

interface AvailabilityModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ViewAvailabilityDetailsModal({
  open,
  onClose
}: AvailabilityModalProps) {
  const [enabled, setEnabled] = useState(true);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="space-y-4 p-1">
          <div className="text-left">
            <p className="flex items-center gap-3 text-base font-medium text-[#41526A]">
              Deadline{" "}
              <strong className="text-2xl font-normal text-black">
                {" "}
                28/1/2025
              </strong>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 bg-blue-100 p-6 rounded-md">
            <div className="text-left border-r border-blue-300">
              <p className="mb-2 text-xl text-[#000000] font-semibold">
                Morning Staff Overview
              </p>
              <h3 className="text-6xl text-[#000000] font-medium">80%</h3>
              <p className="text-lg font-normal text-[#151515]">
                Staff have responded
              </p>
            </div>
            <div className="text-left pl-6">
              <p className="mb-2 text-xl text-[#000000] font-semibold">
                Night Staff Overview
              </p>
              <h3 className="text-6xl text-[#000000] font-medium">24%</h3>
              <p className="text-lg font-normal text-[#151515]">
                Staff have responded
              </p>
            </div>
          </div>
          <div className="text-center mt-4">
            <h4 className="font-bold text-2xl text-[#000000] mb-6">
              Calendar View
            </h4>
            <div className="flex items-center justify-center gap-3">
              <span
                className={`${enabled ? "font-semibold text-sm" : "text-gray-500 text-sm"}`}
              >
                Morning
              </span>
              <button
                onClick={() => setEnabled(!enabled)}
                className={`relative inline-flex h-5 w-11 items-center rounded-full transition-colors duration-300 ${
                  enabled ? "bg-[#253BAA]" : "bg-gray-300"
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
                Night
              </span>
            </div>
          </div>
          <div className="mt-4">
            <FullCalendar
              plugins={[dayGridPlugin]}
              events={[]}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
