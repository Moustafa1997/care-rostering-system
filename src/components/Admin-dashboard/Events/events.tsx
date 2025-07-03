"use client";
import React from "react";
import { Files, Plus } from "lucide-react";
import Link from "next/link";
import EventsTable from "@/components/ui/admin/events-tabel";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Events = () => {
  return (
    <div className="w-full p-4 bg-slate-50">
      <p className="text-sm font-semibold text-[#010101] mb-4">
        Dashboard / <span className="text-[#959595]">Event listing</span>
      </p>
      <h1 className="text-2xl font-semibold text-[#010101]">Events</h1>
      <div className="w-full flex justify-between items-center gap-4 mt-4">
        <div className="border border-blue-soft bg-white gap-4 rounded-md">
          <Select>
            <SelectTrigger className="w-48 h-[37px] border-none focus:ring-0">
              <SelectValue placeholder="Show - Nearest Event" />
            </SelectTrigger>
            <SelectContent>
              {/* change this to accordingly */}
              <SelectItem value="recentlyadded">All Events</SelectItem>
              <SelectItem value="alphabetical">Today’s Events</SelectItem>
              <SelectItem value="alphabetical">Upcoming Events</SelectItem>
              <SelectItem value="alphabetical">Past Events</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Link href="/dashboard/admin/events/add-new-event">
            <Button variant="default">
              <Plus /> Add Event
            </Button>
          </Link>
        </div>
      </div>

      <EventsTable
        showViewAll={false}
        data={[
          {
            eventTitle: "Annual Meetup",
            date: "05/12/2024",
            time: "11:00 AM",
            location: "Hall A",
            eventAgenda: <Files className="text-[#3860F8]" />,
            esvp: "3/4 Confirmed"
          },
          {
            eventTitle: "Training Session",
            date: "05/12/2024",
            time: "11:00 AM",
            location: "Hall A",
            eventAgenda: <Files className="text-[#3860F8]" />,
            esvp: "3/4 Confirmed"
          },
          {
            eventTitle: "Staff Meeting",
            date: "03/12/2024",
            time: "02:00 PM",
            location: "24 Avenue",
            eventAgenda: <Files className="text-[#3860F8]" />,
            esvp: "4/5 Confirmed"
          },
         {
            eventTitle: "Annual Meetup",
            date: "05/12/2024",
            time: "11:00 AM",
            location: "Hall A",
            eventAgenda: <Files className="text-[#3860F8]" />,
            esvp: "3/4 Confirmed"
          }
        ]}
      />
    </div>
  );
};

export default Events;
