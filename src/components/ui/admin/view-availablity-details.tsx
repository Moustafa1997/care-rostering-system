import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useStaffFormStore } from "@/stores/staffFormStore";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function ViewAvailabilityDetails() {
  const { formData, switchToEditMode } = useStaffFormStore();
  const { availability, isAvailbilitySkipedByManager } = formData;
  const [currentView, setCurrentView] = useState("dayGridMonth");

  const handleEditClick = () => {
    // Switch to edit mode using the store method
    switchToEditMode();
  };

  // Convert availability data to calendar events
  const calendarEvents = useMemo(() => {
    if (!availability || availability.length === 0) return [];

    const events: any[] = [];
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Get current week's dates
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Start from Sunday

    // Create events for the next 8 weeks to show recurring availability
    for (let week = 0; week < 8; week++) {
      availability.forEach((item) => {
        const weekdayIndex = weekdays.indexOf(item.weekday);
        if (weekdayIndex !== -1) {
          const eventDate = new Date(startOfWeek);
          eventDate.setDate(startOfWeek.getDate() + weekdayIndex + week * 7);

          // Set time based on shift type
          const startTime =
            item.shiftType === "Morning" ? "06:00:00" : "18:00:00";
          const endTime =
            item.shiftType === "Morning" ? "14:00:00" : "02:00:00";

          const startDateTime = new Date(eventDate);
          const [startHour, startMinute] = startTime.split(":");
          startDateTime.setHours(parseInt(startHour), parseInt(startMinute), 0);

          const endDateTime = new Date(eventDate);
          const [endHour, endMinute] = endTime.split(":");
          endDateTime.setHours(parseInt(endHour), parseInt(endMinute), 0);

          // If night shift ends at 2 AM, it's actually the next day
          if (item.shiftType === "Night") {
            endDateTime.setDate(endDateTime.getDate() + 1);
          }

          events.push({
            id: `${item.weekday}-${item.shiftType}-${week}`,
            title: `${item.shiftType} Shift`,
            start: startDateTime,
            end: endDateTime,
            allDay: false,
            backgroundColor:
              item.shiftType === "Morning" ? "#3B82F6" : "#8B5CF6",
            borderColor: item.shiftType === "Morning" ? "#2563EB" : "#7C3AED",
            textColor: "#FFFFFF",
            className: `availability-event ${item.shiftType.toLowerCase()}-shift`,
            extendedProps: {
              shiftType: item.shiftType,
              weekday: item.weekday
            }
          });
        }
      });
    }

    return events;
  }, [availability]);

  const handleViewChange = (viewType: string) => {
    setCurrentView(viewType);
  };

  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-500">
            Availability detail
          </h2>
          <Button
            variant="outline"
            className="w-32 h-9"
            onClick={handleEditClick}
          >
            Edit
          </Button>
        </div>

        {isAvailbilitySkipedByManager ? (
          <div className="border border-[#E1E1E1] rounded-2xl p-8 shadow">
            <p className="text-base text-gray-900">
              Availability has been skipped by the manager.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* View Toggle Buttons */}
            <div className="flex justify-center gap-2">
              <Button
                variant={currentView === "dayGridMonth" ? "default" : "outline"}
                size="sm"
                onClick={() => handleViewChange("dayGridMonth")}
                className="w-24"
              >
                Month
              </Button>
            </div>

            {/* Calendar View */}
            <div className="border border-[#E1E1E1] rounded-2xl p-8 shadow">
              {calendarEvents.length > 0 ? (
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin]}
                  initialView={currentView}
                  events={calendarEvents}
                  height="auto"
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: ""
                  }}
                  dayMaxEvents={true}
                  moreLinkClick="popover"
                  eventDisplay="block"
                  eventClassNames="availability-event"
                  dayCellClassNames="availability-day"
                  slotMinTime="06:00:00"
                  slotMaxTime="24:00:00"
                  eventContent={(arg) => (
                    <div className="text-center text-xs font-medium p-1">
                      {arg.event.title}
                    </div>
                  )}
                  eventDidMount={(info) => {
                    // Add tooltip
                    const event = info.event;
                    const element = info.el;
                    element.title = `${event.extendedProps.weekday} - ${event.extendedProps.shiftType} Shift`;
                  }}
                  viewDidMount={(info) => {
                    setCurrentView(info.view.type);
                  }}
                />
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg
                      className="mx-auto h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Availability Set
                  </h3>
                  <p className="text-gray-500">
                    This staff member hasn't set their availability yet.
                  </p>
                </div>
              )}
            </div>

            {/* Legend */}
            {calendarEvents.length > 0 && (
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#f6b53b] rounded"></div>
                  <span>Morning Shift (8 AM - 8 PM)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#8b5cf6] rounded"></div>
                  <span>Night Shift (8 PM - 8 AM)</span>
                </div>
              </div>
            )}

            {/* Summary */}
            {availability && availability.length > 0 && (
              <div className="text-center text-sm text-gray-600">
                <p>
                  Available {availability.length} shift
                  {availability.length !== 1 ? "s" : ""} per week
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
