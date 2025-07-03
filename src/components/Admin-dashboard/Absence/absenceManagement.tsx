"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Plus, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import AbsenceTable from "@/components/ui/admin/absenceManagement-tabel";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddAbsenceModal from "./AddAbsenceModal/addAbsenceModal";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { DatePickerForm } from "@/components/ui/date-picker";

const Absence = () => {
  const [viewMode, setViewMode] = useState("list");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full p-4 bg-slate-50">
      <h1 className="text-2xl font-semibold text-[#010101] mb-4">
        Absence Management
      </h1>

      <div className="w-full flex flex-col justify-start items-center gap-4">
        <div className="flex justify-between items-center w-full mb-4">
          <div className="flex gap-1">
            <DatePickerForm
              value={""}
              placeholder="Date From"
              className="border-none"
              onChange={() => {}}
            />
            <DatePickerForm
              value={""}
              placeholder="Date To"
              className="border-none"
              onChange={() => {}}
            />
          </div>
          <div className="flex flex-row gap-4 items-center justify-between">
            <Button variant="filled">
              <Bell /> Absence Requests
            </Button>
            <Button variant="default" onClick={() => setShowModal(true)}>
              Add New Absence <Plus />
            </Button>
          </div>
        </div>
        <div className="flex justify-start items-center w-full gap-4 flex-wrap">
          <div className="flex justify-center items-center border border-blue-soft bg-white gap-2 rounded-md px-2">
            <Search size={20} className="text-primaryColors-default2" />
            <Input
              type="search"
              variant="search"
              placeholder="Serch by staff, role"
              className="!h-8 !px-2"
            />
          </div>
          <div className="flex justify-center items-center border border-blue-soft bg-white gap-4 rounded-md">
            <Select>
              <SelectTrigger className="w-48 border-none focus:ring-0">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="staff">Pending</SelectItem>
                <SelectItem value="admin">Approved</SelectItem>
                <SelectItem value="manager">Denied</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-center items-center border border-blue-soft bg-white gap-4 rounded-md">
            <Select>
              <SelectTrigger className="w-48 border-none focus:ring-0">
                <SelectValue placeholder="Filter by Purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Vacation</SelectItem>
                <SelectItem value="staff">Sick</SelectItem>
                <SelectItem value="admin">Maternity</SelectItem>
                <SelectItem value="manager">Emergency</SelectItem>
                <SelectItem value="manager">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-center items-center border border-blue-soft bg-white gap-4 rounded-md">
            <Select>
              <SelectTrigger className="w-48 border-none focus:ring-0">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Start Date</SelectItem>
                <SelectItem value="staff">End Date</SelectItem>
                <SelectItem value="admin">Role</SelectItem>
                <SelectItem value="manager">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-8">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setViewMode("list")}
            >
              <Input
                type="radio"
                checked={viewMode === "list"}
                readOnly
                className="w-4"
              />
              <label
                className={`text-sm font-bold ${
                  viewMode === "list" ? "text-[#253BAA]" : "text-[#2F3E53]"
                }`}
              >
                List View
              </label>
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setViewMode("calendar")}
            >
              <Input
                type="radio"
                checked={viewMode === "calendar"}
                readOnly
                className="w-4"
              />
              <label
                className={`text-sm font-bold ${
                  viewMode === "calendar" ? "text-[#253BAA]" : "text-[#2F3E53]"
                }`}
              >
                Calendar View
              </label>
            </div>
          </div>
        </div>
      </div>

      {viewMode === "list" ? (
        <AbsenceTable />
      ) : (
        <div className="bg-[#F1F1F1] rounded-3xl p-8 mt-8">
          <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
        </div>
      )}

      <AddAbsenceModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Absence;
